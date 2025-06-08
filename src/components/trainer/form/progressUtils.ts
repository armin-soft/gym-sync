
import { TrainerProfile } from "@/types/trainer";

export const calculateCompletionPercentage = (profile: TrainerProfile) => {
  const requiredFields: (keyof TrainerProfile)[] = ['name', 'phone', 'gymName', 'gymAddress'];
  const optionalFields: (keyof TrainerProfile)[] = ['bio', 'gymDescription', 'instagram', 'website'];
  
  let completedRequired = 0;
  let completedOptional = 0;
  
  // Check required fields (70% weight)
  requiredFields.forEach(field => {
    if (profile[field] && profile[field].trim()) {
      completedRequired++;
    }
  });
  
  // Check optional fields (30% weight)
  optionalFields.forEach(field => {
    if (profile[field] && profile[field].trim()) {
      completedOptional++;
    }
  });
  
  // Check profile image (10% bonus)
  const hasProfileImage = profile.image && profile.image !== "/Assets/Image/Place-Holder.svg";
  
  const requiredPercentage = (completedRequired / requiredFields.length) * 70;
  const optionalPercentage = (completedOptional / optionalFields.length) * 30;
  const imageBonus = hasProfileImage ? 10 : 0;
  
  return Math.min(100, Math.round(requiredPercentage + optionalPercentage + imageBonus));
};

export const getProgressColor = (percentage: number) => {
  if (percentage >= 90) return 'from-green-400 to-emerald-500';
  if (percentage >= 70) return 'from-yellow-400 to-orange-500';
  return 'from-red-400 to-pink-500';
};
