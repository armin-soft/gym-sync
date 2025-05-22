
export interface TrainerProfile {
  email: string;
  password: string;
  name?: string;
  gymName?: string;
  gymDescription?: string;
  gymAddress?: string;
  phone?: string;
  bio?: string;
  socialMedia?: {
    instagram?: string;
    telegram?: string;
    website?: string;
  };
  profileImage?: string;
  image?: string; // اضافه شده برای سازگاری
  // اضافه کردن فیلدهای مستقیم برای سادگی دسترسی
  instagram?: string;
  website?: string;
}

export const defaultProfile: TrainerProfile = {
  email: "demo@gymsync.app",
  password: "12345678",
  name: "مربی نمونه",
  gymName: "باشگاه تناسب اندام",
  gymDescription: "باشگاه تخصصی تناسب اندام و بدنسازی با امکانات کامل",
  gymAddress: "تهران، خیابان ولیعصر، نرسیده به میدان ونک",
  phone: "09123456789",
  bio: "مربی با تجربه در زمینه تناسب اندام و بدنسازی",
  socialMedia: {
    instagram: "gym.sync",
    telegram: "gymsync",
    website: "gymsync.app"
  },
  instagram: "gym.sync",
  website: "gymsync.app"
};
