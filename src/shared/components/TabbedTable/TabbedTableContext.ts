export interface TabbedTableContext {
  onTabSelect: (index: number, isLastTab: boolean) => void;
  activeTabIndex: number;
  lastTabActive: boolean;
}
