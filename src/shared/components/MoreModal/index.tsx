import * as React from 'react';
import * as styles from './styles.css';
import { Modal } from '../Modal';

interface State {
  showModal: boolean;
}

export interface MoreModalProps {
  content: string;
  maxContentLength: number;
}

export class MoreModal extends React.Component<MoreModalProps, State> {
  constructor(props) {
    super(props);

    this.state = {
      showModal: false
    };
  }

  render() {
    let { content, maxContentLength } = this.props;

    let newContent: any = content;
    if (newContent.length > maxContentLength) {
      newContent = (
        <React.Fragment>
          {newContent.substr(0, maxContentLength) + '...'}{' '}
          <a
            className={styles.showMoreLink}
            onClick={e => {
              e.preventDefault();
              this.setState({ showModal: true });
            }}
          >
            More
          </a>
        </React.Fragment>
      );
    }

    return (
      <React.Fragment>
        {newContent}
        <Modal
          show={this.state.showModal}
          onOk={() => this.setState({ showModal: false })}
          size="small"
        >
          <div className={styles.MoreModal}>{content}</div>
        </Modal>
      </React.Fragment>
    );
  }
}
