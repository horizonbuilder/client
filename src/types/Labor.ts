export interface Labor {
  id: number;
  description: string;
  hours: number;
  cost_per_hour: number;
}

export interface LaborInput {
  description: string;
  hours: number;
  cost_per_hour: number;
}
