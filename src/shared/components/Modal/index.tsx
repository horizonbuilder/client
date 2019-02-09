import * as React from 'react';
import * as PropTypes from 'prop-types';
import * as styles from './styles.css';
import { Button } from '../Button';
import * as classnames from 'classnames';

type ModalSizes = 'small' | 'medium' | 'large';

interface ModalProps {
  show: boolean;
  children: any;
  header?: any;
  footer?: any;
  showCancel?: boolean;
  showOk?: boolean;
  onCancel?: Function;
  onOk?: Function;
  okText?: string;
  cancelText?: string;
  className?: string;
  size?: ModalSizes;
}

export class Modal extends React.Component<ModalProps, {}> {
  public static defaultProps: Partial<ModalProps> = {
    showCancel: false,
    showOk: true,
    okText: 'Ok',
    cancelText: 'Cancel',
    size: 'medium'
  };

  onOkClick(e: any) {
    if (this.props.onOk) this.props.onOk();
  }

  onCancelClick(e: any) {
    if (this.props.onCancel) this.props.onCancel();
  }

  okButton = this.props.showOk ? (
    <Button type="primary" size="tiny" onClick={this.onOkClick.bind(this)} className={styles.OkBtn}>
      {this.props.okText}
    </Button>
  ) : null;

  cancelButton = this.props.showCancel ? (
    <Button type="secondary" size="tiny" onClick={this.onCancelClick.bind(this)} className={styles.CancelBtn}>
      {this.props.cancelText}
    </Button>
  ) : null;

  render() {
    if (!this.props.show) {
      return null;
    }
    return (
      <div className={styles.Modal}>
        <div className={classnames(styles.ModalInner, {[styles.ModalMedium]: this.props.size === 'medium', [styles.ModalLarge]: this.props.size === 'large', [styles.ModalSmall]: this.props.size === 'small'}, this.props.className)}>
          {this.props.children}
          <div className={styles.ModalFooter}>
            {this.props.footer && (
              this.props.footer
            )}
            <div className={styles.ModalButtons}>
              {this.cancelButton}
              {this.okButton}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
