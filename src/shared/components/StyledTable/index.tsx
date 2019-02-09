import * as React from 'react';
import classnames from 'classnames';

import { Table } from '../Table';

import * as styles from './styles.css';

interface Props {
  data: Array<object>;
  columns: Array<object>;
  SubComponent?: (object) => void;
  showPagination?: boolean;
  reference?: any;
}

const StyledTable = ({
  data,
  columns,
  SubComponent,
  showPagination,
  reference
}: Props) => (
  <Table
    reference={reference}
    minRows="1"
    hoverRowColor="#f0f0f0"
    headerPadding="0 10px"
    showPagination={!!showPagination}
    defaultPageSize={100}
    data={data}
    columns={columns}
    className={classnames(styles.table, '-striped -highlight')}
    SubComponent={SubComponent}
  />
);

export default StyledTable;