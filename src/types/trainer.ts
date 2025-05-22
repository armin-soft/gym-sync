
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
  image: string; // Changed from optional to required
  // اضافه کردن فیلدهای مستقیم برای سادگی دسترسی
  instagram?: string;
  website?: string;
  fullName?: string; // Added fullName property for export.ts compatibility
}

export const defaultProfile: TrainerProfile = {
  email: "demo@gymsync.app",
  password: "12345678",
  name: "مربی نمونه",
  fullName: "مربی نمونه", // Added fullName
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
  website: "gymsync.app",
  image: "/Assets/Image/Place-Holder.svg" // Added default image
};
