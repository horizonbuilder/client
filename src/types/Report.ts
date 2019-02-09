export interface Report {
  report: any;
}

export interface PageConfig {
  title?: string;
  description?: string;
}

export interface Page {
  id: string;
  items: any;
  config?: PageConfig;
}

export interface TOCSection {
  title: string;
  subsections: Array<{
    title: string;
    pages: Array<number>;
  }>;
}

export interface Section {
  id: string;
  title: string;
  pages: Array<Page>;
  isSaved?: boolean;
}

export interface SectionTemplate {
  id: number;
  content: Section;
}

export interface ReportNew {
  sections: Array<Section>;
  error?: any;
}

export interface ReportInput {
  report: any;
}

export interface ReportBuilderAction {
  action: string;
  pageId?: number;
  itemId: number;
  item?: Item;
  adjustColumns?: number;
  text?: string;
  left?: number;
  top?: number;
  colspan?: number;
  type?: string;
}

export interface Item {
  id: number;
  type: string;
  colSpan: number;
  top: number;
  left: number;
  selected: boolean;
  text?: string;
  data?: Array<Array<string>>;
  file_url?: string;
  description?: string;
  deleted?: boolean;
}

export interface CloseFunction {
  (): void;
}

export interface SaveFunction {
  (): void;
}

export interface ContentBoxFunction {
  (e: object): void;
}

export interface TextBoxProps {
  page: number;
  item: Item;
  updateContentBox: ContentBoxFunction;
}

export interface TextBoxState {
  text: string;
  focused: boolean;
  contentState: any;
}

export interface DragData {
  x: number;
  y: number;
  deltaX: number;
  node: HTMLElement;
}

export interface UpdateFunc {
  (e: object, d: DragData): void;
}

export interface DraggableContentBoxProps {
  page: number;
  columnWidth: number;
  updateContentBox: ContentBoxFunction;
  grid: [number, number];
  item: Item;
}

export interface TableProps {
  item: Item;
}

export interface ColumnProps {
  page: number;
  ColNum: number;
  width: number;
  height: number;
}

export interface PageProps {
  columns: number;
  items: Array<Item>;
  id: number;
  height: number;
  width: number;
  gutter: number;
  margin: number;
  updateContentBox: ContentBoxFunction;
}

export interface ToolbarProps {
  updateContentBox: ContentBoxFunction;
  saveReport: SaveFunction;
}

export interface NewItem {
  type: string;
  text?: string;
  data?: Array<Array<string>>;
  file_url?: string;
}

export interface DroppableAssetProps {
  updateContentBox: ContentBoxFunction;
  type: string;
  id?: number;
  item?: NewItem;
}

export interface TableLibraryProps {
  updateContentBox: ContentBoxFunction;
}
