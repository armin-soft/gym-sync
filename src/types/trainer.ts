
export interface TrainerProfile {
  name: string;
  fullName: string;
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
  fullName: "",
  bio: "",
  phone: "",
  email: "MohammadAbbasiFix@gmail.com",
  password: "Mohammad@1404",
  image: "/placeholder.svg",
  gymName: "",
  gymDescription: "",
  gymAddress: "",
  instagram: "",
  website: ""
};
