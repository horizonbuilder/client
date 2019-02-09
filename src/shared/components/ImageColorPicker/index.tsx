import * as React from 'react';
import { BlockPicker } from 'react-color';
import * as styles from './styles.css';
import { Button } from '../Button';

export interface ImageColorPickerProps {
  value: string;
  onChange: Function;
}

export interface ImageColorPickerState {
  displayColorPicker: boolean;
}

export class ImageColorPicker extends React.Component<ImageColorPickerProps, ImageColorPickerState> {
  constructor(props: ImageColorPickerProps) {
    super(props);

    this.state = {
      displayColorPicker: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleClick() {
    this.setState({ displayColorPicker: !this.state.displayColorPicker });
  }

  handleClose() {
    this.setState({ displayColorPicker: false });
  }

  handleChange(color: any) {
    this.props.onChange(color.hex);
  }

  render() {
    return (
      <Button size='tiny'>
        <div className={styles.colorPickerWrapper}>
          <div onClick={this.handleClick}>
            <div className={styles.color} style={{ backgroundColor: this.props.value }} />
            {/* <div>Color</div> */}
          </div>
          {this.state.displayColorPicker ? (
            <div className={styles.dropdown}>
              <div onClick={this.handleClose} />
              <BlockPicker color={this.props.value} onChange={this.handleChange} />
            </div>
          ) : null}
        </div>
      </Button>
    );
  }
}