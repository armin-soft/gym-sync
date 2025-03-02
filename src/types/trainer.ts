
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
  instagram: string;
  website: string;
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
  gymAddress: "",
  instagram: "",
  website: ""
};
