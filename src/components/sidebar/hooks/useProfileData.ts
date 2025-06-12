
import { useState, useCallback } from "react";
import { TrainerProfile } from "../../modern-sidebar/types";

export const useProfileData = () => {
  const [trainerProfile, setTrainerProfile] = useState<TrainerProfile>({
    name: "مربی حرفه‌ای",
    phone: "",
    image: "",
    gymName: "",
    status: 'active',
    membersSince: "۱۴۰۲"
  });

  const loadProfile = useCallback(() => {
    try {
      const savedProfile = localStorage.getItem('trainerProfile');
      if (savedProfile) {
        const profile = JSON.parse(savedProfile);
        setTrainerProfile({
          name: profile.name || "مربی حرفه‌ای",
          phone: profile.phone || "",
          image: profile.image || "",
          gymName: profile.gymName || "",
          status: 'active',
          membersSince: "۱۴۰۲"
        });
      }
    } catch (error) {
      console.error('Error loading profile from localStorage:', error);
    }
  }, []);

  return {
    trainerProfile,
    loadProfile
  };
};
