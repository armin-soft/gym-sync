
export interface SupplementCategory {
  id: number;
  name: string;
  type: "supplement" | "vitamin";
  description?: string;
}

export interface Supplement {
  id: number;
  name: string;
  type: "supplement" | "vitamin";
  dosage: string;
  description?: string;
  category?: string;
  timing?: string;
}
