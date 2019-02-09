import * as React from 'react';
import * as styles from './styles.css';
import * as classnames from 'classnames';
import { pick } from 'lodash';
import { connect } from 'react-redux';
import { INavigationState } from '../../../modules/navigation/utils';
import { Icon } from '../../../shared/components/Icon';
import NavigationActions from '../../../modules/navigation/actions';
import { RouteComponentProps, matchPath } from 'react-router-dom';

interface SidebarProps {
  isExpanded?: boolean;
  setExpanded?: (isExpanded: boolean) => void;
  expandable? :boolean;
  location?: any;
}

interface MappedStateProps {
  isExpanded?: boolean;
}

interface MappedDispatchProps {
  setExpanded?: (isExpanded: boolean) => void;
}

const mapStateToProps = (state: any, ownProps: SidebarProps): MappedStateProps => {
  return {
    isExpanded: state.navigation.isExpanded
  };
};

const mapDispatchToProps = {
  ...pick(NavigationActions, [
    'setExpanded'
  ])
};

const mergeProps = (
  stateProps: MappedStateProps,
  dispatchProps: MappedDispatchProps,
  ownProps: SidebarProps
) => ({
  ...stateProps,
  ...dispatchProps,
  ...ownProps
});

export class Sidebar extends React.Component<SidebarProps, null> {
  isRoutedToSectionMap = (): boolean => {
    if (this.props.location) {
      const { pathname } = this.props.location;

      const match = matchPath(pathname, {
        path: `/workfiles/:workfileId/tracts/:tractId/map`,
        exact: false
      });

      return !!match && match.isExact;
    }

    return false;
  }

  render() {
    const { isExpanded } = this.props;

    return (
      <div className={classnames(styles.Sidebar, this.isRoutedToSectionMap() ? styles.hidden : '', isExpanded ? styles.expanded : '')} id="sidebar">
        {this.props.children}
        {!this.props.expandable && (
          <Icon icon={isExpanded ? 'fas fa-chevron-left' : 'fas fa-chevron-right'} onClick={() => this.props.setExpanded(!isExpanded)}></Icon>
        )}
      </div>
    );
  }
}

export const ConnectedSidebar = connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(Sidebar);