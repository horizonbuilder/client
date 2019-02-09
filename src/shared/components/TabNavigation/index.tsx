import * as React from 'react';
import * as styles from './styles.css';
import * as classnames from 'classnames';

type TabNavigationTypes = 'vertical' | 'horizontal';

export interface TabOption {
  label: string;
  value: any;
  custom?: any;
}

export interface TabNavigationProps {
  options: Array<TabOption>;
  value: any;
  onChange: Function;
  type?: TabNavigationTypes;
  className?: string;
}

export class TabNavigation extends React.Component<TabNavigationProps, any> {
  checkValue(value, options) {
    if (typeof value != 'undefined' && value != null && !value.value) {
      for (let i = 0; i < options.length; i++) {
        if (value == options[i].value) {
          value = options[i];
          break;
        }
      }
    }
    return value || {};
  }

  render() {
    let { type = 'vertical', className, options, value, onChange } = this.props;

    let valueObj = this.checkValue(value, options);

    return (
      <div
        className={classnames('tab-navigation-component', styles.TabNavigation, className, {
          [styles.vertical]: type == 'vertical',
          [styles.horizontal]: type == 'horizontal'
        })}
      >
        {options.map((opt, i) => (
          <div
            key={i}
            onClick={() => onChange(opt)}
            className={classnames(styles.singleOption, {
              [styles.active]: valueObj.value == opt.value
            })}
          >
            {opt.custom ? opt.custom : opt.label}
          </div>
        ))}
      </div>
    );
  }
}
