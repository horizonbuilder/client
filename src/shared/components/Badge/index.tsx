import * as React from 'react';
import * as styles from './styles.css';
import { Button } from '../Button';

export interface BadgeProps {
  value?: string | number;
  label: string;
  onRemove?: Function;
}

export class Badge extends React.Component<BadgeProps, {}> {
  render() {
    let { value, label, onRemove } = this.props;
    let isRemovable = typeof onRemove == 'function';

    return (
      <div className={styles.Badge}>
        <div className={styles.BadgeContent}>
          {label}
          {isRemovable && (
            <Button
              icon={'fas fa-times'}
              type="light"
              onClick={() => onRemove(value)}
              className={styles.removeBadgeButton}
            />
          )}
        </div>
      </div>
    );
  }
}
