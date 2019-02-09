import * as React from 'react';
import './styles.css';
import { BrowserRouter, Link, withRouter } from 'react-router-dom';
import { Route, Switch } from 'react-router';
import { Jobs } from '../Jobs';
import { Job } from '../Job';
import { CreateJob } from '../CreateJob';
import { LogIn } from '../LogIn';
import { LogOut } from '../LogOut';
import { AuthenticatedRoute } from './AuthenticatedRoute';
import HistoryListener from './HistoryListener';
import LoadingContainer from '../shared/components/LoadingContainer';
import { enhanceWithHeader } from '../shared/layouts/HeaderNavBar/';

const AuthenticatedRoutes = enhanceWithHeader(() => (
  <React.Fragment>
    <AuthenticatedRoute path="/" exact component={Jobs} />

    <AuthenticatedRoute exact path="/jobs" component={Jobs} />
    <AuthenticatedRoute path="/jobs/:jobId" component={Job} />
    <AuthenticatedRoute path="/create-job" component={CreateJob} />
  </React.Fragment>
));

export const Shell = (): React.ReactElement<any> => {
  return (
    <BrowserRouter>
      <HistoryListener>
        <Switch>
          <Route path="/loading" exact component={LoadingContainer} />
          <Route path="/login" exact component={LogIn} />
          <Route path="/logout" exact component={LogOut} />
          <AuthenticatedRoutes />
        </Switch>
      </HistoryListener>
    </BrowserRouter>
  );
};
