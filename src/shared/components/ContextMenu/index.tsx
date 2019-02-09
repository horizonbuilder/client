import * as React from 'react';
import * as styles from './styles.css';

export interface ContextProps {
  top: number;
  left: number;
  show: boolean;
}

export class ContextMenu extends React.Component<ContextProps, null> {
  render() {
    return (
      <div
        className={styles.contextMenu}
        style={{
          top: this.props.top,
          left: this.props.left,
          display: (() => {
            if (this.props.show) {
              return 'block';
            } else {
              return 'none';
            }
          })()
        }}
      >
        {this.props.children}
      </div>
    );
  }
}
