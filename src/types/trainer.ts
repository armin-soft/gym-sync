
export interface TrainerProfile {
  email: string;
  password: string;
  name?: string;
  gymName?: string;
  phone?: string;
  bio?: string;
  socialMedia?: {
    instagram?: string;
    telegram?: string;
    website?: string;
  };
  profileImage?: string;
}

export const defaultProfile: TrainerProfile = {
  email: "demo@gymsync.app",
  password: "12345678",
  name: "مربی نمونه",
  gymName: "باشگاه تناسب اندام",
  phone: "09123456789",
  bio: "مربی با تجربه در زمینه تناسب اندام و بدنسازی",
  socialMedia: {
    instagram: "gym.sync",
    telegram: "gymsync",
    website: "gymsync.app"
  }
};
