import * as React from 'react';
import * as styles from './styles.css';
import * as classnames from 'classnames';
import RCSlider, { Range as RCRange, createSliderWithTooltip } from 'rc-slider';
import 'rc-slider/assets/index.css';

const RangeComponent = createSliderWithTooltip(RCRange);
const SliderComponent = createSliderWithTooltip(RCSlider);

export interface SliderProps {
  onChange?: Function;
  tooltipFormatter?: Function;
  disabled?: boolean;
  className?: string;
  fluid?: boolean;
  size?: string;
  name?: string;
  step?: number;
  min: number;
  max: number;
  value: number | Array<number>;
  range?: boolean;
}

export class Slider extends React.Component<SliderProps, any> {
  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);
  }

  onChange(value) {
    if (typeof this.props.onChange == 'function') {
      this.props.onChange({
        target: {
          name: this.props.name,
          value: value
        }
      });
    }
  }

  defaultTooltipFormatter(value) {
    return value;
  }

  render() {
    let {
      disabled = false,
      fluid = false,
      size = 'medium',
      step = 1,
      tooltipFormatter = this.defaultTooltipFormatter,
      className,
      min,
      max,
      value,
      range = false
    } = this.props;

    let MainComponent = range ? RangeComponent : SliderComponent;
    return (
      <div
        className={classnames('slider-component', styles.Slider, className, {
          'slider-range': range,
          [styles.disabled]: disabled,
          [styles.fluid]: fluid,
          [styles.medium]: size == 'medium',
          [styles.small]: size == 'small'
        })}
      >
        <MainComponent
          onChange={this.onChange}
          min={min}
          max={max}
          value={value}
          disabled={disabled}
          step={step}
          tipFormatter={tooltipFormatter}
        />
      </div>
    );
  }
}
