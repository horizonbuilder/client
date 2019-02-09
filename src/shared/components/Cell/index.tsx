import * as React from 'react';

import * as styles from './styles.css';

interface Props {
  data: any;
}

const Cell = ({
  data,
}: Props) => (
  <span className={styles.Cell}>{data.value}</span>
);

export default Cell;