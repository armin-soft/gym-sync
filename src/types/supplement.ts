
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
  description?: string;
  dosage?: string;
  timing?: string;
}
