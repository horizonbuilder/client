import * as React from 'react';
import * as styles from './styles.css';
import * as classnames from 'classnames';

export const Label = ({
  children,
  className,
  ...props
}: React.LabelHTMLAttributes<HTMLLabelElement>) => {
  return (
    <label {...props} className={classnames(styles.Label, className)}>
      {children}
    </label>
  );
};
