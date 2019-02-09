export interface Service {
  id: number;
  name: string;
  trade_id?: number;
  order_id?: number;
}

export interface ServiceInput {
  name: string;
  trade_id?: number;
  order_id?: number;
}
