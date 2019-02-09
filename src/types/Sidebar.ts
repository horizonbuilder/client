

export interface MenuItem {
  href: string;
  title: string;
  icon?: string;
  component?: any;
  selected?: any;
  name?: any;
  onClick?: (component, name) => void;
};