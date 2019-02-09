import * as React from 'react';
import * as styles from './styles.css';

export interface TabBarProps {
  children: any;
}

export const TabBar = ({ children }: TabBarProps) => {
  return (
    <div className={styles.TabBar}>
      {React.Children.map(children, (child, index) =>
        React.cloneElement(child as React.ReactElement<any>, {
          tabIndex: index,
          isLastTab: React.Children.count(children) - 1 === index
        })
      )}
    </div>
  );
};
