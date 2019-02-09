import * as React from 'react';
import * as styles from './styles.css';
import * as classnames from 'classnames';

export interface ProgressIndicatorProps {
  totalProgress: number;
  currentProgress: number;
}

export class ProgressIndicator extends React.Component<ProgressIndicatorProps, null> {
  render() {
    let { totalProgress, currentProgress } = this.props;
    let progressPct = currentProgress / totalProgress * 100;
    return (
      <div className={styles.ProgressIndicator}>
        <div className={styles.ProgressIndicatorInner} style={{ width: progressPct + '%' }} />
      </div>
    );
  }
}
