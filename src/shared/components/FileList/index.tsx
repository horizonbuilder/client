import * as React from 'react';
import * as styles from './styles.css';
import * as classnames from 'classnames';
import { File as IFile, ImageObject, FileInfo as IFileInfo } from '../../../types';
import { Checkbox } from '../Checkbox';
import { Modal } from '../Modal';
// import { ImageDatatype } from '../ReportEditor/datatypes/image';
import { Button } from '../Button';
import { Input } from '../Input';
import UploadService from '../../../services/upload';
import * as uuidv4 from 'uuid/v4';

export interface ImageListProps {
  files: Array<IFile>;
  selectedFiles?: Array<IFile>;
  onSelect?: any;
  useButtons?: boolean;
  onDelete?: any;
  editing?: boolean;
  onUpload?: (url, description, payload, original) => void;
}
export interface ImageListState {
  selectedFile: number;
  showImageEditModal: boolean;
  imageObj: ImageObject;
  keepOriginal: boolean;
  description: string;
  id: string;
}

const imageParams = {
  mimeType: 'image/jpeg',
  quality: 0.5
};

export class ImageList extends React.Component<ImageListProps, ImageListState> {
  fileBlob: Blob;
  imageHTML: HTMLImageElement;
  snapshotImageContainer: any = React.createRef();
  imageDT: any;

  state: ImageListState = {
    selectedFile: null,
    showImageEditModal: false,
    keepOriginal: true,
    imageObj: null,
    description: '',
    id: null
  };

