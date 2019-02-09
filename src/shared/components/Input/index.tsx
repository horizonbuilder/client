import * as React from 'react';
import * as styles from './styles.css';
import * as classnames from 'classnames';
import { Icon } from '../Icon';
import * as uuidv4 from 'uuid/v4';

type InputSizes = 'medium' | 'small';

export interface InputProps {
  id?: string;
  name?: string;
  value?: string | number;
  type?: string;
  min?: string;
  max?: string;
  size?: InputSizes;
  fluid?: boolean;
  disabled?: boolean;
  className?: string;
  label?: string;
  fixedLabel?: boolean;
  placeholder?: string;
  error?: boolean;
  errorMessage?: string;
  iconRight?: string;
  multiline?: boolean;
  readOnly?: boolean;
  onChange?: Function;
  onClick?: React.EventHandler<React.MouseEvent<HTMLDivElement>>;
  onFocus?: Function;
  onBlur?: Function;
  onKeyDown?: React.EventHandler<React.KeyboardEvent<HTMLInputElement>>;
}

export interface InputState {
  id: string;
  isFocused: boolean;
}

export class Input extends React.Component<InputProps, InputState> {
  private input;

  constructor(props) {
    super(props);

    this.state = {
      id: props.id || uuidv4(),
      isFocused: false
    };

    this.setFocus = this.setFocus.bind(this);
  }

  setFocus(value) {
    if (value && this.props.onFocus) {
      this.props.onFocus();
    }
    if (!value && this.props.onBlur) {
      this.props.onBlur();
    }

    this.setState({
      isFocused: value
    });
  }

  render() {
    let {
        size = 'medium',
        fluid = false,
        disabled = false,
        error = false,
        fixedLabel = false,
        multiline = false,
        readOnly = false,
        name = '',
        className = '',
        value,
        type,
        min,
        max,
        iconRight,
        label,
        placeholder,
        errorMessage,
        onChange,
        onKeyDown,
        onClick,
        ...restProps
      } = this.props,
      { id, isFocused } = this.state;

    isFocused = isFocused || className.indexOf('react-datepicker-ignore-onclickoutside') != -1; //needed for Datepicker component

    let isLabelFixed = placeholder || fixedLabel || value.toString() || isFocused;
    let InputElement = multiline ? 'textarea' : 'input';

    return (
      <div
        className={classnames(
          'input-component',
          styles.InputContainer,
          {
            [styles.medium]: size == 'medium',
            [styles.small]: size == 'small',
            [styles.fluid]: fluid,
            [styles.focused]: isFocused,
            [styles.hasError]: error,
            [styles.hasFixedLabel]: isLabelFixed,
            [styles.hasFloatingLabel]: !isLabelFixed,
            [styles.iconRight]: !!iconRight,
            [styles.disabled]: disabled
          },
          className
        )}
        onClick={onClick}
      >
        <InputElement
          name={name}
          disabled={disabled}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          onKeyDown={onKeyDown}
          type={type}
          min={min}
          max={max}
          id={id}
          className={styles.inputElement}
          onBlur={() => this.setFocus(false)}
          onFocus={() => this.setFocus(true)}
          readOnly={readOnly || !onChange}
          ref={e => {
            this.input = e;
          }}
          {...restProps}
        />
        {label && (
          <label htmlFor={id} className={styles.label}>
            {label}
          </label>
        )}
        {error && errorMessage && <span className={styles.error}>{errorMessage}</span>}
        {iconRight && (
          <Icon
            onClick={() => {
              this.input.focus();
            }}
            icon={iconRight}
          />
        )}
      </div>
    );
  }
}
