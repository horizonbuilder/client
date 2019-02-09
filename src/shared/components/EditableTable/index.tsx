import * as React from 'react';
import * as styles from './styles.css';
import * as classnames from 'classnames';
import { Input } from '../Input';
import { MoreModal } from '../MoreModal';

type EditableTableColumn = {
  label: string;
  key: string;
};

interface EditableTableProps {
  onChange?: Function;
  data: Array<any>;
  columns: Array<EditableTableColumn>;
  mode?: 'view' | 'edit';
  className?: string;
  type?: 'vertical' | 'horizontal';
  maxContentLength?: number;
}

export class EditableTable extends React.Component<EditableTableProps, any> {
  constructor(props) {
    super(props);
  }

  getTableCellContent = value => {
    if (this.props.mode == 'view') {
      let { maxContentLength } = this.props;

      if (maxContentLength) {
        return <MoreModal content={value} maxContentLength={maxContentLength} />;
      }

      return <div>{value}</div>;
    } else {
      return <Input size="small" value={value} fluid onChange={() => {}} />;
    }
  };

  getVerticalTable = () => {
    let { columns, data } = this.props;
    let tableRows = columns.map(column => [column.label]);

    data.forEach((item, iIndex) => {
      columns.forEach((column, cIndex) => tableRows[cIndex].push(item[column.key] || ''));
    });

    return (
      <table>
        <tbody>
          {tableRows.map((tRow, trIndex) => {
            return (
              <tr key={trIndex}>
                {tRow.map((tCell, tcIndex) => {
                  if (!tcIndex) {
                    return <th key={trIndex + tcIndex}>{tCell}</th>;
                  } else {
                    return <td key={trIndex + tcIndex}>{this.getTableCellContent(tCell || '')}</td>;
                  }
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  };

  getHorizontalTable = () => {
    let { columns, data } = this.props;

    return (
      <table>
        <thead>
          <tr>
            {columns.map((column, cIndex) => (
              <td key={cIndex}>{column.label}</td>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item, iIndex) => {
            return (
              <tr key={iIndex}>
                {Object.keys(item).map(iKey => (
                  <td key={iKey}>{this.getTableCellContent(item[iKey] || '')}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  };

  render() {
    let { type, className = '' } = this.props;
    let isVerticalTable = type == 'vertical';
    return (
      <div
        className={classnames(styles.EditableTableWrapper, className, {
          [styles.verticalTable]: isVerticalTable
        })}
      >
        {isVerticalTable ? this.getVerticalTable() : this.getHorizontalTable()}
      </div>
    );
  }
}
