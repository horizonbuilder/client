import * as React from 'react';
import * as PropTypes from 'prop-types';
import * as styles from './styles.css';
import { TabbedTableContext } from './TabbedTableContext';

type ChildFunction = (isActive: boolean) => void;

export interface TabProps {
  children: any;
  onClick?: Function;
  tabIndex?: number;
  isLastTab?: boolean;
}

const tabClass = (isActive: boolean): string => (isActive ? styles.TabActive : styles.Tab);

export class Tab extends React.Component<TabProps, undefined> {
  context: TabbedTableContext;

  static contextTypes = {
    onTabSelect: PropTypes.func.isRequired,
    activeTabIndex: PropTypes.number
  };

  componentWillMount() {
    this.isActive() && this.props.onClick && this.props.onClick();
  }

  isActive(): boolean {
    return this.context.activeTabIndex === this.props.tabIndex;
  }

  render() {
    const { children, onClick, tabIndex, isLastTab } = this.props;
    const { onTabSelect } = this.context;

    return (
      <div
        className={tabClass(this.isActive())}
        onClick={() => {
          onTabSelect(tabIndex, isLastTab);
          onClick && onClick();
        }}
      >
        {typeof children === 'function' ? children(this.isActive()) : children}
      </div>
    );
  }
}
