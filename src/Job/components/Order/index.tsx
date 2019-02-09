import * as React from 'react';
import * as styles from './styles.css';
import * as classnames from 'classnames';
import { RouteComponentProps } from 'react-router-dom';

export interface OrderProps {
  jobId: string;
  estimateId: string;
}

type IEditable<T> = { [P in keyof T]?: T[P] };

export interface OrderState {
  isLoading: boolean;
  isSaving: boolean;
}

export class Order extends React.Component<RouteComponentProps<OrderProps>, OrderState> {
  mounted = false;

  constructor(props: RouteComponentProps<OrderProps>) {
    super(props);

    this.state = {
      isLoading: false,
      isSaving: false
    };
  }
  render() {
    let { isSaving } = this.state;

    return <div />;
  }
}
