export interface Template {
  id?: number;
  name: string;
  fields: number[];
  type: string;
}

export interface TemplateFieldsGroup {
  id?: number;
  name: string;
  fields: number[];
}
