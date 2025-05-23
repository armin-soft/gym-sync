
import { Student } from "@/components/students/StudentTypes";

// PDF export types
export interface PDFOptions {
  orientation: 'portrait' | 'landscape';
  unit: 'mm' | 'cm' | 'in';
  format: string;
  hotfixes?: string[];
  compress?: boolean;
}

export interface TrainerProfile {
  name?: string;
  gymName?: string;
  email?: string;
  phone?: string;
  [key: string]: any;
}
