import * as React from 'react';
import * as styles from './styles.css';
import { Link, withRouter } from 'react-router-dom';
import { Icon } from '../../components/Icon/index';
import * as classnames from 'classnames';
import { connect } from 'react-redux';
import { get } from 'lodash';

class NavigationMenu extends React.Component<any, any> {
  render() {
    let { options = [] } = this.props;
    return (
      <div className={styles.menu}>
        {options.map((opt, i) => (
          <Link key={i} to={opt.link}>
            {opt.title}
          </Link>
        ))}
      </div>
    );
  }
}

class NavigationDropdown extends React.Component<any, any> {
  public container;

  constructor(props) {
    super(props);

    this.state = {
      isDropdownOpened: false
    };

    this.toggleDropdown = this.toggleDropdown.bind(this);
    this.onContainerClick = this.onContainerClick.bind(this);
    this.hideDropdown = this.hideDropdown.bind(this);
  }

  hideDropdown() {
    this.setState({
      isDropdownOpened: false
    });
  }

  toggleDropdown() {
    this.setState({
      isDropdownOpened: !this.state.isDropdownOpened
    });
  }

  onContainerClick(e) {
    e.stopPropagation();
    this.toggleDropdown();
  }

  componentDidMount() {
    document.addEventListener('click', this.hideDropdown);
    this.container.addEventListener('click', this.onContainerClick);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.hideDropdown);
    this.container.removeEventListener('click', this.onContainerClick);
  }

  getCurrentRoute = () => {
    const path = this.props.location.pathname;

    if (path.match(/workfiles/g)) {
      return 'Workfiles';
    }

    if (path.match(/sales/g)) {
      return 'Sales';
    }

    if (path.match(/market-trends/g)) {
      return 'Market Trends';
    }

    if (path.match(/projects/g) && !path.match(/analytics/g)) {
      return 'Projects';
    }

    if (path.match(/settings/g)) {
      return 'Settings';
    }

    if (path.match(/analytics/g)) {
      return 'Projects Analytics';
    }

    if (path.match(/analysis-templates/g)) {
      return 'Analysis Templates';
    }

    return '';
  };

  render() {
    return (
      <div
        onClick={this.toggleDropdown}
        className={classnames(styles.menuDropdown, this.state.isDropdownOpened ? 'active' : '')}
        ref={e => (this.container = e)}
      >
        <span>{this.getCurrentRoute()}</span>
        <Icon icon={'fas fa-angle-down'} />
        <div
          className={classnames(styles.dropdownMenu, this.state.isDropdownOpened ? 'active' : '')}
          onClick={e => e.stopPropagation()}
        >
          <Link to="/workfiles">Workfiles</Link>
          <Link to="/sales">Sales</Link>
          <Link to="/market-trends">Market Trends</Link>
          <Link to="/projects">Projects</Link>
          <Link to="/settings">Settings</Link>
          <Link to="/projects-analytics">Project Analytics</Link>
          <Link to="/analysis-templates">Analysis Templates</Link>
        </div>
      </div>
    );
  }
}

const RoutedNavigationDropdown = withRouter(NavigationDropdown);

class UserDropdown extends React.Component<any, any> {
  public container;

  constructor(props) {
    super(props);

    this.state = {
      isDropdownOpened: false
    };

    this.toggleDropdown = this.toggleDropdown.bind(this);
    this.onContainerClick = this.onContainerClick.bind(this);
    this.hideDropdown = this.hideDropdown.bind(this);
  }

  hideDropdown() {
    this.setState({
      isDropdownOpened: false
    });
  }

  toggleDropdown() {
    this.setState({
      isDropdownOpened: !this.state.isDropdownOpened
    });
  }

  onContainerClick(e) {
    e.stopPropagation();
    this.toggleDropdown();
  }

  componentDidMount() {
    document.addEventListener('click', this.hideDropdown);
    this.container.addEventListener('click', this.onContainerClick);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.hideDropdown);
    this.container.removeEventListener('click', this.onContainerClick);
  }

  render() {
    return (
      <div
        onClick={this.toggleDropdown}
        className={classnames(styles.userDropdown, this.state.isDropdownOpened ? 'active' : '')}
        ref={e => (this.container = e)}
      >
        <span>{this.props.username}</span>
        <Icon icon={'fas fa-angle-down'} />
        <div
          className={classnames(styles.dropdownMenu, this.state.isDropdownOpened ? 'active' : '')}
          onClick={e => e.stopPropagation()}
        >
          <Link to="/accounts-dashboard">
            {/* <Icon className={styles.menuIcons} icon={'fas fa-briefcase'} /> */}
            Profile
          </Link>
          <Link to="/logout">
            {/* <Icon className={styles.menuIcons} icon={'fas fa-sign-in-alt'} /> */}
            Log Out
          </Link>
        </div>
      </div>
    );
  }
}

const ConnectedUserDropdown = connect(state => ({
  username: get(state, 'auth.user.username', '')
}))(UserDropdown);

const ContainerWithNavigation = ({ children, className = '' }) => (
  <div className={classnames('pageHasNavigation', styles.ContainerWithNavigation, className)}>
    {children}
  </div>
);

export class NavigationBar extends React.Component<any, any> {
  public static Menu = NavigationMenu;
  public static Container = ContainerWithNavigation;

  render() {
    let { contentLeft, contentRight } = this.props;
    return (
      <div className={styles.NavigationBar} id="navigation">
        <div className={styles.content}>{contentLeft && <div>{contentLeft}</div>}</div>
        {/*<RoutedNavigationDropdown />*/}
        <ConnectedUserDropdown />
      </div>
    );
  }
}
