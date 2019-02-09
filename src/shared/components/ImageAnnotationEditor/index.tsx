import * as React from 'react';
import * as styles from './styles.css';
import { CloseFunction } from '../../../types/Report';
import { Button } from '../Button';
import { Input } from '../Input';
import { ImageColorPicker as ColorPicker } from '../ImageColorPicker';
import { Stage, Layer, Image, Text, Arrow } from 'react-konva';
import { ImageObject, CropBox, Drawing } from '../../../types';
import * as uuidv4 from 'uuid/v4';

export interface ImageAnnotationEditorProps {
  closeModal: CloseFunction;
  onDone: Function;
  image: ImageObject;
  okText?: string;
  withoutCaption?: boolean;
  parent?: any;
}

export interface ImageAnnotationEditorState {
  currentType: 'arrow' | 'text' | 'select';
  color: string;
  isReady: boolean;
  imageHTML: HTMLImageElement | null;
  canvas: any;
  drawings: Array<Drawing>;
  caption: string;
  newDrawing: Drawing;
  isShiftKeyPressed: boolean;
  initialHeightToWidth: number;
  crop: object;
  selectedDrawing: number;
}

export class ImageAnnotationEditor extends React.Component<
  ImageAnnotationEditorProps,
  ImageAnnotationEditorState
  > {
  public static defaultProps: Partial<ImageAnnotationEditorProps> = {
    okText: 'Insert'
  };
  private input: any;

  static defaults: object = {
    arrow: {
      pointerLength: 20,
      pointerWidth: 20,
      strokeWidth: 4
    },
    text: {
      fontSize: 18,
      fontFamily: 'Arial, sans-serif'
    },
    selectedDrawing: {
      stroke: '#000000',
      fill: '#000000',
      strokeEnabled: true,
      shadowColor: '#FFFFFF',
      shadowBlur: 15,
      shadowOffset: { x: 0, y: 0 },
      shadowOpacity: 1,
      shadowEnabled: true
    }
  };

  constructor(props: ImageAnnotationEditorProps) {
    super(props);

    this.state = {
      currentType: 'select',
      color: '#d9e3f0',
      isReady: false,
      imageHTML: null,
      canvas: null,
      drawings: [],
      caption: '',
      newDrawing: null,
      isShiftKeyPressed: false,
      initialHeightToWidth: 0,
      crop: null,
      selectedDrawing: -1
    };

    this.initialize = this.initialize.bind(this);

    this.remove = this.remove.bind(this);
    this.addArrow = this.addArrow.bind(this);
    this.addText = this.addText.bind(this);

    this.onColorChanged = this.onColorChanged.bind(this);
    this.onActiveTypeChanged = this.onActiveTypeChanged.bind(this);
    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onMouseLeave = this.onMouseLeave.bind(this);
    this.onMouseClick = this.onMouseClick.bind(this);
    this.onTextChanged = this.onTextChanged.bind(this);
    this.onInputKeyDown = this.onInputKeyDown.bind(this);
    this.onInputBlur = this.onInputBlur.bind(this);

    this.finishEditing = this.finishEditing.bind(this);
    this.checkShiftKey = this.checkShiftKey.bind(this);
    this.getDrawingMarkup = this.getDrawingMarkup.bind(this);
    this.isNewDrawing = this.isNewDrawing.bind(this);

    this.prepareDrawingsForSVG = this.prepareDrawingsForSVG.bind(this);
    this.prepareDrawingsForCanvas = this.prepareDrawingsForCanvas.bind(this);
  }

  componentDidMount() {
    window.addEventListener('keyup', this.checkShiftKey);
    window.addEventListener('keydown', this.checkShiftKey);
    this.initialize();
  }

  componentDidUpdate(pProps, pState) {
    if (!pState.newDrawing && this.isNewDrawing('text')) {
      this.input.focus();
    }
  }

  componentWillUnmount() {
    window.removeEventListener('keyup', this.checkShiftKey);
    window.removeEventListener('keydown', this.checkShiftKey);
  }

  initialize() {
    let _cthis = this;

    async function imageToDataURL(url, callback) {
      let data = (await fetch(url)).blob();
      let reader = new FileReader();
      reader.onloadend = function () {
        callback(reader.result);
      };
      reader.readAsDataURL(await data);
    }

    imageToDataURL(this.props.image.url, dataUrl => {
      let imageHTML = new (window as any).Image();
      imageHTML.src = this.props.image.url;
      imageHTML.onload = () => {
        let canvasParams = {};

        let maxWidth;
        let maxHeight;

        if (this.props.parent) {
          maxWidth = this.props.parent.current.offsetWidth;
          maxHeight = this.props.parent.current.offsetHeight;
        } else {
          maxWidth = window.innerWidth * 0.8 - 150;
          maxHeight = window.innerHeight - 350;
        }

        //let maxHeight = window.innerHeight - 350;
        maxHeight = maxHeight < 250 ? 250 : maxHeight;
        //let maxWidth = window.innerWidth * 0.8 - 150;
        maxWidth = maxWidth < 500 ? 500 : maxWidth;

        let initialHeightToWidth = imageHTML.height / imageHTML.width;

        canvasParams['height'] = maxHeight;
        canvasParams['width'] =
          canvasParams['height'] /
          ((_cthis.props.image.cropbox.height * initialHeightToWidth) /
            _cthis.props.image.cropbox.width);

        if (canvasParams['width'] > maxWidth) {
          canvasParams['height'] *= maxWidth / canvasParams['width'];
          canvasParams['width'] = maxWidth;
        }

        _cthis.setState(
          {
            isReady: true,
            caption: _cthis.props.image.caption || '',
            imageHTML: imageHTML,
            canvas: canvasParams,
            initialHeightToWidth: initialHeightToWidth,
            crop: {
              x: (_cthis.props.image.cropbox.left * imageHTML.width) / 100,
              y: (_cthis.props.image.cropbox.top * imageHTML.height) / 100,
              width: (_cthis.props.image.cropbox.width * imageHTML.width) / 100,
              height: (_cthis.props.image.cropbox.height * imageHTML.height) / 100
            }
          },
          () => {
            _cthis.setState({
              drawings: _cthis.prepareDrawingsForCanvas(_cthis.props.image.drawings)
            });
          }
        );
      };
    });
  }

  remove() {
    let newState = {
      newDrawing: null,
      selectedDrawing: -1
    };

    if (this.state.drawings[this.state.selectedDrawing]) {
      newState['drawings'] = [
        ...this.state.drawings.slice(0, this.state.selectedDrawing),
        ...this.state.drawings.slice(this.state.selectedDrawing + 1)
      ];
    }

    this.setState(newState);
  }

  addArrow(coords) {
    this.setState({
      newDrawing: {
        id: uuidv4(),
        type: 'arrow',
        data: {
          ...ImageAnnotationEditor.defaults['arrow'],
          fill: this.state.color,
          x: coords.x,
          y: coords.y,
          points: [0, 0, 0, 0],
          stroke: this.state.color
        }
      }
    });
  }

  addText(coords) {
    this.setState({
      newDrawing: {
        id: uuidv4(),
        type: 'text',
        data: {
          ...ImageAnnotationEditor.defaults['text'],
          x: coords.x,
          y: coords.y,
          text: '',
          fill: this.state.color
        }
      }
    });
  }

  onMouseDown(e) {
    if (!this.state.newDrawing) {
      if (this.state.currentType == 'arrow') {
        this.addArrow(e.target.getStage().getPointerPosition());
      }
    }

    if (
      this.state.currentType == 'select' &&
      (e.target.className == 'Arrow' || e.target.className == 'Text')
    ) {
      this.setState({
        selectedDrawing: e.target.index
      });
    } else {
      this.setState({
        selectedDrawing: -1
      });
    }
  }

  onMouseClick(e) {
    if (this.state.currentType == 'text') {
      this.addText(e.target.getStage().getPointerPosition());
    }
  }

  onMouseUp(e) {
    if (this.isNewDrawing('arrow')) {
      this.setState({
        drawings: [...this.state.drawings, this.state.newDrawing],
        newDrawing: null
      });
    }
  }

  onInputBlur() {
    if (this.isNewDrawing('text')) {
      let newState = {
        newDrawing: null
      };

      if (this.state.newDrawing.data.text.length) {
        newState['drawings'] = [...this.state.drawings, this.state.newDrawing];
      }
      this.setState(newState);
    }
  }

  onMouseMove(e) {
    if (this.isNewDrawing('arrow')) {
      let coords = e.target.getStage().getPointerPosition();
      let startPoint = {
        x: this.state.newDrawing.data.x,
        y: this.state.newDrawing.data.y
      };

      if (this.state.isShiftKeyPressed) {
        if (Math.abs(coords.x - startPoint.x) > Math.abs(coords.y - startPoint.y)) {
          coords.y = startPoint.y;
        } else {
          coords.x = startPoint.x;
        }
      }

      this.setState({
        newDrawing: {
          ...this.state.newDrawing,
          data: {
            ...this.state.newDrawing.data,
            points: [
              this.state.newDrawing.data.points[0],
              this.state.newDrawing.data.points[1],
              coords.x - startPoint.x,
              coords.y - startPoint.y
            ]
          }
        }
      });
    }
  }

  onMouseLeave(e) {
    if (this.isNewDrawing('arrow')) {
      this.setState({
        newDrawing: null
      });
    }
  }

  onTextChanged(e) {
    if (this.isNewDrawing('text')) {
      this.setState({
        newDrawing: {
          ...this.state.newDrawing,
          data: {
            ...this.state.newDrawing.data,
            text: e.target.value
          }
        }
      });
    }
  }

  onInputKeyDown(e) {
    if (e.key == 'Enter' && this.isNewDrawing('text')) {
      this.setState({
        drawings: [...this.state.drawings, this.state.newDrawing],
        newDrawing: null
      });
    }
  }

  onActiveTypeChanged(el) {
    this.setState({
      currentType: el
    });
  }

  onColorChanged(color) {
    this.setState({ color });
  }

  isNewDrawing(type: string) {
    let el = this.state.newDrawing;
    return el && el.type == type;
  }

  checkShiftKey(e) {
    this.setState({
      isShiftKeyPressed: e.shiftKey
    });
  }

  getDrawingMarkup(el, key?) {
    let isKeySpecified = typeof key != 'undefined';
    let isDraggable = isKeySpecified && this.state.currentType == 'select';
    let _this = this;

    const dragBoundFunc = function (pos) {
      return {
        x: pos.x,
        y: pos.y
      };
    };

    switch (el.type) {
      case 'arrow':
        let arrowDragOptions = isDraggable
          ? {
            draggable: true,
            dragBoundFunc: function (pos) {
              //arrow doesn't move relative to stage, but to it's initial position
              let cDrawing = _this.state.drawings[key];
              _this.setState({
                drawings: [
                  ..._this.state.drawings.slice(0, key),
                  {
                    ...cDrawing,
                    id: uuidv4(),
                    data: {
                      ...cDrawing.data,
                      x: pos.x,
                      y: pos.y
                    }
                  },
                  ..._this.state.drawings.slice(key + 1)
                ]
              });

              return dragBoundFunc(pos);
            }
          }
          : {};
        return (
          <Arrow
            {...el.data}
            {...arrowDragOptions}
            {...(this.state.selectedDrawing == key
              ? {
                ...ImageAnnotationEditor.defaults['selectedDrawing'],
                dashEnabled: true,
                dash: [10, 5]
              }
              : {
                shadowEnabled: false
              })}
            key={key}
          />
        );
      case 'text':
        let textDragOptions = isDraggable
          ? {
            draggable: true,
            dragBoundFunc: function (pos) {
              let cDrawing = _this.state.drawings[key];
              _this.setState({
                drawings: [
                  ..._this.state.drawings.slice(0, key),
                  {
                    ...cDrawing,
                    id: uuidv4(),
                    data: {
                      ...cDrawing.data,
                      x: pos.x,
                      y: pos.y
                    }
                  },
                  ..._this.state.drawings.slice(key + 1)
                ]
              });

              return dragBoundFunc(pos);
            }
          }
          : {};

        return (
          <Text
            {...el.data}
            {...textDragOptions}
            text={el.data.text + (isKeySpecified ? '' : '+')}
            visible={isKeySpecified}
            {...(this.state.selectedDrawing == key
              ? {
                ...ImageAnnotationEditor.defaults['selectedDrawing'],
                strokeEnabled: true,
                strokeWidth: 1
              }
              : {
                shadowEnabled: false
              })}
            key={key}
          />
        );
      default:
        return null;
    }
  }

  prepareDrawingsForSVG(drawings) {
    return drawings.map(el => {
      let propsToUpdate;
      let zoomCoef = this.props.image.cropbox.width / this.state.canvas.width;

      switch (el.type) {
        case 'arrow':
          propsToUpdate = {
            pointerLength: ImageAnnotationEditor.defaults['arrow'].pointerLength * zoomCoef,
            pointerWidth: ImageAnnotationEditor.defaults['arrow'].pointerWidth * zoomCoef,
            strokeWidth: ImageAnnotationEditor.defaults['arrow'].strokeWidth * zoomCoef,
            x: el.data.x * zoomCoef,
            y: el.data.y * zoomCoef,
            points: el.data.points.map(pointValue => pointValue * zoomCoef)
          };
          break;
        case 'text':
          propsToUpdate = {
            fontSize: ImageAnnotationEditor.defaults['text'].fontSize * zoomCoef,
            x: el.data.x * zoomCoef,
            y: el.data.y * zoomCoef
          };
          break;
        default:
          propsToUpdate = {};
      }

      return {
        ...el,
        data: {
          ...el.data,
          ...propsToUpdate
        }
      };
    });
  }

  onCaptionEdit = e => {
    this.setState({
      caption: e.target.value
    });
  };

  prepareDrawingsForCanvas(drawings) {
    return drawings.map(el => {
      let propsToUpdate;
      let reverseZoomCoef = this.state.canvas.width / this.props.image.cropbox.width;

      switch (el.type) {
        case 'arrow':
          propsToUpdate = {
            pointerLength: ImageAnnotationEditor.defaults['arrow'].pointerLength,
            pointerWidth: ImageAnnotationEditor.defaults['arrow'].pointerWidth,
            strokeWidth: ImageAnnotationEditor.defaults['arrow'].strokeWidth,
            x: el.data.x * reverseZoomCoef,
            y: el.data.y * reverseZoomCoef,
            points: el.data.points.map(pointValue => pointValue * reverseZoomCoef)
          };
          break;
        case 'text':
          propsToUpdate = {
            fontSize: ImageAnnotationEditor.defaults['text'].fontSize,
            x: el.data.x * reverseZoomCoef,
            y: el.data.y * reverseZoomCoef
          };
          break;
        default:
          propsToUpdate = {};
      }

      return {
        ...el,
        data: {
          ...el.data,
          ...propsToUpdate
        }
      };
    });
  }

  finishEditing() {
    let newImage = {
      ...this.props.image,
      drawings: this.prepareDrawingsForSVG(this.state.drawings)
    };

    if (!this.props.withoutCaption) {
      newImage.caption = this.state.caption;
    }

    this.props.onDone(newImage);
  }

  render() {
    return (
      <div>
        {/* <div className={styles.buttonGroup}>
          <div className={styles.tools}>
            <Button onClick={() => this.onActiveTypeChanged('select')} size='tiny'>
              <div className={this.state.currentType == 'select' ? 'active' : ''}>
                <i className="fas fa-arrows-alt" />
                <div>Select</div>
              </div>
            </Button>
            <Button onClick={() => this.onActiveTypeChanged('arrow')} size='tiny'>
              <div className={this.state.currentType == 'arrow' ? 'active' : ''}>
                <i className="fas fa-long-arrow-alt-right" />
                <div>Arrow</div>
              </div>
            </Button>
            <Button onClick={() => this.onActiveTypeChanged('text')} size='tiny'>
              <div className={this.state.currentType == 'text' ? 'active' : ''}>
                <i className="fas fa-font" />
                <div>Text</div>
              </div>
            </Button>
          </div>
          <ColorPicker onChange={this.onColorChanged} value={this.state.color} />
          <Button onClick={this.remove} disabled={!this.state.drawings[this.state.selectedDrawing]} size='tiny'>
            <i className="fas fa-trash" />
            <div>Remove</div>
          </Button>
        </div> */}
        <div className={styles.primaryToolbar}>
          <div className={styles.primaryToolbar__btn}>
            <div className={styles.buttonGroup}>
              <Button onClick={() => this.onActiveTypeChanged('select')} size='tiny'>
                <div className={this.state.currentType == 'select' ? 'active' : ''}>
                  <i className="fas fa-arrows-alt" />
                </div>
              </Button>
              <Button onClick={() => this.onActiveTypeChanged('arrow')} size='tiny'>
                <div className={this.state.currentType == 'arrow' ? 'active' : ''}>
                  <i className="fas fa-long-arrow-alt-right" />
                </div>
              </Button>
              <Button onClick={() => this.onActiveTypeChanged('text')} size='tiny'>
                <div className={this.state.currentType == 'text' ? 'active' : ''}>
                  <i className="fas fa-font" />
                </div>
              </Button>
              <ColorPicker onChange={this.onColorChanged} value={this.state.color} />
              <Button onClick={this.remove} disabled={!this.state.drawings[this.state.selectedDrawing]} size='tiny'>
                <i className="fas fa-trash" />
              </Button>
            </div>
          </div>
        </div>
        <div className={styles.canvasWrapper}>
          <div style={{ width: '100%' }}>
            {this.isNewDrawing('text') && (
              <input
                type="text"
                value={this.state.newDrawing.data.text}
                style={{
                  left: this.state.newDrawing.data.x,
                  top: this.state.newDrawing.data.y,
                  color: this.state.newDrawing.data.fill,
                  width: this.state.canvas.width - this.state.newDrawing.data.x
                }}
                ref={el => {
                  this.input = el;
                }}
                onBlur={this.onInputBlur}
                onInput={this.onTextChanged}
                onKeyDown={this.onInputKeyDown}
              />
            )}
            {this.state.imageHTML && (
              <Stage
                className={styles.canvas}
                width={this.state.canvas['width']}
                height={this.state.canvas['height']}
                onMouseDown={this.onMouseDown}
                onMouseUp={this.onMouseUp}
                onMouseMove={this.onMouseMove}
                onMouseLeave={this.onMouseLeave}
                onClick={this.onMouseClick}
              >
                <Layer>
                  <Image
                    crop={this.state.crop}
                    width={this.state.canvas['width']}
                    height={this.state.canvas['height']}
                    image={this.state.imageHTML}
                  />
                </Layer>
                <Layer>
                  {this.state.drawings.map(this.getDrawingMarkup)}
                  {this.state.newDrawing && this.getDrawingMarkup(this.state.newDrawing)}
                </Layer>
              </Stage>
            )}
          </div>
        </div>
        {!this.props.withoutCaption && (
          <div className="captionInput">
            <Input
              fluid
              placeholder={'Caption'}
              onChange={this.onCaptionEdit}
              value={this.state.caption}
            />
          </div>
        )}
        {/* <Button disabled={!this.state.isReady} onClick={this.finishEditing}>
          {this.props.okText}
        </Button> */}
      </div>
    );
  }
}
