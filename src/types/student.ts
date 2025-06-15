
export interface Student {
  id: number;
  name: string;
  phone: string;
  email?: string;
  age?: number;
  gender?: 'male' | 'female';
  height?: number;
  weight?: number;
  profileImage?: string;
  registrationDate: string;
  paymentStatus: 'paid' | 'unpaid' | 'partial';
  membershipType?: string;
  notes?: string;
  emergencyContact?: string;
  medicalConditions?: string;
  fitnessGoals?: string;
  experience?: 'beginner' | 'intermediate' | 'advanced';
  preferredWorkoutTime?: string;
  dietaryRestrictions?: string;
}
