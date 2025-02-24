
export interface SupplementCategory {
  id: number;
  name: string;
}

export interface Supplement {
  id: number;
  name: string;
  category: string;
  dosage: string;
  timing: string;
  description: string;
}
