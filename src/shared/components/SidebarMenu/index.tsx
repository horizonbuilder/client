import * as React from 'react';
import { RouteComponentProps, Link, Switch, Route, matchPath } from 'react-router-dom';
import * as styles from './styles.css';
import { LeftChevron } from '../../../shared/components/Icons/LeftChevron';
import * as classnames from 'classnames';
import { connect } from 'react-redux';

import { MenuItem } from '../../../types/Sidebar';

interface SidebarMenuProps {
  menuitems: MenuItem[];
  pathname: string;
  isExpanded?:boolean;
}

interface MappedStateProps {
  isExpanded?: boolean;
}

const mapStateToProps = (state: any, ownProps: SidebarMenuProps): MappedStateProps => {
  return {
      isExpanded: state.navigation.isExpanded
  };
};

export class SidebarMenu extends React.Component<SidebarMenuProps, null> {
  isRoutedToSection = (path: string): boolean => {
    const { pathname } = this.props;
    const match = matchPath(pathname, {
      path: `${path}*`,
      strict: true,
      exact: true
    });

    return !!match && match.isExact;
  };
  render() {
    return (
      <div>
        {this.props.menuitems.map((e, i) => {
          return (
            <div
              key={i}
              className={classnames(this.isRoutedToSection(e.href) ? styles.SidebarSectionSelected: styles.SidebarSection, this.props.isExpanded ? styles.expanded : styles.collapsed)}
            >

              <Link className={styles.SidebarSectionHeader} to={e.href}>
                {!this.props.isExpanded ? (<i className={classnames(e.icon, styles.SidebarSectionIcon)}></i>) : null}
                {e.title}
              </Link>
            </div>
          );
        })}
      </div>
    );
  }
}

export const ConnectedSidebarMenu = connect(
  mapStateToProps,
  null
)(SidebarMenu);

export class ModalSidebarMenu extends React.Component<SidebarMenuProps, null> {
  isSelected = (comp, selected) => {
    if (comp && selected) {
      return comp === selected;
    }

    return false;
  };

  render() {
    return (
      <div>
        {this.props.menuitems.map((e, i) => {
          return (
            <div
              key={i}
              className={classnames(this.isSelected(e.name, e.selected) ? styles.SidebarSectionSelected: styles.SidebarSection, this.props.isExpanded ? styles.expanded : styles.collapsed)}
            >

              <a className={styles.SidebarSectionHeader} onClick={() => e.onClick(e.component, e.name)}>
                {!this.props.isExpanded ? (<i className={classnames(e.icon, styles.SidebarSectionIcon)}></i>) : null}
                {e.title}
              </a>
            </div>
          );
        })}
      </div>
    );
  }
}