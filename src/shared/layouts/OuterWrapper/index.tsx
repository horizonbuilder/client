import * as React from 'react';
import * as styles from './styles.css';

export class OuterWrapper extends React.Component {
  render() {
    return <div className={styles.OuterWrapper}>{this.props.children}</div>;
  }
}
