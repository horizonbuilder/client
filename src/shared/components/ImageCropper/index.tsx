import * as React from 'react';
import * as styles from './styles.css';
import { CloseFunction } from '../../../types/Report';
import { Button } from '../Button';
import 'cropperjs/dist/cropper.min.css';
import Cropper from 'cropperjs';
import { ImageObject } from '../../../types';

export interface ImageCropperProps {
  closeModal: CloseFunction;
  image: ImageObject;
  onDone: Function;
}

export interface ImageCropperState {
  isReady: boolean;
}

export interface ImageCropper {
  image: HTMLImageElement;
  cropper: object;
  imageElementWrapper: HTMLDivElement;
}

export class ImageCropper extends React.Component<ImageCropperProps, ImageCropperState>
  implements ImageCropper {
  constructor(props: ImageCropperProps) {
    super(props);
    this.cropper = null;

    this.state = {
      isReady: false
    };

    this.initialize = this.initialize.bind(this);
    this.cropImage = this.cropImage.bind(this);
  }

  componentDidMount() {
    this.initialize();
  }

  cropImage() {
    let imageSizes = this.cropper['getImageData']();
    let cropBox = this.cropper['getCropBoxData']();

    //correction of values
    cropBox.left = cropBox.left < 0 ? 0 : cropBox.left;
    cropBox.top = cropBox.top < 0 ? 0 : cropBox.top;
    cropBox.width = cropBox.width > imageSizes.width ? imageSizes.width : cropBox.width;
    cropBox.height = cropBox.height > imageSizes.height ? imageSizes.height : cropBox.height;

    //calculating values in percentages
    cropBox.left = parseFloat(((cropBox.left / imageSizes.width) * 100).toFixed(1));
    cropBox.top = parseFloat(((cropBox.top / imageSizes.height) * 100).toFixed(1));
    cropBox.width = parseFloat(((cropBox.width / imageSizes.width) * 100).toFixed(1));
    cropBox.height = parseFloat(((cropBox.height / imageSizes.height) * 100).toFixed(1));

    this.props.onDone({
      ...this.props.image,
      cropbox: cropBox,
      initialHeightToWidth: imageSizes.height / imageSizes.width
    });
  }

  initialize() {
    let _cthis = this;

    let image = document.getElementById('imageToCrop') as HTMLImageElement;

    image.onload = () => {
      let cropper = new Cropper(image, {
        zoomable: false,
        checkCrossOrigin: false,
        movable: false,
        rotatable: false,
        scalable: false,
        minCropBoxWidth: 5,
        minCropBoxHeight: 5,
        guides: true,
        ready: function() {
          cropper.setCropBoxData({
            left: (image.naturalWidth * _cthis.props.image.cropbox.left) / 100,
            top: (image.naturalHeight * _cthis.props.image.cropbox.top) / 100,
            width: (image.naturalWidth * _cthis.props.image.cropbox.width) / 100,
            height: (image.naturalHeight * _cthis.props.image.cropbox.height) / 100
          });

          _cthis.image = image;
          _cthis.cropper = cropper;
          _cthis.setState({ isReady: true });
        }
      });
    };
  }

  render() {
    return (
      <div>
        <div
          ref={el => {
            this.imageElementWrapper = el;
          }}
          className={styles.imageElementWrapper}
        >
          <img data-crossorigin="anonymous" id="imageToCrop" src={this.props.image.url} />
        </div>
        <Button disabled={!this.state.isReady} onClick={this.cropImage}>
          Crop
        </Button>
      </div>
    );
  }
}
