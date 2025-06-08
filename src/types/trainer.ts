
export interface TrainerProfile {
  name: string;
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
  bio: "",
  phone: "",
  image: "/Assets/Image/Place-Holder.svg",
  gymName: "",
  gymDescription: "",
  gymAddress: "",
  instagram: "",
  website: ""
};
