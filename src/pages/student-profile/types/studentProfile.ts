
export interface StudentProfile {
  id: string;
  name: string;
  phone: string;
  age: string;
  gender: 'male' | 'female';
  height: string;
  weight: string;
  grade: string;
  group: string;
  image: string;
  payment: string;
}

export interface StudentProfileFormErrors {
  [key: string]: string;
}

export interface StudentProfileValidFields {
  [key: string]: boolean;
}
