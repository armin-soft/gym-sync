
import { Student } from "@/components/students/StudentTypes";

// PDF export types
export interface PDFOptions {
  orientation: 'portrait' | 'landscape';
  unit: 'mm' | 'cm' | 'in';
  format: string;
  hotfixes?: string[];
  compress?: boolean;
  putOnlyUsedFonts?: boolean;  // Added missing property
  floatPrecision?: number;     // Added missing property
}

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

export interface TableThemeOptions {
  headColor: number[];
  altColor: number[];
}

export interface PdfPreviewOptions {
  student: Student;
  trainerProfile: TrainerProfile;
  showHeader?: boolean;
}
