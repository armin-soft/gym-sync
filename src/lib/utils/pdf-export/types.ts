
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
