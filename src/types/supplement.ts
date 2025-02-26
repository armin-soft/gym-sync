
export interface SupplementCategory {
  id: number;
  name: string;
  type: 'supplement' | 'vitamin';
}

export interface Supplement {
  id: number;
  name: string;
  category: string;
  dosage: string;
  timing: string;
  description: string;
  type: 'supplement' | 'vitamin';
}
