
import { createContext, useContext, ReactNode } from 'react';
import { TrainerProfile } from '@/types/trainer';

interface FormContextType {
  profile: TrainerProfile;
  onUpdate: (key: keyof TrainerProfile, value: string) => void;
  errors: Partial<Record<keyof TrainerProfile, string>>;
  setErrors: React.Dispatch<React.SetStateAction<Partial<Record<keyof TrainerProfile, string>>>>;
  validFields: Partial<Record<keyof TrainerProfile, boolean>>;
  setValidFields: React.Dispatch<React.SetStateAction<Partial<Record<keyof TrainerProfile, boolean>>>>;
  activeSection: string;
  isSaving: boolean;
}

const FormContext = createContext<FormContextType | undefined>(undefined);

interface FormProviderProps {
  children: ReactNode;
  profile: TrainerProfile;
  onUpdate: (key: keyof TrainerProfile, value: string) => void;
  errors: Partial<Record<keyof TrainerProfile, string>>;
  setErrors: React.Dispatch<React.SetStateAction<Partial<Record<keyof TrainerProfile, string>>>>;
  validFields: Partial<Record<keyof TrainerProfile, boolean>>;
  setValidFields: React.Dispatch<React.SetStateAction<Partial<Record<keyof TrainerProfile, boolean>>>>;
  activeSection: string;
  isSaving: boolean;
}

export const FormProvider = ({ 
  children, 
  profile, 
  onUpdate, 
  errors, 
  setErrors, 
  validFields, 
  setValidFields, 
  activeSection, 
  isSaving 
}: FormProviderProps) => {
  return (
    <FormContext.Provider value={{
      profile,
      onUpdate,
      errors,
      setErrors,
      validFields,
      setValidFields,
      activeSection,
      isSaving
    }}>
      {children}
    </FormContext.Provider>
  );
};

export const useFormContext = () => {
  const context = useContext(FormContext);
  if (context === undefined) {
    throw new Error('useFormContext must be used within a FormProvider');
  }
  return context;
};
