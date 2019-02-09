import * as React from 'react';
import { Link, matchPath } from 'react-router-dom';
import * as classnames from 'classnames';

import * as styles from './styles.css';

import { MenuItem } from '../../../types/Sidebar';

interface Props {
  title: string;
  pathname: string;
  menuItems: Array<MenuItem>;
}

class SidebarMenuNested extends React.Component<Props> {

  matchPath = (path: string): boolean => {
    const { pathname } = this.props;
    const match = matchPath(pathname, { path: `${path}*` });
    
    return !!match && match.isExact;
  }

  itemClassName = (path: string): string => {
    const isSelected = this.matchPath(path);

    return classnames(styles.SidebarSectionItem, {
      [styles.SidebarSectionItemSelected]: isSelected
    });
  }

  sectionClassName = () => {
    const isSelected = this.props.menuItems.map(item => item.href).some(this.matchPath);

    return classnames(styles.SidebarSection, {
      [styles.SidebarSectionSelected]: isSelected
    });
  }

  renderItems = () => (
    <React.Fragment>
      {this.props.menuItems.map(item => (
        <Link
          className={this.itemClassName(item.href)}
          to={item.href}
          key={item.href}
        >
          {item.title}
        </Link>
      ))}
    </React.Fragment>
  );

  render() {
    return (
      <div className={this.sectionClassName()}>
        <div className={styles.SidebarSectionHeader}>{this.props.title}</div>
        
        {this.renderItems()}
      </div>
    );
  }

};

export default SidebarMenuNested;