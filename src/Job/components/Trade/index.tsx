import * as React from 'react';
import * as styles from './styles.css';
import * as classnames from 'classnames';
import { Trade as ITrade, Service as IService } from '../../../types';
import { Service } from '../Service';
import { Button } from '../../../shared/components/Button';
import { Modal } from '../../../shared/components/Modal';
import { Input } from '../../../shared/components/Input';
import ServicesService from '../../../services/jobServices';

export interface TradeProps {
  trade: ITrade;
  services: IService[];
  jobId: number;
  estimateId: number;
  updateTotal: Function;
}

export interface TradeState {
  showServiceModal: boolean;
  newServiceName: string;
  services: IService[];
}

export class Trade extends React.Component<TradeProps, TradeState> {
  constructor(props: TradeProps) {
    super(props);

    this.state = {
      showServiceModal: false,
      newServiceName: '',
      services: this.props.services
    };
  }

  componentWillReceiveProps(nextProps: TradeProps) {
    const { services } = nextProps;
    this.setState({ services });
  }

  async addService() {
    const { jobId, estimateId, trade } = this.props;
    let { services, newServiceName } = this.state;

    const newService = await ServicesService.createService(jobId, estimateId, {
      name: newServiceName,
      trade_id: trade.id
    });
    services.push(newService);

    this.setState({
      services,
      showServiceModal: false
    });
  }

  render() {
    let { trade, jobId } = this.props;
    let { showServiceModal, services } = this.state;

    return (
      <div className={styles.TradeContainer}>
        <div className={styles.TradeName}>{trade.name}</div>
        <br />
        {services.map(s => (
          <Service service={s} jobId={jobId} updateTotal={this.props.updateTotal} />
        ))}
        <Modal
          show={showServiceModal}
          showCancel={true}
          onOk={this.addService.bind(this)}
          onCancel={() => this.setState({ showServiceModal: false })}
        >
          <Input
            fluid
            placeholder="Service name"
            id="name"
            name="name"
            onChange={e => {
              this.setState({ newServiceName: e.target.value });
            }}
          />
        </Modal>
        <div className={styles.AddServiceButton}>
          <Button onClick={() => this.setState({ showServiceModal: true })}>Add Service</Button>
        </div>
      </div>
    );
  }
}
