import * as React from 'react';
import * as styles from './styles.css';
import * as classnames from 'classnames';
import { RouteComponentProps } from 'react-router-dom';
import TradesService from '../../../services/trades';
import ServicesService from '../../../services/jobServices';
import EstimatesService from '../../../services/estimates';
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

export interface EstimateState {
  trades: ITrade[];
  services: IService[];
  isLoading: boolean;
  isSaving: boolean;
  showTradeModal: boolean;
  newTradeName: string;
  totalCost: number;
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
      newTradeName: '',
      totalCost: 0
    };
  }

  componentDidMount() {
    this.mounted = true;
    this.loadTrades();
    this.loadServices();
    this.getTotalCost();
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  componentWillReceiveProps(nextProps: RouteComponentProps<EstimateProps>) {
    this.loadTrades();
    this.loadServices();
    this.getTotalCost();
  }

  async loadTrades(): Promise<void> {
    const { jobId, estimateId } = this.props.match.params;
    this.setState({
      isLoading: true
    });

    const trades = await TradesService.getTrades(jobId, estimateId);

    this.setState({
      trades,
      isLoading: false
    });
  }

  async loadServices(): Promise<void> {
    const { jobId, estimateId } = this.props.match.params;
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

  async getTotalCost() {
    const { jobId, estimateId } = this.props.match.params;
    let totalCost = await EstimatesService.getTotalCost(jobId, estimateId);
    this.setState({ totalCost });
  }

  render() {
    let { isSaving, trades, showTradeModal, services, totalCost } = this.state;
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
              updateTotal={this.getTotalCost.bind(this)}
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
        <div className={styles.TotalsContainer}>
          <div>Total</div>
          <div>{totalCost}</div>
          <div>+ Shipping</div>
          <Input fluid id="shipping" name="shipping" onChange={e => {}} value="" />
          <div>+ Taxes</div>
          <Input fluid id="taxes" name="taxes" onChange={e => {}} value="" />
          <div>- Discount</div>
          <Input fluid id="discount" name="discount" onChange={e => {}} value="" />
          <div>GRAND TOTAL</div>
          <div>{totalCost}</div>
        </div>
      </div>
    );
  }
}
