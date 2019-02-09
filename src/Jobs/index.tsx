import * as React from 'react';
import * as styles from './styles.css';
import { TabbedTable, Tab, TabBar, TabContent } from '../shared/components/TabbedTable';
import { TabIndicator } from '../shared/components/TabIndicator';
import { Job, JobStatus } from '../types';
import { LoadingIndicator } from '../shared/components/LoadingIndicator';
import { InnerWrapper } from '../shared/layouts/InnerWrapper';
import { Button } from '../shared/components/Button';
import { Link } from 'react-router-dom';
import { JobTable } from './components/JobTable';
import jobsActions from '../modules/jobs/actions';
import { connect } from 'react-redux';
import { pick } from 'lodash';

interface JobsState {
  filterStatus: JobStatus | null;
}

interface JobsProps {
  getJobs: Function;
  jobs: Array<Job>;
  error: string;
  isLoading: boolean;
}

class JobsComponent extends React.Component<JobsProps, JobsState> {
  constructor(props: any) {
    super(props);

    this.state = {
      filterStatus: null
    };
  }

  componentWillMount() {
    this.props.getJobs();
  }

  setFilterStatus(filterStatus: JobStatus | null = null): void {
    this.setState({
      filterStatus
    });
  }

  filterJobs(jobs: Array<Job>, filterStatus: JobStatus | null = null): Array<Job> {
    if (!filterStatus) {
      return jobs;
    }

    return jobs.filter(job => job.status === filterStatus);
  }

  countPerStatus(jobs: Array<Job>, status: JobStatus | null = null): number {
    return this.filterJobs(jobs, status).length;
  }

  render() {
    const { filterStatus } = this.state;
    const { jobs, error, isLoading } = this.props;

    const filteredJobs = this.filterJobs(jobs, filterStatus);

    return (
      <InnerWrapper>
        <div className={styles.CreateButton}>
          <Link to={`/create-job`}>
            <Button iconLeft="fas fa-plus" type="primary">
              New Job
            </Button>
          </Link>
        </div>
        <TabbedTable>
          <TabBar>
            <Tab onClick={() => this.setFilterStatus('in-progress')}>
              {(isActive: boolean) => (
                <TabIndicator
                  type="important"
                  count={this.countPerStatus(jobs, 'in-progress')}
                  isActive={isActive}
                  title="In Progress"
                />
              )}
            </Tab>

            <Tab onClick={() => this.setFilterStatus('revised')}>
              {(isActive: boolean) => (
                <TabIndicator
                  count={this.countPerStatus(jobs, 'revised')}
                  isActive={isActive}
                  title="In Review"
                />
              )}
            </Tab>

            <Tab onClick={() => this.setFilterStatus('prospective')}>
              {(isActive: boolean) => (
                <TabIndicator
                  count={this.countPerStatus(jobs, 'prospective')}
                  isActive={isActive}
                  title="Prospective"
                />
              )}
            </Tab>

            <Tab onClick={() => this.setFilterStatus('completed')}>
              {(isActive: boolean) => (
                <TabIndicator
                  type="primary"
                  count={this.countPerStatus(jobs, 'completed')}
                  isActive={isActive}
                  title="Complete"
                />
              )}
            </Tab>

            <Tab onClick={() => this.setFilterStatus()}>
              {(isActive: boolean) => (
                <TabIndicator
                  type="secondary"
                  count={this.countPerStatus(jobs)}
                  isActive={isActive}
                  title="All"
                />
              )}
            </Tab>
          </TabBar>

          <TabContent>
            {!isLoading && !error && filteredJobs.length > 0 && <JobTable jobs={filteredJobs} />}

            {!isLoading &&
              !error &&
              filteredJobs.length === 0 && (
                <div className={styles.BlankJobs}>
                  <div className={styles.NoJobsText}>No jobs with this status</div>
                </div>
              )}

            {!!error && <div className={styles.BlankJobs}>{error}</div>}

            {isLoading && (
              <div className={styles.BlankJobs}>
                <LoadingIndicator />
                Loading Jobs
              </div>
            )}
          </TabContent>
        </TabbedTable>
      </InnerWrapper>
    );
  }
}

const mapStateToProps = ({ jobs }) => ({
  jobs: jobs.list,
  error: jobs.errorMsg,
  isLoading: jobs.isLoading
});

const mapDispatchToProps = pick(jobsActions, ['getJobs']);

export const Jobs = connect(mapStateToProps, mapDispatchToProps)(JobsComponent);
