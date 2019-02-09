import * as React from 'react';
import * as styles from './styles.css';
import { File as IFile } from '../../../types';

export interface ComponentTabProps {
  components: Array<{ label: string; component: React.Component }>;
  onSelect?: any;
}

export interface ComponentTabState {
  selectedComponant?: number;
}

export class ComponentTab extends React.Component<ComponentTabProps, ComponentTabState> {
  state: ComponentTabState = {};

  selectTab(id: number) {
    this.setState({ selectedComponant: id });
    if (this.props.onSelect !== undefined) {
      this.props.onSelect(id);
    }
  }

  render() {
    var selectedComponant =
      this.state.selectedComponant !== undefined ? this.state.selectedComponant : 0;

    var renderComponant: any = <p>loading</p>;
    if (this.props.components.length) {
      renderComponant = this.props.components[selectedComponant].component;
    }

    var buttons = [];
    for (let i = 0; i < this.props.components.length; i++) {
      var selected = i === selectedComponant ? styles.selected : '';
      buttons.push(
        <li key={'menuList' + i}>
          <button
            className={selected}
            key={'button' + i}
            onClick={() => {
              this.selectTab(i);
            }}
          >
            {this.props.components[i].label}
          </button>
        </li>
      );
    }

    return (
      <div>
        <ul className={styles.tabMenu}>{buttons}</ul>
        <div>{renderComponant}</div>
      </div>
    );
  }
}
