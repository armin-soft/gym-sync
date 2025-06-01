
export interface TrainerProfile {
  name: string;
  fullName: string;
  bio: string;
  phone: string;
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
  phone: "09123823886",
  image: "/Assets/Image/Place-Holder.svg",
  gymName: "",
  gymDescription: "",
  gymAddress: "",
  instagram: "",
  website: ""
};
