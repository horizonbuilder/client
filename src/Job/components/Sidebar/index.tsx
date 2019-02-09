import * as React from 'react';
import * as styles from './styles.css';
import { pick } from 'lodash';
import { RouteComponentProps, Link, matchPath } from 'react-router-dom';
import { Icon } from '../../../shared/components/Icon';
import { Button } from '../../../shared/components/Button';
import * as classnames from 'classnames';
import { ConnectedSidebar as SidebarContainer } from '../../../shared/layouts/Sidebar';
import EstimatesService from '../../../services/estimates';
import OrdersService from '../../../services/orders';
import { Estimate as IEstimate, Order as IOrder } from '../../../types';

export interface SidebarProps {
  jobId: string;
}

export interface SidebarState {
  isOpen: boolean;
  isExpanded: boolean;
  isLoading: boolean;
  estimates: IEstimate[];
  orders: IOrder[];
}

export class Sidebar extends React.Component<RouteComponentProps<SidebarProps>, SidebarState> {
  unsubscribeFromTracts: any;
  mounted: boolean;

  constructor(props: RouteComponentProps<SidebarProps>) {
    super(props);

    this.state = {
      isOpen: true,
      isExpanded: true,
      isLoading: false,
      estimates: [],
      orders: []
    };
  }

  componentDidMount() {
    this.mounted = true;
    this.fetchEstimates(this.props.match.params.jobId);
    this.fetchOrders(this.props.match.params.jobId);
  }

  componentWillUnmount() {
    this.mounted = false;
    this.unsubscribeFromTracts && this.unsubscribeFromTracts();
  }

  async fetchEstimates(jobId: string): Promise<void> {
    this.setState({
      isLoading: true
    });

    const estimates = await EstimatesService.getEstimates(parseInt(jobId));

    this.setState({
      estimates,
      isLoading: false
    });
  }

  async fetchOrders(jobId: string): Promise<void> {
    this.setState({
      isLoading: true
    });

    const orders = await OrdersService.getOrders(parseInt(jobId));

    this.setState({
      orders,
      isLoading: false
    });
  }

  async addNewEstimate() {
    let { estimates } = this.state;
    let { jobId } = this.props.match.params;
    this.setState({
      isLoading: true
    });

    const newEstimate = await EstimatesService.createEstimate(parseInt(jobId));
    estimates.push(newEstimate);

    this.setState({
      estimates,
      isLoading: false
    });
  }

  addNewOrder() {}

  render() {
    const { isLoading, estimates, orders } = this.state;
    const { url } = this.props.match;

    return (
      <div className={styles.Sidebar}>
        <Link to={'/'}>
          <div>&#60; Jobs</div>
        </Link>
        <div className={styles.TopLinks}>
          <Link to={url + '/info'}>
            <div>Information</div>
          </Link>
          <div className={styles.LinkHeader}>
            Estimates<Button onClick={this.addNewEstimate.bind(this)}>+ New</Button>
          </div>
          <div className={styles.SubLinkList}>
            {estimates.map((e, i) => (
              <Link to={url + '/estimates/' + e.id}>Estimate #{i + 1}</Link>
            ))}
          </div>
          <div className={styles.LinkHeader}>
            Orders<Button onClick={() => {}}>+ New</Button>
          </div>
          <div className={styles.SubLinkList}>
            {orders.map((o, i) => <Link to={url + '/order/' + o.id}>Order #{i + 1}</Link>)}
          </div>
        </div>
        <div className={styles.BottomLinks}>
          <Link to={url + '/documents'}>
            <div>Documents</div>
          </Link>
          <Link to={url + '/gallery'}>
            <div>Gallery</div>
          </Link>
          <Link to={url + '/notes'}>
            <div>Notes</div>
          </Link>
        </div>
      </div>
    );
  }
}
