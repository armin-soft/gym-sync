
export interface StudentProfile {
  name: string;
  phone: string;
  email: string;
  birthDate: string;
  address: string;
  height: string;
  weight: string;
  goal: string;
  image: string;
  membershipDate: string;
  emergencyContact: string;
  medicalConditions: string;
  fitnessLevel: string;
  // اضافه کردن فیلدهای جدید از Student type
  payment: string;
  age: string;
  grade: string;
  group: string;
  gender: "male" | "female";
}
