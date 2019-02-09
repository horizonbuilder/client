import * as React from 'react';
import * as classnames from 'classnames';
import * as styles from './styles.css';

export interface FieldGroupProps {
  id?: string;
  name?: string;
  custom?: any;
  className?: string;
  children?: any;
}

export const FieldGroup = (props: FieldGroupProps) => {
  const { name, className = '', children = '', id = '', custom } = props;
  return (
    <div className={classnames(styles.Group, className)} id={id}>
      <div className={styles.GroupName}>{custom ? custom : name}</div>
      <div className={styles.GroupContent}>{children}</div>
    </div>
  );
};
