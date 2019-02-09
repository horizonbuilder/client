import * as React from 'react';
import * as styles from './styles.css';
import * as classnames from 'classnames';

type IndicatorType = 'default' | 'primary' | 'secondary' | 'important';

export interface TabIndicatorProps {
  count: number;
  isActive: boolean;
  title: string;
  type?: IndicatorType;
}

const tabCountClass = (type: IndicatorType, isActive: boolean): string =>
  classnames({
    [styles.TabIndicatorCountActive]: isActive,
    [styles.TabIndicatorCountDefault]: type === 'default',
    [styles.TabIndicatorCountPrimary]: type === 'primary',
    [styles.TabIndicatorCountSecondary]: type === 'secondary',
    [styles.TabIndicatorCountImportant]: type === 'important'
  });

export const TabIndicator = ({ isActive, count, title, type = 'default' }: TabIndicatorProps) => (
  <div className={styles.TabIndicator}>
    <div className={tabCountClass(type, isActive)}>{count}</div>
    <div className={isActive ? styles.TabIndicatorTitleActive : styles.TabIndicatorTitle}>
      {title}
    </div>
  </div>
);
