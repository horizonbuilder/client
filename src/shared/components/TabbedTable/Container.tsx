import * as React from 'react';
import * as PropTypes from 'prop-types';
import * as styles from './styles.css';
import { TabbedTableContext } from './TabbedTableContext';

export interface TabbedTableProps {
  children: any;
}

interface TabbedTableState {
  activeTabIndex: number;
  lastTabActive: boolean;
}

export class Container extends React.Component<TabbedTableProps, TabbedTableState> {
  static childContextTypes = {
    onTabSelect: PropTypes.func.isRequired,
    activeTabIndex: PropTypes.number.isRequired,
    lastTabActive: PropTypes.bool.isRequired
  };

  constructor(props: TabbedTableProps, context: TabbedTableContext) {
    super(props, context);

    this.state = {
      activeTabIndex: 0,
      lastTabActive: false
    };
  }

  getChildContext(): TabbedTableContext {
    return {
      onTabSelect: this.onTabSelect,
      activeTabIndex: this.state.activeTabIndex,
      lastTabActive: this.state.lastTabActive
    };
  }

  onTabSelect = (index: number, isLastTab: boolean): void => {
    this.setState({
      activeTabIndex: index,
      lastTabActive: isLastTab
    });
  };

  render() {
    return <div className={styles.TabbedTable}>{this.props.children}</div>;
  }
}
