import * as React from 'react';
import { Job } from '../../../types';
import * as styles from './styles.css';
import * as classnames from 'classnames';
import { Button } from '../../../shared/components/Button';
import JobService from '../../../services/jobs';
import jobsActions from '../../../modules/jobs/actions';
import { connect } from 'react-redux';
import { pick } from 'lodash';

interface JobMenuProps {
  jobId: string;
  updateJobs?: Function;
}

export interface JobMenuState {
  moreMenuOpen: boolean;
  showModal: boolean;
}

class JobMenuComponent extends React.Component<JobMenuProps, JobMenuState> {
  state = {
    moreMenuOpen: false,
    showModal: false
  };

  toggleMoreMenu() {
    this.setState({ moreMenuOpen: !this.state.moreMenuOpen });
  }

  async onDeleteClick() {
    await JobService.deleteJob(parseInt(this.props.jobId));
    this.props.updateJobs();
  }

  render() {
    let { showModal, moreMenuOpen } = this.state;

    return (
      <div className={styles.JobEdit}>
        <div
          className={classnames(styles.JobMenu, {
            [styles.JobMenuOpen]: moreMenuOpen
          })}
        >
          <div className={styles.JobMenuItem} onClick={this.onDeleteClick.bind(this)}>
            Delete
          </div>
        </div>
        <div
          className={classnames('fa fa-ellipsis-h', styles.JobMenuButton)}
          onClick={this.toggleMoreMenu.bind(this)}
        />
      </div>
    );
  }
}

const mapDispatchToProps = {
  updateJobs: jobsActions['getJobs']
};

export const JobMenu = connect(null, mapDispatchToProps as any)(JobMenuComponent);
