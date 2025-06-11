
export interface Supplement {
  id: number;
  name: string;
  type: "supplement" | "vitamin";
  dosage: string;
  description?: string;
}
