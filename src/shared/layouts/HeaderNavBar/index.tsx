import * as React from 'react';
import { Link } from 'react-router-dom';

import { NavigationBar } from '../NavigationBar';
import * as styles from './styles.css';

export const enhanceWithHeader = WrappedComponent => {
  return class WithHeader extends React.Component {
    renderLeftContent = () => {
      return (
        <span>
          <Link to="/" className={styles.NavLink}>
            <img src="/assets/images/logo.png" alt="Logo" className={styles.Logo} />
          </Link>
        </span>
      );
    };
    render() {
      return (
        <NavigationBar.Container>
          <NavigationBar contentLeft={this.renderLeftContent()} />
          <WrappedComponent {...this.props} />
        </NavigationBar.Container>
      );
    }
  };
};
