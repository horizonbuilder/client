export interface CommonAttributes {
  highest_best_use?: string[];
  land_use_type?: string[];
  property_type?: string[];
  category_type?: string[];
  commodity_type?: string[];
  source?: string[];
}

export interface AttributesGroup {
  id?: number;
  name: string;
  type?: string;
  attributes_names?: string[];
}