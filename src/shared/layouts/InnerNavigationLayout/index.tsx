import * as React from 'react';
import * as styles from './styles.css';
import * as classnames from 'classnames';

export interface INLayoutProps {
  header: string;
  children?: any;
  className?: string;
}

const Navigation = ({ children }) => (
  <div className={styles.INLayoutBodyNavigation}>{children}</div>
);

const Body = ({ children }) => <div className={styles.INLayoutBodyMain}>{children}</div>;

export class INLayout extends React.Component<INLayoutProps, any> {
  public static Navigation = Navigation;
  public static Body = Body;

  render() {
    let { header, children, className = '' } = this.props;

    return (
      <div className={classnames(styles.INLayout, className)}>
        <div className={styles.INLayoutHeader}>
          <div className={styles.INLayoutHeaderTitleWrapper}>
            <div className={styles.INLayoutHeaderTitle}>{header}</div>
          </div>
        </div>
        <div className={styles.INLayoutBody}>{children}</div>
      </div>
    );
  }
}
