
export interface TrainerProfile {
  name: string;
  fullName: string; // Added missing property
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
  fullName: "", // Added missing property
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
