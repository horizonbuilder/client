export interface Material {
  id: number;
  name: string;
  quantity: number;
  unit: string;
  cost_per_unit: number;
  supplier_cost: number;
  profit: number;
}

export interface MaterialInput {
  name: string;
  quantity: number;
  unit: string;
  cost_per_unit: number;
  supplier_cost: number;
  profit: number;
}