  constructor(props: ImageListProps) {
    super(props);
    this.selectFile = this.selectFile.bind(this);
    this.onClickHandler = this.onClickHandler.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.files !== this.props.files) {
      this.setState({ selectedFile: null });
    }
  }

  selectFile(evt: any) {
    var file = parseInt(evt.target.dataset.file);

    if (isNaN(file)) {
      file = parseInt(evt.target.parentNode.dataset.file);
    }

    this.setState({ selectedFile: file });
    if (this.props.onSelect !== undefined) {
      this.props.onSelect(this.props.files[file], true);
    }
  }

  onClickHandler(evt: any) {
    if (evt.target.type === 'checkbox') {
      this.setState({ selectedFile: null });
      this.props.onSelect(
        this.props.files[evt.target.parentNode.parentNode.parentNode.parentNode.dataset.file],
        false
      );
    }
  }

  resetState = () => {
    this.setState({
      selectedFile: null,
      showImageEditModal: false,
      imageObj: null
    });
  };

  onEdit = async (evt: any) => {
    if (evt.target.parentNode.id === 'resizer') {
      let fileId = parseInt(evt.target.parentNode.parentNode.dataset.file);
      let file = this.props.files[fileId];

      let imgDataurl;
      let canvas = document.createElement('canvas');
      let ctx = canvas.getContext('2d');

      if (file) {
        let img = new Image();
        img.onload = async () => {
          canvas.width = img.naturalWidth;
          canvas.height = img.naturalHeight;
          ctx.drawImage(img, 0, 0);

          this.fileBlob = (await new Promise(res =>
            canvas.toBlob(res, imageParams.mimeType, imageParams.quality)
          )) as any;

          imgDataurl = canvas.toDataURL();

          this.setState({
            showImageEditModal: true,
            id: uuidv4(),
            selectedFile: fileId,
            imageObj: {
              url: imgDataurl,
              cropbox: {
                left: 0,
                top: 0,
                width: 100,
                height: 100
              },
              drawings: [],
              initialHeightToWidth: img.naturalHeight / img.naturalWidth
            }
          });
        };

        img.crossOrigin = '';
        img.src = file.file_url;
        this.imageHTML = img;
      }
    }
  };

  onCloseEditModal = () => {
    this.setState({ showImageEditModal: false, keepOriginal: true });
  };

  isSelected = file => {
    const f = (this.props.selectedFiles || []).find(item => item.id === file.id);
    if (f) {
      return true;
    }

    return false;
  };

  onSnapshotUpdated = newImageObj => {
    this.setState({
      imageObj: {
        ...newImageObj
      }
    });
  };

  generateImage = async () => {
    let blobData = this.fileBlob;

    if (this.state.imageObj.drawings.length) {
      await new Promise(resolve => {
        let canvas = document.createElement('canvas');

        canvas.width = this.imageHTML.naturalWidth;
        canvas.height = this.imageHTML.naturalHeight;

        let ctx = canvas.getContext('2d');
        let pathImg = new Image();

        pathImg.crossOrigin = '';
        pathImg.src = `data:image/svg+xml;base64,${window.btoa(this.imageDT.generateSVG())}`;

        pathImg.onload = async () => {
          ctx.drawImage(pathImg, 0, 0);
          blobData = (await new Promise(res =>
            canvas.toBlob(res, imageParams.mimeType, imageParams.quality)
          )) as any;
          resolve();
        };
      });
    }

    await this.saveSnapshot(blobData);
  };

  saveSnapshot = async data => {
    let name = `snapshot-${+new Date()}.png`;
    let type = 'image/png';
    let fileInfo: IFileInfo = await UploadService.uploadFile(name, type);
    let s3Response = await fetch(fileInfo.signedRequest, { method: 'PUT', body: data });
    if (s3Response.status == 200) console.log('success');

    if (this.state.keepOriginal) {
      await this.props.onUpload(fileInfo.url, this.state.description, 'edited', null);
    } else {
      await this.props.onUpload(
        fileInfo.url,
        this.state.description,
        'edited',
        this.props.files[this.state.selectedFile]
      );
    }
  };

  onOkClick = async () => {
    await this.generateImage();
    this.setState({ showImageEditModal: false, keepOriginal: true });
  };

  onEditClick = () => {
    this.imageDT.onEditLabels();
  };

  render() {
    var images = [];
    if (this.props.files) {
      for (let b = 0; b < this.props.files.length; b++) {
        var selected = this.state.selectedFile === b ? styles.selected : '';
        const isSelected = this.isSelected(this.props.files[b]);
        switch (this.props.files[b].group) {
          case 'image':
            let img = (
              <img
                key={'file' + b}
                src={this.props.files[b].file_url}
                alt={this.props.files[b].description}
                className={styles.image}
                style={this.props.editing ? { zIndex: 0 } : null}
              />
            );
            if (this.props.useButtons)
              images.push(
                <button
                  key={'button' + b}
                  onClick={this.selectFile}
                  data-file={b}
                  // className={styles.imageContainer + ' ' + selected}
                  className={classnames(
                    styles.imageContainer,
                    selected,
                    isSelected ? styles.isSelected : ''
                  )}
                >
                  {this.props.onDelete && (
                    <span
                      className={styles.remove}
                      onClick={e => {
                        e.stopPropagation();
                        this.props.onDelete(this.props.files[b].id);
                      }}
                    >
                      <i className="fas fa-times-circle" />
                    </span>
                  )}
                  <div className={styles.resizeContainer} id="resizer" onClick={this.onEdit}>
                    <i className="fas fa-edit" />
                  </div>
                  {img}
                  <div
                    className={styles.imageFooter}
                    style={this.props.editing ? { display: 'none' } : null}
                  >
                    {this.props.files[b].description && (
                      <span className={styles.caption}>
                        {this.props.files[b].description.substring(0, 20)}
                      </span>
                    )}
                    <div className={styles.selectContainer}>
                      <Checkbox
                        onChange={this.onClickHandler}
                        checked={this.isSelected(this.props.files[b])}
                      />
                    </div>
                  </div>
                </button>
                // <ImageButton index={b} src={this.props.files[b].file_url} description={this.props.files[b].description} selected={this.isSelected(this.props.files[b])} onSelect={this.selectFile} />
              );
            else
              images.push(
                <div className={styles.imageContainer} key={'image' + b}>
                  <div className={styles.resizeContainer}>
                    <i className="fas fa-edit" />
                  </div>
                  {img}
                  {this.props.files[b].description && (
                    <span className={styles.caption}>
                      {this.props.files[b].description.substring(0, 20)}
                    </span>
                  )}
                </div>
              );
            break;
          case 'document':
            images.push(
              <button
                key={'button' + b}
                onClick={this.selectFile}
                data-file={b}
                className={selected}
              >
                <object key={'file' + b} data={this.props.files[b].file_url} />
              </button>
            );
            break;
        }
      }
    }
    return (
      <div>
        {this.state.imageObj && (
          <Modal
            show={this.state.showImageEditModal}
            showCancel={true}
            onOk={this.onOkClick}
            showOk={true}
            okText="Save"
            onCancel={this.onCloseEditModal}
            size="medium"
          >
            <div className={styles.PhotoModalHeader}>
              <div className={styles.PhotoModalHeaderTitle}>
                Screenshot
                <Button
                  type="light"
                  onClick={this.onEditClick}
                  size="tiny"
                  className={classnames(styles.EditBtn, styles.small)}
                >
                  Edit
                </Button>
              </div>
              <div className={classnames(styles.PhotoModalHeaderActions)}>
                <Button type="light" onClick={this.resetState} className={styles.PhotoModalClose}>
                  <i className="fas fa-times" />
                </Button>
              </div>
            </div>
            <div className={styles.SnapshotContent}>
              {/*<ImageDatatype
                onChange={this.onSnapshotUpdated}
                onRef={e => (this.imageDT = e)}
                preserveAspectRatio={'xMinYMin meet'}
                id={this.state.id}
                value={this.state.imageObj}
                isEditable={false}
                withoutCaption
              />*/}

              <div className={styles.wrapper}>
                <Input
                  fluid
                  label="description"
                  id="description"
                  name="description"
                  value={this.state.description || ''}
                  onChange={e => this.setState({ description: e.target.value })}
                  className={styles.inputContainer}
                />
              </div>
              <div className={styles.SnapshotControls}>
                <Checkbox
                  onChange={() => {
                    this.setState({ keepOriginal: !this.state.keepOriginal });
                  }}
                  checked={this.state.keepOriginal}
                >
                  Keep original
                </Checkbox>
              </div>
            </div>
          </Modal>
        )}
        <div className={styles.imageList}>{images}</div>
      </div>
    );
  }
}
