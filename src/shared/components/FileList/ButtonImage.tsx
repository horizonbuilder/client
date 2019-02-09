import * as React from 'react';
import * as styles from './styles.css';
import * as classnames from 'classnames';
import { Checkbox } from '../Checkbox';

export interface Props {
    editBtn?: boolean;
    deleteBtn?: boolean;
    index: number;
    src: string;
    description: string;
    selected: boolean;
    onSelect?: (evt: any) => void;
}

export class ImageButton extends React.Component<Props, null> {
    onSelect = (evt: any) => {
        console.log(evt.target.parentNode.parentNode);
    }

    render() {
        const { editBtn = 'false', deleteBtn = 'false', index, src, description, selected } = this.props;
        return (
            <button className={styles.ImageButton} data-file={index} onClick={this.onSelect}>
                <div className={styles.ImageButtonImg}>
                    <img src={src} alt={description} />
                </div>
                <div className={styles.ImageButtonFooter}>
                    {description ? description : ''}
                    <div className={styles.ImageButtonFooterSelect}>
                        <Checkbox
                            onChange={() => { }}
                            checked={selected}
                        />
                    </div>
                </div>
            </button>
        )
    }
}