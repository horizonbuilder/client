import * as React from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import * as classnames from 'classnames';
import { Job } from '../../../types';
import { JobMenu } from '../JobMenu';
import { Table } from '../../../shared/components/Table';
import * as styles from './styles.css';

export interface JobTableProps {
  jobs: Job[];
}

const linkRowData = (id, value, classes = '') => {
  return (
    <Link className={classnames(styles.linkCell, classes)} to={`/jobs/${id}/info`}>
      {value}
    </Link>
  );
};

export class JobTable extends React.Component<JobTableProps, null> {
  render() {
    let { jobs } = this.props;

    const columns = [
      {
        id: 'jobName',
        Header: 'Job',
        accessor: 'name',
        Cell: data => linkRowData(data.original.id, data.value, styles.linkCellDark)
      },
      {
        Header: 'Client',
        accessor: 'client_name',
        Cell: data => linkRowData(data.original.id, data.value)
      },
      {
        Header: 'Date',
        accessor: 'created_at',
        Cell: data => linkRowData(data.original.id, format(data.value, 'M / D / YY'))
      },
      {
        accessor: 'id',
        width: 50,
        className: styles.menuCell,
        Cell: data => <JobMenu jobId={data.value} />
      }
    ];

    const data = [];
    if (jobs.length > 0) {
      jobs.forEach(function(job) {
        const dataItem = {
          id: job.id,
          name: job.name,
          client_name: job.client_name,
          created_at: job.created_at
        };
        data.push(dataItem);
      });
    }

    return (
      <Table
        className={classnames(styles.tableJobs, '-striped -highlight')}
        data={data}
        columns={columns}
        showPagination={false}
        minRows="1"
        hoverRowColor="#f0f0f0"
      />
    );
  }
}
