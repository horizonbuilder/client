import * as React from 'react';
import { Label } from '../Label';
import { Input } from '../Input';
import { Button } from '../Button';
import { Modal } from '../Modal';
import { Checkbox } from '../Checkbox';
import { Badge } from '../Badge';
import * as styles from './styles.css';
import * as classnames from 'classnames';
import { SelectionItem } from '../../../types';

interface State {
  selectedItems: Set<SelectionItem>;
  more: number;
  isOverflow: boolean;
  showOverflow: boolean;
  filter: string;
}

interface Props {
  show: boolean;
  items: Array<SelectionItem>;
  onOk: (items: string) => void;
  onCancel?: () => void;
  header?: string;
  searchable?: boolean;
  badges?: boolean;
}

export class ModalSelect extends React.Component<Props, State> {
  overflowList: React.RefObject<HTMLDivElement>;

  constructor(props) {
    super(props);
    this.overflowList = React.createRef();
  }

  state = {
    selectedItems: new Set(),
    more: 0,
    isOverflow: false,
    showOverflow: false,
    filter: ''
  };

  onChange = (item: SelectionItem) => (e: any) => {
    const { selectedItems } = this.state;

    let isOverflow = () => {
      return (
        this.props.badges &&
        this.overflowList.current.offsetHeight < this.overflowList.current.scrollHeight
      );
    };

    if (e.target.checked) {
      item.selected = true;
      selectedItems.add(item.value);

      this.setState({ selectedItems }, () => {
        if (isOverflow()) {
          this.setState({ more: this.state.more + 1, isOverflow: true });
        }
      });
    } else {
      item.selected = false;
      selectedItems.delete(item.value);

      this.setState({ selectedItems }, () => {
        if (isOverflow()) {
          this.setState({ more: this.state.more - 1, isOverflow: true });
        } else {
          this.setState({ more: 0, isOverflow: false });
        }
      });
    }
  };

  onOk() {
    const { selectedItems } = this.state;

    this.props.items.map(item => {
      if (selectedItems.has(item.value) && !item.selected) {
        selectedItems.delete(item.value);
      }
    });

    this.setState({ selectedItems, showOverflow: false, filter: '' });

    this.props.onOk(Array.from(this.state.selectedItems).join(','));
  }

  onCancel = () => {
    this.setState({ showOverflow: false, filter: '' });

    this.props.onCancel();
  };

  onShowOverflow = () => {
    this.setState({ showOverflow: true });
  };

  onFilterChanged = e => {
    this.setState({ filter: e.target.value });
  };

  render() {
    const { selectedItems, filter } = this.state;
    const { header, searchable = true, badges = false } = this.props;

    let filteredItems = this.props.items;
    if (filter) {
      filteredItems = filteredItems.filter(i =>
        i.label.toLowerCase().includes(filter.toLowerCase())
      );
    }

    const footer = (
      <div className={styles.ModalSelectFooter}>
        {badges && (
          <React.Fragment>
            <div
              className={classnames(styles.ModalSelectFooterItems)}
              style={{ height: this.state.showOverflow ? 'auto' : '40px' }}
              ref={this.overflowList}
            >
              {this.props.items.filter(item => item.selected).map((item, iIndex) => (
                <Badge key={iIndex} label={item.label} />
              ))}
            </div>
            <div className={styles.ModalSelectFooterMore}>
              {this.state.isOverflow &&
                !this.state.showOverflow && (
                  <Button
                    type="light"
                    onClick={this.onShowOverflow}
                    className={styles.FilterHeaderClear}
                  >
                    {`${this.state.more} more`}
                  </Button>
                )}
            </div>
          </React.Fragment>
        )}
      </div>
    );

    return (
      <Modal
        show={this.props.show}
        onOk={this.onOk.bind(this)}
        showCancel={true}
        cancelText="Cancel"
        okText="Done"
        footer={footer}
        onCancel={this.onCancel.bind(this)}
        className={styles.ModalSelect}
      >
        {header && (
          <div className={styles.ModalSelectHeader}>
            <div className={styles.ModalSelectHeaderTitle}>{header}</div>
            <div className={styles.ModalSelectHeaderActions}>
              {searchable && (
                <Input
                  fluid
                  type="text"
                  size="small"
                  id="comp-sales-cost-per-acre-filter-min"
                  value={filter}
                  placeholder="Search"
                  iconRight="fas fa-search"
                  onChange={this.onFilterChanged}
                  className={styles.ModalSelectHeaderActionsSearch}
                />
              )}
              <Button type="light" onClick={this.onCancel} className={styles.FilterHeaderClear}>
                <i className="fas fa-times" />
              </Button>
            </div>
          </div>
        )}
        <div className={styles.ModalSelectBody}>
          {filteredItems.map((item: SelectionItem, index) => {
            return (
              <div
                key={index}
                className={classnames(styles.ModalSelectItem, {
                  [styles.ModalSelectItemGroup]: Boolean(item.subLabel)
                })}
              >
                <Checkbox
                  onChange={this.onChange(item)}
                  checked={selectedItems.has[item.value] || item.selected}
                  name={item.value}
                >
                  <Label>{item.label}</Label>
                </Checkbox>
                <div className={styles.ModalSelectItemSubLabel}>{item.subLabel}</div>
              </div>
            );
          })}
        </div>
      </Modal>
    );
  }
}
