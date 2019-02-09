import * as React from 'react';
import * as styles from './styles.css';
import { SketchPicker } from 'react-color';

export interface ColorPickerProps {
  color: string;
  onChange?: (c, e) => void;
}
export interface ColorPickerState {
  showColorPicker: boolean;
}

export class ColorPicker extends React.Component<ColorPickerProps, ColorPickerState> {
  state = {
    showColorPicker: false
  };
  render() {
    return (
      <div className={styles.colorContainer}>
        <div
          className={styles.colorSample}
          style={{ backgroundColor: this.props.color }}
          onMouseDown={() => {
            let showColorPicker = !this.state.showColorPicker;
            this.setState({ showColorPicker });
          }}
        />
        {this.state.showColorPicker && (
          <div className={styles.colorPickerPopout}>
            <SketchPicker
              color={this.props.color}
              onChange={(c, e) => {
                console.log(c, e);
                if (this.props.onChange) this.props.onChange(c, e);
              }}
            />
          </div>
        )}
      </div>
    );
  }
}
