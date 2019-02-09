import * as React from 'react';
import * as styles from './styles.css';
import * as uuidv4 from 'uuid/v4';
import * as classnames from 'classnames';

type RadioSizes = 'medium' | 'small';

interface RadioProps {
  onChange?: React.EventHandler<React.ChangeEvent<HTMLInputElement>>;
  children?: any;
  id?: string;
  checked?: boolean;
  name?: string;
  disabled?: boolean;
  formControl?: boolean;
  size?: RadioSizes;
}

export class Radio extends React.Component<RadioProps, any> {
  constructor(props) {
    super(props);

    this.state = {
      id: props.id || uuidv4()
    };
  }

  render() {
    let { size = 'medium', formControl, onChange, checked, children, name, disabled } = this.props,
      id = this.state.id;

    return (
      <label
        className={classnames('radio-component', styles.Radio, {
          [styles.formControl]: formControl,
          [styles.medium]: size == 'medium',
          [styles.small]: size == 'small'
        })}
        htmlFor={id}
      >
        <input
          type="radio"
          name={name}
          id={id}
          checked={checked}
          onChange={onChange}
          disabled={disabled}
        />
        <div
          className={classnames(styles.RadioContent, {
            [styles.Disabled]: disabled,
            [styles.Checked]: checked
          })}
        >
          <div className={styles.RadioBox}>{checked && <div className={styles.RadioFill} />}</div>
          {children && <div className={styles.RadioLabel}>{children}</div>}
        </div>
      </label>
    );
  }
}
