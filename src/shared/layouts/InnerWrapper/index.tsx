import * as React from 'react';
import * as styles from './styles.css';

export class InnerWrapper extends React.Component {
  render() {
    return <div className={styles.InnerWrapper}>{this.props.children}</div>;
  }
}
