import * as React from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import * as styles from './styles.css';
import * as classnames from 'classnames';
import styled from 'styled-components';

const TableUnstyled = props => {
  return <ReactTable {...props} className={classnames(styles.Table, props.className)} ref={props.reference} />;
};

export const Table = styled(TableUnstyled)`
  .rt-tr-group:hover {
    background-color: ${props => props.hoverRowColor};
  }
  .rt-th .rt-resizable-header-content {
    padding: ${props => props.headerPadding};
  }
`;
