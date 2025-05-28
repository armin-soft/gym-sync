
export interface TrainerProfile {
  name?: string;
  gymName?: string;
  phone?: string;
  image?: string;
}

export interface PdfPageOptions {
  margin: [number, number, number, number];
  pageSize: string;
  pageOrientation: 'portrait' | 'landscape';
}

export interface PdfDocDefinition {
  content: any[];
  defaultStyle?: any;
  styles?: any;
  pageMargins?: [number, number, number, number];
  pageSize?: string;
  pageOrientation?: 'portrait' | 'landscape';
  footer?: any;
}
