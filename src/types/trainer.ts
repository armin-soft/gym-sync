
export interface TrainerProfile {
  name: string;
  bio: string;
  phone: string;
  email: string;
  password: string;
  image: string;
  gymName: string;
  gymDescription: string;
  gymAddress: string;
}

export const defaultProfile: TrainerProfile = {
  name: "",
  bio: "",
  phone: "",
  email: "",
  password: "",
  image: "/placeholder.svg",
  gymName: "",
  gymDescription: "",
  gymAddress: ""
};
