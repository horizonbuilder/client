import * as React from 'react';
import * as styles from './styles.css';
import * as classnames from 'classnames';
import RDatepicker from 'react-datepicker';
import * as moment from 'moment';
import { Input } from '../Input';
import * as uuidv4 from 'uuid/v4';
import 'react-datepicker/dist/react-datepicker.css';

type DatePickerSizes = 'medium' | 'small';

export interface DatePickerProps {
  id?: string;
  value: string;
  onChange?: Function;
  format?: string;
  disabled?: boolean;
  className?: string;

  //Input Props:
  size?: DatePickerSizes;
  fluid?: boolean;
  name?: string;
  label?: string;
  fixedLabel?: boolean;
  placeholder?: string;
  error?: boolean;
  errorMessage?: string;
  iconRight?: string;
  readOnly?: boolean;
}

export class DatePicker extends React.Component<DatePickerProps, any> {
  constructor(props) {
    super(props);

    this.state = {
      id: props.id || uuidv4()
    };

    this.getCustomInput = this.getCustomInput.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onChange(momentValue) {
    if (typeof this.props.onChange == 'function') {
      this.props.onChange({
        target: {
          name: this.props.name,
          value: momentValue ? momentValue.format('YYYY-MM-DD') : ''
        }
      });
    }
  }

  getCustomInput() {
    let {
      size = 'medium',
      fluid = false,
      error = false,
      fixedLabel = false,
      readOnly = false,
      name = ''
    } = this.props;

    return (
      <Input
        {...this.props as any}
        {...{
          size,
          fluid,
          error,
          fixedLabel,
          readOnly,
          name
        }}
      />
    );
  }

  render() {
    let {
      disabled = false,
      className = '',
      fluid = false,
      placeholder = '',
      value,
      format = 'DD/MM/YYYY'
    } = this.props;
    let { id } = this.state;

    let momentValue = moment(value, 'YYYY-MM-DD');
    if (!momentValue.isValid()) {
      momentValue = null;
    }

    return (
      <div
        className={classnames(
          'date-picker-component',
          styles.DatePicker,
          { [styles.fluid]: fluid },
          className
        )}
        id={id}
      >
        <RDatepicker
          placeholderText={placeholder}
          customInput={this.getCustomInput()}
          selected={momentValue}
          onChange={this.onChange}
          disabled={disabled}
          dateFormat={format}
          fixedHeight={true}
        />
      </div>
    );
  }
}
