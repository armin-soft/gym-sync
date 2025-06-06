
import { AnimatePresence, motion } from "framer-motion";
import { PersonalInfoForm } from "../PersonalInfoForm";
import { GymInfoForm } from "../GymInfoForm";
import { SocialMediaForm } from "../SocialMediaForm";
import { useFormContext } from "./FormContext";

export const FormContent = () => {
  const { profile, onUpdate, errors, validFields, activeSection } = useFormContext();
  
  const handleInputChange = (key: keyof typeof profile, value: string) => {
    // Filter input for name field - only allow Persian characters
    if (key === 'name') {
      const persianOnly = value.replace(/[^[\u0600-\u06FF\s]]/g, '');
      onUpdate(key, persianOnly);
      return;
    }

    // Filter input for phone field - only allow numbers
    if (key === 'phone') {
      let numbersOnly = value.replace(/[^0-9۰-۹]/g, '');
      if (!numbersOnly.startsWith('09') && !numbersOnly.startsWith('۰۹')) {
        numbersOnly = '09' + numbersOnly.slice(2);
      }
      onUpdate(key, numbersOnly);
      return;
    }

    onUpdate(key, value);
  };

  const renderTabContent = () => {
    const variants = {
      initial: { opacity: 0, y: 10 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: -10 }
    };

    switch (activeSection) {
      case 'personal':
        return (
          <motion.div 
            key="personal"
            variants={variants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.3 }}
          >
            <PersonalInfoForm
              profile={profile}
              onChange={handleInputChange}
              errors={errors}
              validFields={validFields}
            />
          </motion.div>
        );
      case 'gym':
        return (
          <motion.div 
            key="gym"
            variants={variants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.3 }}
          >
            <GymInfoForm
              profile={profile}
              onChange={handleInputChange}
              errors={errors}
              validFields={validFields}
            />
          </motion.div>
        );
      case 'social':
        return (
          <motion.div 
            key="social"
            variants={variants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.3 }}
          >
            <SocialMediaForm
              profile={profile}
              onChange={handleInputChange}
              errors={errors}
              validFields={validFields}
            />
          </motion.div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex-1">
      <AnimatePresence mode="wait">
        {renderTabContent()}
      </AnimatePresence>
    </div>
  );
};
