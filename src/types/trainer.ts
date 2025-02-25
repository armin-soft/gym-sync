
export interface TrainerProfile {
  name: string;
  bio: string;
  phone: string;
  email: string;
  password: string;
  price: string;
  image: string;
}

export const defaultProfile: TrainerProfile = {
  name: "",
  bio: "",
  phone: "",
  email: "",
  password: "",
  price: "",
  image: "/placeholder.svg"
};
