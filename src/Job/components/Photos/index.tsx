import * as React from 'react';
import * as styles from './styles.css';
import * as classnames from 'classnames';
import { RouteComponentProps, Switch, Route, Link } from 'react-router-dom';

import { File as IFile } from '../../../types';
import { TabNavigation } from '../../../shared/components/TabNavigation';
import { Button } from '../../../shared/components/Button';
import JobsService from '../../../services/jobs';
import { Input } from '../../../shared/components/Input';

export interface PhotosProps {
  jobId: string;
}

export interface Props extends RouteComponentProps<PhotosProps> {
  nonEditable?: boolean;
  onFileSelected?: any;
}

export interface PhotosState {
  mode: string;
  file: IFile;
  selectedFiles: Array<IFile>;
  isLoading: boolean;
  view: string;
  description: string;
}

export class Photos extends React.Component<Props, PhotosState> {
  unsubscribeFromTracts: any;
  mounted: boolean;

  constructor(props: Props) {
    super(props);

    this.state = {
      mode: 'view',
      file: null,
      selectedFiles: [],
      isLoading: false,
      view: 'photos',
      description: ''
    };
  }

  componentDidMount() {
    this.mounted = true;
  }

  componentWillUnmount() {
    this.mounted = false;
    this.unsubscribeFromTracts && this.unsubscribeFromTracts();
  }

  onImageSelected = (file, single) => {
    if (file && single) {
      this.setState({ file, description: file.description });
      this.props.onFileSelected(file);
    } else if (file && !single) {
      const selectedFiles = [...this.state.selectedFiles];
      const f = selectedFiles.findIndex(item => item.id === file.id);

      if (f === -1) {
        selectedFiles.push(file);
      } else {
        selectedFiles.splice(f, 1);
      }

      this.setState({ selectedFiles });
    }
  };

  onDelete = async () => {
    await this.state.selectedFiles.map(async item => {
      await JobsService.deleteFile(parseInt(this.props.match.params.jobId, 10), item.id);
    });

    this.setState({ selectedFiles: [], file: null });
  };

  pickerItemClassName(picker: string): string {
    if (this.state.view === picker) {
      return styles.GalleryViewPickerItemSelected;
    }

    return styles.GalleryViewPickerItem;
  }

  updateDescription = async () => {
    const { file } = this.state;
    const { jobId } = this.props.match.params;

    let updatedFile = null;

    file.description = this.state.description;
    // updatedFile = await TractService.updateJobFile(jobId, tractId, file.id, file);

    this.setState({ file: updatedFile });
  };

  render() {
    return (
      <div className={styles.Photos}>
        <div className={styles.PhotosHeader}>
          <div className={styles.PhotoHeaderTitleWrapper}>
            <div className={styles.PhotoHeaderTitle}>Gallery</div>
            <div className={styles.GalleryViewPicker}>
              <a
                className={this.pickerItemClassName('photos')}
                onClick={() => this.setState({ view: 'photos' })}
              >
                Photos
              </a>
              <a
                className={this.pickerItemClassName('screenshots')}
                onClick={() => this.setState({ view: 'screenshots' })}
              >
                Screenshots
              </a>
              <a
                className={this.pickerItemClassName('edited')}
                onClick={() => this.setState({ view: 'edited' })}
              >
                Edited
              </a>
            </div>
            {/* <div className={classnames(styles.PhotosHeaderTitle, this.state.view === 'photos' ? styles.active : '')} onClick={() => this.setState({ view: 'photos' })}>Photos</div>
                        <div className={classnames(styles.PhotosHeaderTitle, this.state.view === 'maps' ? styles.active : '')} onClick={() => this.setState({ view: 'maps' })}>Maps</div> */}
          </div>
          {this.state.selectedFiles.length > 0 && (
            <div className={styles.PhotoHeaderOptions}>
              {`${this.state.selectedFiles.length} selected`}
              <Button
                type="secondary"
                size="tiny"
                onClick={() => this.setState({ selectedFiles: [] })}
                className={styles.CancelBtn}
              >
                Cancel
              </Button>
              <Button type="primary" size="tiny" onClick={this.onDelete} className={styles.OkBtn}>
                Delete
              </Button>
            </div>
          )}
        </div>
        <div className={styles.PhotosBody}>
          {/*<div className={styles.TractsBodyNavigation}>
            <TabNavigation
              className={styles.SidebarNavigation}
              value={tractId}
              options={groupOptions}
              onChange={e => {
                this.setState({ tractId: e.value, file: null, selectedFiles: [] });
              }}
            />
          </div>
          <div className={styles.TractsBodyMain}>
            <TractUpload
              nonEditable={this.props.nonEditable}
              view={this.state.view}
              selectedFiles={this.state.selectedFiles}
              onSelect={(file, single) => this.onImageSelected(file, single)}
              tractId={this.state.tractId.toString()}
              jobId={this.props.match.params.jobId}
            />
          </div>*/}
          {!this.props.nonEditable && (
            <div className={styles.TractsPreview}>
              {this.state.file && (
                <div className={styles.ImagePreview}>
                  <div className={styles.ImageName}>{this.state.file.id}</div>
                  <div className={styles.ImageContainer}>
                    <img src={this.state.file.file_url} alt={this.state.file.description} />
                  </div>
                  {/* <div className={styles.ImageDescription}>{this.state.file.description}</div> */}
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Input
                      fluid
                      label="description"
                      id="description"
                      name="description"
                      value={this.state.description || ''}
                      onChange={e => this.setState({ description: e.target.value })}
                      className={styles.inputContainer}
                    />
                    <Button
                      onClick={this.updateDescription}
                      size="tiny"
                      icon="fas fa-edit"
                      className={styles.buttonContainer}
                    />
                  </div>
                </div>
              )}
              {!this.state.file && <p>Click on an image to preview</p>}
            </div>
          )}
        </div>
      </div>
    );
  }
}
