import * as React from 'react';
import { CloseFunction } from '../../../types/Report';
import { ImageCropper } from '../ImageCropper';
import { ImageAnnotationEditor } from '../ImageAnnotationEditor';
import { ImageObject } from '../../../types';

export interface ImageEditorProps {
  closeModal: CloseFunction;
  image: ImageObject;
  onDone: Function;
  parent?: any;
}

export interface ImageEditorState {
  stage: number;
  data: ImageObject;
}

export class ImageEditor extends React.Component<ImageEditorProps, ImageEditorState> {
  imageAnnotationEditorRef: any;

  constructor(props: ImageEditorProps) {
    super(props);

    this.imageAnnotationEditorRef = React.createRef();

    this.state = {
      stage: 0,
      data: props.image
    };

    this.handleCrop = this.handleCrop.bind(this);
    this.handleAnnotationsAddition = this.handleAnnotationsAddition.bind(this);
    this.onImageEditDone = this.onImageEditDone.bind(this);
  }

  handleCrop(updatedImage: ImageObject) {
    this.setState({
      stage: this.state.stage + 1,
      data: updatedImage
    });
  }

  onImageEditDone() {
    this.imageAnnotationEditorRef.current.finishEditing();
  }

  handleAnnotationsAddition(updatedImage: ImageObject) {
    this.props.onDone(updatedImage);
  }

  render() {
    return !this.state.stage ? (
      <ImageCropper
        onDone={this.handleCrop}
        closeModal={this.props.closeModal}
        image={this.state.data}
      />
    ) : (
      <ImageAnnotationEditor
        onDone={this.handleAnnotationsAddition}
        closeModal={this.props.closeModal}
        image={this.state.data}
        ref={this.imageAnnotationEditorRef}
      />
    );
  }
}
