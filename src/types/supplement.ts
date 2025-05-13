
export interface Supplement {
  id: number;
  name: string;
  type: 'supplement' | 'vitamin';
  description?: string;
  dosage?: string;
  image?: string;
  frequency?: string;
  categoryId?: string;
  category?: string;  // Add this property
  timing?: string;    // Add this property
  createdAt?: string;
}

export interface SupplementCategory {
  id: string;
  name: string;
  type: 'supplement' | 'vitamin';
  description?: string;
}
