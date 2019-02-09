import * as React from 'react';
import * as styles from './styles.css';
import * as uuidv4 from 'uuid/v4';
import * as classnames from 'classnames';

type ToggleSizes = 'medium' | 'small';

interface ToggleProps {
  onChange?: Function;
  children?: any;
  id?: string;
  checked?: boolean;
  name?: string;
  disabled?: boolean;
  size?: ToggleSizes;
}

export class Toggle extends React.Component<ToggleProps, any> {
  constructor(props) {
    super(props);

    this.state = {
      id: props.id || uuidv4()
    };
  }

  render() {
    let { size = 'medium', onChange, checked, children, name, disabled } = this.props,
      id = this.state.id;

    return (
      <label
        className={classnames('Toggle-component', styles.Toggle, {
          [styles.medium]: size == 'medium',
          [styles.small]: size == 'small'
        })}
        htmlFor={id}
        onClick={e => onChange()}
      >
        <div
          className={classnames(styles.ToggleContent, {
            [styles.Disabled]: disabled,
            [styles.Checked]: checked
          })}
        >
          <div className={styles.ToggleBox}>
            <div className={styles.ToggleFill} />
          </div>
          {children && <div className={styles.ToggleLabel}>{children}</div>}
        </div>
      </label>
    );
  }
}
