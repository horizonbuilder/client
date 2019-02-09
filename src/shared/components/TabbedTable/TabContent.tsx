import * as React from 'react';
import * as PropTypes from 'prop-types';
import * as styles from './styles.css';
import * as classnames from 'classnames';
import { TabbedTableContext } from './TabbedTableContext';

export interface TabContentProps {
  children: any;
}

export class TabContent extends React.Component<TabContentProps, undefined> {
  context: TabbedTableContext;

  static contextTypes = {
    onTabSelect: PropTypes.func.isRequired,
    activeTabIndex: PropTypes.number,
    lastTabActive: PropTypes.bool
  };

  tabContentClassName(): string {
    const { activeTabIndex, lastTabActive } = this.context;

    return classnames(styles.TabContent, {
      [styles.TabContentFirstTabOpen]: activeTabIndex === 0,
      [styles.TabContentLastTabOpen]: lastTabActive
    });
  }

  render() {
    const { children } = this.props;

    return <div className={this.tabContentClassName()}>{children}</div>;
  }
}
