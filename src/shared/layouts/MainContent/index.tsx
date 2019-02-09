import * as React from 'react';
import * as styles from './styles.css';
import * as classnames from 'classnames';
import { matchPath } from 'react-router-dom';

interface MainContentProps {
  location?: any;
}

export class MainContent extends React.Component<MainContentProps, null> {
  isRoutedToSectionMap = (): boolean => {
    if (this.props.location !== undefined) {
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
    return (
      <div className={classnames(styles.MainContent, this.isRoutedToSectionMap() ? styles.NoPadding : '')} id="MainContent">
        {this.props.children}
      </div>
    );
  }
}
