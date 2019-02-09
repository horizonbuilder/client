import * as React from 'react';
import { connect } from 'react-redux';
import { pick } from 'lodash';

import LoadingContainer from './shared/components/LoadingContainer';

import { Shell } from './Shell';

import authActions from './modules/auth/actions';

class App extends React.Component<any> {
  componentDidMount() {
    this.props.getUserInfo();
  }

  render() {
    if (this.props.loading) {
      return <LoadingContainer text="Loading..." />;
    }

    return <Shell />;
  }
}

const mapStateToProps = ({ auth }) => ({
  loading: auth.loading
});
const mapDispatchToProps = pick(authActions, ['getUserInfo']);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
