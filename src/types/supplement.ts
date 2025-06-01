
export interface SupplementCategory {
  id: number;
  name: string;
  type: 'supplement' | 'vitamin';
}

export interface Supplement {
  id: number;
  name: string;
  category: string;
  type: 'supplement' | 'vitamin';
  dosage?: string;          // دوز مصرف
  timing?: string;          // زمان مصرف  
  description?: string;     // توضیحات
  notes?: string;           // یادداشت
  supplementType?: string;  // نوع مکمل (برای سازگاری با کد قبلی)
}
