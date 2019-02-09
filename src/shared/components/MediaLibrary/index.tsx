import * as React from 'react';
import * as styles from './styles.css';
import { CloseFunction } from '../../../types/Report';
import { File as IFile, ImageObject } from '../../../types';
// import TractService from '../../../services/tracts';
// import SaleService from '../../../services/sales';
// import WorkfileService from '../../../services/workfiles';
import { Button } from '../Button';
import { ImageList } from '../FileList';
import { ComponentTab } from '../ComponentTab';
import { Modal } from '../Modal';
import { ImageEditor } from '../ImageEditor';

export interface ImageLibraryProps {
  closeModal: CloseFunction;
  onImageAdded: any;
  workfileId: string;
  showImageEditModal: boolean;
}

export interface ImageLibraryState {
  tractFiles: IFile[][];
  saleFiles: IFile[][];
  workfileFiles: IFile[];
  saleIds: number[];
  selectedFile: ImageObject;
  selectedFolder: any;
}

export class ImageLibrary extends React.Component<ImageLibraryProps, ImageLibraryState> {
  imageEditorRef: any;

  state: ImageLibraryState = {
    saleIds: [],
    tractFiles: [[]],
    saleFiles: [[]],
    workfileFiles: [],
    selectedFile: null,
    selectedFolder: { type: 'tractFiles', group: 1 }
  };

  constructor(props: ImageLibraryProps) {
    super(props);

    this.imageEditorRef = React.createRef();

    this.selectHandler = this.selectHandler.bind(this);
    this.handleImageInsertion = this.handleImageInsertion.bind(this);
    this.onImageEditDone = this.onImageEditDone.bind(this);
    this.getData();
  }

  async getData() {
    // await this.getTracts();
    // await this.getSales();
    // this.getWorkfileImages();
  }

  shouldComponentUpdate(nextProps: any, nextState: any) {
    return (
      nextState.tractFiles !== this.state.tractFiles ||
      nextState.saleFiles !== this.state.saleFiles ||
      nextState.selectedFolder !== this.state.selectedFolder ||
      nextState.selectedFile !== this.state.selectedFile ||
      nextProps.showImageEditModal !== this.props.showImageEditModal
    );
  }

  // async getTractImages(workfileId: string, tractId: number) {
  //   var tractFiles = await TractService.getWorkfileFiles(workfileId, tractId);
  //   var prevTracts = [];
  //   for (let i = 0; i < this.state.tractFiles.length; i++) {
  //     prevTracts[i] = this.state.tractFiles[i];
  //   }
  //   prevTracts[tractId] = tractFiles;
  //   this.setState({ tractFiles: prevTracts }, () => {
  //     for (let i = 0; i < this.state.tractFiles.length; i++) {
  //       if (this.state.tractFiles[i] && this.state.tractFiles[i].length) {
  //         this.setState({ selectedFolder: { type: 'tractFiles', group: i } });
  //         i = this.state.tractFiles.length;
  //       }
  //     }
  //   });
  // }

  // async getSaleImages(saleId: number) {
  //   var saleFiles = await SaleService.getFiles(saleId);
  //   var prevSales = [];
  //   for (let i = 0; i < this.state.saleFiles.length; i++) {
  //     prevSales[i] = this.state.saleFiles[i];
  //   }
  //   prevSales[saleId] = saleFiles;
  //   this.setState({ saleFiles: prevSales });
  // }
  //
  // async getTracts() {
  //   var tracts = await TractService.getWorkfileTracts(this.props.workfileId);
  //   for (let i = 0; i < tracts.length; i++) {
  //     this.getTractImages(this.props.workfileId, tracts[i].id);
  //   }
  // }
  //
  // async getSales() {
  //   var saleIds = await WorkfileService.getWorkfileSales(this.props.workfileId);
  //   this.setState({ saleIds }, () => {
  //     for (let i = 0; i < saleIds.length; i++) {
  //       this.getSaleImages(saleIds[i]);
  //     }
  //   });
  // }
  //
  // async getWorkfileImages() {
  //   let workfileFiles = await WorkfileService.getFiles(parseInt(this.props.workfileId));
  //   this.setState({ workfileFiles });
  // }

  selectHandler(file: IFile) {
    if (file) {
      this.setState({
        selectedFile: {
          url: file.file_url,
          cropbox: {
            left: 0,
            top: 0,
            width: 100,
            height: 100
          },
          drawings: [],
          initialHeightToWidth: 0.5
        }
      });
    }
  }

  handleImageInsertion(updatedImage: ImageObject) {
    this.setState({ selectedFile: null });
    this.props.closeModal();
    this.props.onImageAdded(updatedImage);
  }

