import * as React from 'react';
import * as styles from './styles.css';
import * as classnames from 'classnames';
import * as uuidv4 from 'uuid/v4';
import { Icon } from '../Icon';

type CheckboxSizes = 'medium' | 'small';

interface CheckboxProps {
  onChange?: React.EventHandler<React.ChangeEvent<HTMLInputElement>>;
  children?: any;
  id?: string;
  checked?: boolean;
  disabled?: boolean;
  name?: string;
  formControl?: boolean;
  size?: CheckboxSizes;
  readOnly?: boolean;
}

export class Checkbox extends React.Component<CheckboxProps, any> {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.id || uuidv4()
    };
  }

  render() {
    let {
      size = 'medium',
      formControl,
      disabled,
      checked,
      onChange,
      children,
      name,
      readOnly
    } = this.props,
      id = this.state.id;

    return (
      <label
        htmlFor={id}
        className={classnames('checkbox-component', styles.Checkbox, {
          [styles.formControl]: formControl,
          [styles.medium]: size == 'medium',
          [styles.small]: size == 'small'
        })}
      >
        <input
          readOnly={readOnly}
          type="checkbox"
          id={id}
          checked={checked}
          onChange={onChange}
          disabled={disabled}
          name={name}
        />
        <div
          className={classnames(styles.CheckboxContent, {
            [styles.Disabled]: disabled,
            [styles.Checked]: checked
          })}
        >
          <div className={styles.CheckboxBox}>
            {checked && (
              <div className={styles.CheckboxFill}>
                <Icon icon="fas fa-check" />
              </div>
            )}
          </div>

          {children && <div className={styles.CheckboxLabel}>{children}</div>}
        </div>
      </label>
    );
  }
}

interface CustomCheckboxProps {
  onChange?: React.EventHandler<React.ChangeEvent<HTMLInputElement>>;
  children?: any;
  id?: string;
  checked?: boolean;
  disabled?: boolean;
  name?: string;
  formControl?: boolean;
  size?: CheckboxSizes;
  readOnly?: boolean;
  checkIcon?: string;
  uncheckIcon?: string;
}

export class CustomCheckbox extends React.Component<CustomCheckboxProps, any> {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.id || uuidv4()
    };
  }

  render() {
    let {
      size = 'medium',
      formControl,
      disabled,
      checked,
      onChange,
      children,
      name,
      readOnly,
      checkIcon,
      uncheckIcon
    } = this.props,
      id = this.state.id;

    return (
      <label
        htmlFor={id}
        className={classnames('checkbox-component', styles.Checkbox, {
          [styles.formControl]: formControl,
          [styles.medium]: size == 'medium',
          [styles.small]: size == 'small'
        })}
      >
        <input
          readOnly={readOnly}
          type="checkbox"
          id={id}
          checked={checked}
          onChange={onChange}
          disabled={disabled}
          name={name}
        />
        <div
          className={classnames(styles.CheckboxContent, {
            [styles.Disabled]: disabled,
            [styles.Checked]: checked
          })}
        >
          <div className={styles.CustomCheckBox}>
            {checked ? <Icon icon={checkIcon} /> : <Icon icon={uncheckIcon} />}
          </div>

          {children && <div className={styles.CheckboxLabel}>{children}</div>}
        </div>
      </label>
    );
  }
}
