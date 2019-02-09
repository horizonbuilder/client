import * as React from 'react';
import * as styles from './styles.css';
import { pick } from 'lodash';
import { Icon } from '../../../shared/components/Icon';
import { Link } from 'react-router-dom';
import * as classnames from 'classnames';

const Sidebar = ({ title, children }) => (
  <div className={styles.sidebar}>
    <div className={styles.sidebarHeader}>
      <Link to="/settings" className={styles.backButton}>
        <Icon icon="fas fa-chevron-left" />
      </Link>
      <div className={styles.sidebarTitle}>
        <span>{title}</span>
      </div>
    </div>
    <div className={styles.sidebarContent}>{children}</div>
  </div>
);

const Content = ({ children, noPadding = false }) => (
  <div className={classnames(styles.content, { [styles.noPadding]: noPadding })}>{children}</div>
);

interface SettingsLayoutProps {}

export class SettingsLayout extends React.Component<SettingsLayoutProps, null> {
  public static Sidebar = Sidebar;
  public static Content = Content;
  render() {
    return <div className={styles.settingsLayout}>{this.props.children}</div>;
  }
}
