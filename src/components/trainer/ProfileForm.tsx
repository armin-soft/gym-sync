
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { TrainerProfile } from "@/types/trainer";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { useDeviceInfo } from "@/hooks/use-mobile";
import { SaveButton } from "./SaveButton";
import { FormProvider } from "./form/FormContext";
import { FormContent } from "./form/FormContent";
import { validateField, validateAllFields } from "./form/validation";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

interface ProfileFormProps {
  profile: TrainerProfile;
  onUpdate: (key: keyof TrainerProfile, value: string) => void;
  onSave: () => void;
  errors: Partial<Record<keyof TrainerProfile, string>>;
  setErrors: React.Dispatch<React.SetStateAction<Partial<Record<keyof TrainerProfile, string>>>>;
  validFields: Partial<Record<keyof TrainerProfile, boolean>>;
  setValidFields: React.Dispatch<React.SetStateAction<Partial<Record<keyof TrainerProfile, boolean>>>>;
  activeSection: string;
  isSaving: boolean;
}

export const ProfileForm = ({
  profile,
  onUpdate,
  onSave,
  errors,
  setErrors,
  validFields,
  setValidFields,
  activeSection,
  isSaving
}: ProfileFormProps) => {
  const { toast } = useToast();
  const deviceInfo = useDeviceInfo();

  // Validate initial values
  useEffect(() => {
    Object.entries(profile).forEach(([key, value]) => {
      if (key !== 'image' && value) {
        validateField(key as keyof TrainerProfile, value, setValidFields, setErrors);
      }
    });
  }, []);

  const handleInputChange = (key: keyof TrainerProfile, value: string) => {
    onUpdate(key, value);
    validateField(key, value, setValidFields, setErrors);
    
    // Clear error when user starts typing
    if (errors[key]) {
      setErrors(prev => ({ ...prev, [key]: '' }));
    }
  };

  const handleSave = () => {
    const hasErrors = validateAllFields(profile, setValidFields, setErrors);

    if (hasErrors) {
      toast({
        variant: "destructive",
        title: "خطا در اطلاعات",
        description: "لطفاً خطاهای فرم را برطرف کنید"
      });
      return;
    }
    
    onSave();
  };

  const getCardPadding = () => {
    if (deviceInfo.isMobile) return "p-6";
    if (deviceInfo.isTablet) return "p-7";
    return "p-8";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="relative h-full"
    >
      {/* Enhanced background decoration */}
      <div className="absolute -inset-1 bg-gradient-to-br from-indigo-500/15 via-purple-500/10 to-violet-500/5 rounded-3xl blur-xl opacity-70" />
      
      <Card className={cn(
        "relative backdrop-blur-2xl border-0 shadow-2xl h-full overflow-hidden",
        "bg-gradient-to-br from-white/70 via-white/60 to-indigo-50/30 dark:from-gray-800/70 dark:via-gray-700/60 dark:to-indigo-900/20",
        "hover:shadow-3xl hover:from-white/80 hover:via-white/70 hover:to-indigo-50/40",
        "transition-all duration-500"
      )}>
        {/* Subtle pattern overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-indigo-500/5 to-transparent opacity-40" />
        
        {/* Dynamic corner decorations */}
        <motion.div 
          className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-violet-400/20 to-transparent rounded-full blur-2xl"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        <motion.div 
          className="absolute bottom-0 left-0 w-20 h-20 bg-gradient-to-tr from-indigo-400/15 to-transparent rounded-full blur-xl"
          animate={{ 
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.5, 0.2]
          }}
          transition={{ duration: 5, repeat: Infinity }}
        />

        <div className={cn(
          getCardPadding(),
          "space-y-8 h-full flex flex-col relative z-10"
        )}>
          <FormProvider
            profile={profile}
            onUpdate={handleInputChange}
            errors={errors}
            setErrors={setErrors}
            validFields={validFields}
            setValidFields={setValidFields}
            activeSection={activeSection}
            isSaving={isSaving}
          >
            <motion.div 
              className="flex-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <FormContent />
            </motion.div>
          </FormProvider>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <SaveButton onSave={handleSave} isLoading={isSaving} />
          </motion.div>
        </div>

        {/* Floating sparkle decoration */}
        <motion.div 
          className="absolute top-6 left-6 opacity-40"
          animate={{ 
            rotate: 360,
            scale: [1, 1.2, 1]
          }}
          transition={{ 
            rotate: { duration: 6, repeat: Infinity, ease: "linear" },
            scale: { duration: 3, repeat: Infinity }
          }}
        >
          <Sparkles className="w-5 h-5 text-indigo-500" />
        </motion.div>
      </Card>
    </motion.div>
  );
};
