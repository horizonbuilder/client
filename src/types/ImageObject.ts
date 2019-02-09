export interface CropBox {
  left: number;
  top: number;
  width: number;
  height: number;
}

export interface Drawing {
  id: string;
  type: string;
  data: any;
}

export interface ImageObject {
  url: string;
  cropbox: CropBox;
  drawings: Array<Drawing>;
  initialHeightToWidth: number;
  caption?: string;
}
