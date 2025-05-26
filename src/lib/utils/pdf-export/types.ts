
export interface TrainerProfile {
  name?: string;
  gymName?: string;
  email?: string;
  phone?: string;
  logo?: string;
  address?: string;
  instagram?: string;
  website?: string;
  [key: string]: any;
}

export interface PDFDocumentOptions {
  pageSize: string;
  pageOrientation: 'portrait' | 'landscape';
  pageMargins: number[];
  defaultStyle: {
    font: string;
    fontSize: number;
    alignment: string;
    direction?: string;
    bidi?: boolean; // Added bidi property
  };
}

export interface TableThemeOptions {
  headerColor: string;
  headerTextColor: string;
  rowColor: string;
  alternateRowColor: string;
}

export interface PdfPreviewOptions {
  student: any;
  trainerProfile: TrainerProfile;
  showHeader?: boolean;
}

// Interface for table cell content with alignment and direction
export interface TableCellContent {
  text: string;
  style: string;
  alignment?: 'left' | 'center' | 'right' | 'justify';
  direction?: 'rtl' | 'ltr'; // Added direction property
}
