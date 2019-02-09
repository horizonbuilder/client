import * as React from 'react';
import * as styles from './styles.css';
import * as classnames from 'classnames';

export interface LoadingIndicatorProps {
  size?: string;
  className?: string;
}

const loadingClassName = (size: string, className: string) =>
  classnames(styles.LoadingIndicator, className, {
    [styles.LoadingIndicatorLarge]: size === 'large',
    [styles.LoadingIndicatorMedium]: size === 'medium',
    [styles.LoadingIndicatorSmall]: size === 'small'
  });

export const LoadingIndicator = ({
  size = 'medium',
  className,
  ...restProps
}: LoadingIndicatorProps) => <div className={loadingClassName(size, className)} />;
