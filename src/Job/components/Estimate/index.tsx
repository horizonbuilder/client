import * as React from 'react';
import * as styles from './styles.css';
import * as classnames from 'classnames';
import { RouteComponentProps } from 'react-router-dom';
import TradesService from '../../../services/trades';
import ServicesService from '../../../services/jobServices';
import { Trade as ITrade, Service as IService } from '../../../types';
import { Button } from '../../../shared/components/Button';
import { Modal } from '../../../shared/components/Modal';
import { Input } from '../../../shared/components/Input';
import { Label } from '../../../shared/components/Label';
import { Trade } from '../Trade';

export interface EstimateProps {
  jobId: string;
  estimateId: string;
}

type IEditable<T> = { [P in keyof T]?: T[P] };

export interface EstimateState {
  trades: ITrade[];
  services: IService[];
  isLoading: boolean;
  isSaving: boolean;
  showTradeModal: boolean;
  newTradeName: string;
}

export class Estimate extends React.Component<RouteComponentProps<EstimateProps>, EstimateState> {
  mounted = false;

  constructor(props: RouteComponentProps<EstimateProps>) {
    super(props);

    this.state = {
      isLoading: true,
      isSaving: false,
      trades: [],
      services: [],
      showTradeModal: false,
      newTradeName: ''
    };
  }

  componentDidMount() {
    this.mounted = true;
    const { jobId, estimateId } = this.props.match.params;

    this.loadTrades(jobId, estimateId);
    this.loadServices(jobId, estimateId);
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  componentWillReceiveProps(nextProps: RouteComponentProps<EstimateProps>) {
    const { jobId, estimateId } = nextProps.match.params;

    this.loadTrades(jobId, estimateId);
    this.loadServices(jobId, estimateId);
  }

  async loadTrades(jobId: string, estimateId: string): Promise<void> {
    this.setState({
      isLoading: true
    });

    const trades = await TradesService.getTrades(jobId, estimateId);

    this.setState({
      trades,
      isLoading: false
    });
  }

  async loadServices(jobId: string, estimateId: string): Promise<void> {
    this.setState({
      isLoading: true
    });

    const services = await ServicesService.getServices(jobId, estimateId);

    this.setState({
      services,
      isLoading: false
    });
  }

  async addTrade() {
    const { jobId, estimateId } = this.props.match.params;
    let { trades, newTradeName } = this.state;
    this.setState({
      isLoading: true
    });

    const newTrade = await TradesService.createTrade(jobId, estimateId, newTradeName);
    trades.push(newTrade);

    this.setState({
      trades,
      showTradeModal: false,
      isLoading: false
    });
  }

  render() {
    let { isSaving, trades, showTradeModal, services } = this.state;
    let { jobId, estimateId } = this.props.match.params;

    return (
      <div className={styles.EstimateContainer}>
        {trades.map(t => {
          let tradeServices = services.filter(s => s.trade_id == t.id);
          return (
            <Trade
              trade={t}
              services={tradeServices}
              jobId={parseInt(jobId)}
              estimateId={parseInt(estimateId)}
              key={t.id}
            />
          );
        })}
        <Modal
          show={showTradeModal}
          showCancel={true}
          onOk={this.addTrade.bind(this)}
          onCancel={() => this.setState({ showTradeModal: false })}
        >
          <Input
            fluid
            placeholder="Trade name"
            id="name"
            name="name"
            onChange={e => {
              this.setState({ newTradeName: e.target.value });
            }}
          />
        </Modal>
        <div className={styles.AddTradeButton}>
          <Button onClick={() => this.setState({ showTradeModal: true })}>Add Trade</Button>
        </div>
      </div>
    );
  }
}
