import * as React from 'react';

import * as styles from './styles.css';

interface Props {
  message: string;
}

const ErrorContainer = ({ message }: Props) => (
  <div className={styles.BlankPage}>{message}</div>
);

export default ErrorContainer;