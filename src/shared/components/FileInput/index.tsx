import * as React from 'react';
import * as styles from './styles.css';
import Dropzone from 'react-dropzone';
import { Icon } from '../Icon';
import * as classnames from 'classnames';

export type FileInputSizes = 'original' | 'medium' | 'small';

export interface FileInputProps {
  onChange?: Function;
  accept?: string;
  disabled?: boolean;
  className?: string;
  multiple?: boolean;
  fluid?: boolean;
  size?: FileInputSizes;
  name?: string;
}

export class FileInput extends React.Component<FileInputProps, any> {
  constructor(props) {
    super(props);
    this.onDrop = this.onDrop.bind(this);
  }

  onDrop(acceptedFiles, rejectedFiles) {
    if (typeof this.props.onChange == 'function') {
      this.props.onChange({
        target: {
          name: this.props.name,
          files: acceptedFiles
        }
      });
    }
  }

  render() {
    let {
      disabled = false,
      multiple = false,
      fluid = false,
      size = 'original',
      accept,
      className
    } = this.props;

    return (
      <div
        className={classnames('file-input-component', styles.FileInput, className, {
          [styles.disabled]: disabled,
          [styles.fluid]: fluid,
          [styles.original]: size == 'original',
          [styles.medium]: size == 'medium',
          [styles.small]: size == 'small'
        })}
      >
        <Dropzone
          accept={accept}
          disabled={disabled}
          className="react-dropzone"
          onDrop={this.onDrop.bind(this)}
          multiple={multiple}
          activeClassName={styles.draggingOverDropzone}
        >
          <div className={styles.dropzoneContent}>
            <div>
              <Icon icon="fas fa-paperclip" /> Drop File
              {multiple ? '(s)' : ''} or <span>browse</span>
            </div>
          </div>
        </Dropzone>
      </div>
    );
  }
}
