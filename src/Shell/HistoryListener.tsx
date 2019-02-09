import * as React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { pick } from 'lodash';

// import SaleService from '../services/sales';
// import SalesLibraryService from '../services/salesLibrary';
import LoadingContainer from '../shared/components/LoadingContainer';

interface ListenerProps {
  children: any;
}

export interface ListenerState {
  isLoading: boolean;
}

class Listener extends React.Component<RouteComponentProps<ListenerProps>, ListenerState> {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true
    };
  }

  componentWillMount() {
    this.listenHistory(this.props.location);
    this.props.history.listen(this.listenHistory);
  }

  listenHistory = async location => {
    this.setState({
      isLoading: true
    });

    // const mayNeedRefresh = await SaleService.validateCache();

    // if (mayNeedRefresh) {
    // SalesLibraryService.invalidateLibrary();
    // }

    this.setState({
      isLoading: false
    });
  };

  render() {
    if (this.state.isLoading) {
      return <LoadingContainer text="Loading..." />;
    }
    return this.props.children;
  }
}

export default withRouter(Listener);
