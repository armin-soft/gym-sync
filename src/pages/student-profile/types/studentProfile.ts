
export interface StudentProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  age: string;
  gender: 'male' | 'female';
  birthDate: string;
  address: string;
  height: string;
  weight: string;
  grade: string;
  group: string;
  emergencyContactName: string;
  emergencyContactPhone: string;
  paymentStatus: 'paid' | 'pending' | 'overdue';
  goal: string;
  image: string;
  medicalConditions: string;
  allergies: string;
  fitnessLevel: 'beginner' | 'intermediate' | 'advanced';
  preferredWorkoutTime: string;
  notes: string;
}

export interface StudentProfileFormErrors {
  [key: string]: string;
}

export interface StudentProfileValidFields {
  [key: string]: boolean;
}
