import * as React from 'react';
import UploadService from '../../../services/upload';
import { FileInfo as IFileInfo } from '../../../types';
import { FileInput, FileInputSizes } from '../FileInput';

export interface UploadProps {
  onUpload: (url: string) => any;
  fileType?: 'image' | 'audio' | 'video' | 'any';
  fluid?: boolean;
  size?: FileInputSizes;
}

export class FileUpload extends React.Component<UploadProps> {
  fileInput: any = null;

  async handleSubmit(e) {
    let file = e.target.files[0];
    let name = file.name;
    let type = file.type;

    let fileInfo: IFileInfo = await UploadService.uploadFile(name, type);
    let s3Response = await fetch(fileInfo.signedRequest, { body: file, method: 'PUT' });
    if (s3Response.status == 200) console.log('success');

    this.props.onUpload(fileInfo.url);
  }

  acceptedFileTypes() {
    if (this.props.fileType == 'audio') return 'audio/*';
    else if (this.props.fileType == 'video') return 'video/*';
    else return '.jpg, .jpeg, .png, .pdf, .doc, .docx, .xls, .xlsx';
  }

  render() {
    return (
      <FileInput
        size={this.props.size}
        fluid={!!this.props.fluid}
        accept={this.acceptedFileTypes()}
        ref={f => {
          this.fileInput = f;
        }}
        onChange={this.handleSubmit.bind(this)}
        className="file-upload"
      />
    );
  }
}
