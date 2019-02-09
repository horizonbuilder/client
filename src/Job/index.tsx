import * as React from 'react';
import * as styles from './styles.css';
import { Job as IJob, JobStatus } from '../types';
import { RouteComponentProps, Route, Switch } from 'react-router-dom';
import { Sidebar } from './components/Sidebar';
import { OuterWrapper } from '../shared/layouts/OuterWrapper';
import { MainContent } from '../shared/layouts/MainContent';
import jobsActions from '../modules/jobs/actions';
import { connect } from 'react-redux';
import { pick } from 'lodash';
import { Photos } from './components/Photos';
import { Documents } from './components/Documents';
import { JobInfo } from './components/JobInfo';
import { Estimate } from './components/Estimate';
import { Order } from './components/Order';

class JobComponent extends React.Component<any, any> {
  async componentDidMount() {
    this.props.updateCurrentJob((this.props as any).match.params.jobId);
  }

  render() {
    return this.props.job ? (
      <OuterWrapper>
        <Route path="/jobs/:jobId" component={Sidebar} />
        <MainContent location={this.props.location}>
          <Switch>
            <Route path="/jobs/:jobId/info" component={JobInfo} />

            <Route path="/jobs/:jobId/estimates/:estimateId" component={Estimate} />

            <Route path="/jobs/:jobId/orders/:orderId" component={Order} />

            <Route exact path="/jobs/:jobId/gallery" component={Photos} />

            <Route exact path="/jobs/:jobId/docs" component={Documents} />
          </Switch>
        </MainContent>
      </OuterWrapper>
    ) : null;
  }
}

const mapStateToProps = ({ jobs }) => ({
  job: jobs.current
});

const mapDispatchToProps = pick(jobsActions, ['updateCurrentJob']);

export const Job = connect(mapStateToProps, mapDispatchToProps)(JobComponent);
