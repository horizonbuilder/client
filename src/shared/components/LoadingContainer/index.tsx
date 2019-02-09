import * as React from 'react';

import { LoadingIndicator } from '../LoadingIndicator';

import * as styles from './styles.css';

interface Props {
  text?: string;
}

const LoadingContainer = ({ text }: Props) => (
  <div className={styles.BlankPage}>
    <LoadingIndicator />
    <span className={styles.LoaderText}>{text}</span>
  </div>
);

export default LoadingContainer;