  onImageEditDone() {
    this.imageEditorRef.current.onImageEditDone();
  }

  render() {
    let liKey = 0;
    var ImageMenu = [];
    ImageMenu.push(<li key={liKey++}>Subject Property</li>);
    for (let i = 0; i < this.state.tractFiles.length; i++) {
      if (this.state.tractFiles[i]) {
        if (this.state.tractFiles[i].length) {
          ImageMenu.push(
            <li key={liKey++}>
              <button
                className={
                  this.state.selectedFolder.type === 'tractFiles' &&
                  this.state.selectedFolder.group === i
                    ? styles.selected
                    : ''
                }
                key={'tract ' + (i + 1)}
                onClick={() => {
                  this.setState({
                    selectedFolder: { type: 'tractFiles', group: i }
                  });
                }}
              >
                {'tract ' + (i + 1)}
              </button>
            </li>
          );
        }
      }
    }
    ImageMenu.push(<li key={liKey++}>Sales</li>);
    for (let i = 0; i < this.state.saleFiles.length; i++) {
      if (this.state.saleFiles[i]) {
        if (this.state.saleFiles[i].length) {
          ImageMenu.push(
            <li key={liKey++}>
              <button
                className={
                  this.state.selectedFolder.type === 'saleFiles' &&
                  this.state.selectedFolder.group === i
                    ? styles.selected
                    : ''
                }
                key={'sale ' + (i + 1)}
                onClick={() => {
                  this.setState({
                    selectedFolder: { type: 'saleFiles', group: i }
                  });
                }}
              >
                {'sale ' + (i + 1)}
              </button>
            </li>
          );
        }
      }
    }
    ImageMenu.push(
      <li key={liKey++}>
        <button
          className={this.state.selectedFolder.type === 'workfileFiles' ? styles.selected : ''}
          key={'workfile'}
          onClick={() => {
            this.setState({
              selectedFolder: { type: 'workfileFiles' }
            });
          }}
        >
          {'Workfile'}
        </button>
      </li>
    );

    return (
      <div>
        {this.state.selectedFile && (
          <Modal
            show={this.props.showImageEditModal}
            showCancel={true}
            showOk={true}
            onOk={this.onImageEditDone}
            onCancel={this.props.closeModal}
          >
            <ImageEditor
              onDone={this.handleImageInsertion}
              image={this.state.selectedFile}
              closeModal={this.props.closeModal}
              ref={this.imageEditorRef}
            />
          </Modal>
        )}
        <div className={styles.mediaLibrary}>
          <ul className={styles.tabMenu}>{ImageMenu}</ul>
          <ImageList
            files={
              this.state.selectedFolder.group
                ? this.state[this.state.selectedFolder.type][this.state.selectedFolder.group]
                : this.state[this.state.selectedFolder.type]
            }
            onSelect={this.selectHandler}
            editing={true}
            useButtons={true}
            onDelete={id => {
              // if (this.state.selectedFolder.type === 'tractFiles') {
              //   let res = TractService.deleteWorkfileFile(
              //     this.props.workfileId,
              //     this.state.selectedFolder.group,
              //     id
              //   );
              //   let tractFiles = this.state[this.state.selectedFolder.type];
              //   let group = this.state[this.state.selectedFolder.type][
              //     this.state.selectedFolder.group
              //   ];
              //   for (let i = 0; i < group.length; i++) {
              //     if (group[i].id === id) {
              //       group.splice(i, 1);
              //       tractFiles[this.state.selectedFolder.group] = group;
              //     }
              //   }
              //
              //   this.setState({ tractFiles });
              // }
              // if (this.state.selectedFolder.type === 'saleFiles') {
              //   let res = SaleService.deleteFile(this.state.selectedFolder.group, id);
              //   let saleFiles = this.state[this.state.selectedFolder.type];
              //   let group = this.state[this.state.selectedFolder.type][
              //     this.state.selectedFolder.group
              //   ];
              //   for (let i = 0; i < group.length; i++) {
              //     if (group[i].id === id) {
              //       group.splice(i, 1);
              //       saleFiles[this.state.selectedFolder.group] = group;
              //     }
              //   }
              //
              //   this.setState({ saleFiles });
              // }
              // if (this.state.selectedFolder.type === 'workfileFiles') {
              //   let res = WorkfileService.deleteFile(parseInt(this.props.workfileId), id);
              //   let workfileFiles = this.state[this.state.selectedFolder.type];
              //
              //   this.setState({ workfileFiles });
              // }
            }}
          />
        </div>
      </div>
    );
  }
}
