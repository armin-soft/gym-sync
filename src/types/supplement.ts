
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
  supplementType?: string;  // Added supplementType property as optional
  description?: string;
  dosage?: string;
  timing?: string;
}
