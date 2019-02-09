import * as React from 'react';
import * as styles from './styles.css';
import * as classnames from 'classnames';
import ReactSelect, { components } from 'react-select';
import * as uuidv4 from 'uuid/v4';
import * as _ from 'lodash';

type DropdownInputSizes = 'medium' | 'small';

type DropdownInputOption = {
  label: string;
  value: any;
};

export interface DropdownInputProps {
  id?: string;
  name?: string;
  value: any;
  size?: DropdownInputSizes;
  fluid?: boolean;
  onChange?: Function;
  disabled?: boolean;
  options: Array<DropdownInputOption>;
  className?: string;
  label?: string;
  placeholder?: string;
  error?: boolean;
  errorMessage?: string;
  formControl?: boolean;
}

export interface DropdownInputState {
  id: string;
  isFocused: boolean;
}

const Menu = props => {
  let hasOptions = Array.isArray(_.get(props, _.repeat('children.props.', 3) + 'children'));
  return hasOptions ? <components.Menu {...props} /> : null;
};

export class DropdownInput extends React.Component<DropdownInputProps, DropdownInputState> {
  private select;
  private wrapper;

  constructor(props) {
    super(props);

    this.state = {
      id: props.id || uuidv4(),
      isFocused: false
    };
  }

  onChange = v => {
    this.props.onChange({
      target: {
        name: this.props.name,
        value: v
      }
    });
  };

  onInputValueChange = (v, options) => {
    if (options.action == 'input-change') {
      this.onChange(v);
    }
  };

  setFocus = value => {
    this.setState({
      isFocused: value
    });
  };

  onSelectValueChange = objValue => {
    if (typeof this.props.onChange == 'function') {
      let value =
        !objValue || Array.isArray(objValue) ? objValue.map(opt => opt.value) : objValue.value;

      if (typeof value == 'string') {
        this.onChange(value);
      }
    }
  };

  render() {
    let {
      size = 'medium',
      fluid = false,
      disabled = false,
      error = false,
      formControl = false,
      name = '',
      className = '',
      value,
      options,
      label,
      placeholder,
      errorMessage
    } = this.props;

    let { id } = this.state;

    return (
      <div
        className={classnames(
          'dropdown-input-component',
          styles.SelectContainer,
          {
            [styles.medium]: size == 'medium',
            [styles.small]: size == 'small',
            [styles.fluid]: fluid,
            [styles.focused]: this.state.isFocused,
            [styles.hasError]: error,
            [styles.disabled]: disabled,
            [styles.hasLabel]: label,
            [styles.formControl]: formControl
          },
          className
        )}
        id={id}
        ref={e => (this.wrapper = e)}
      >
        <ReactSelect
          inputValue={value || ''}
          onInputChange={this.onInputValueChange}
          onFocus={() => this.setFocus(true)}
          onBlur={() => this.setFocus(false)}
          name={name}
          isDisabled={disabled}
          isSearchable={true}
          isMulti={false}
          isClearable={false}
          value={null}
          options={options}
          placeholder={placeholder}
          onChange={this.onSelectValueChange}
          className="react-select"
          classNamePrefix="react-select"
          ref={ref => {
            this.select = ref;
          }}
          components={{ Menu }}
        />
        {label && (
          <label onClick={() => !disabled && this.select.focus()} className={styles.label}>
            {label}
          </label>
        )}
        {error && errorMessage && <span className={styles.error}>{errorMessage}</span>}
      </div>
    );
  }
}
