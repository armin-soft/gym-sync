
import { ProfileHeader } from "@/components/trainer/ProfileHeader";
import { ProfileSidebar } from "@/components/trainer/ProfileSidebar";
import { ProfileForm } from "@/components/trainer/ProfileForm";
import { TrainerProfile } from "@/types/trainer";
import { useDeviceInfo } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

interface ProfileMainContentProps {
  profile: TrainerProfile;
  handleUpdate: (key: keyof TrainerProfile, value: string) => void;
  handleSave: () => void;
  errors: Partial<Record<keyof TrainerProfile, string>>;
  setErrors: React.Dispatch<React.SetStateAction<Partial<Record<keyof TrainerProfile, string>>>>;
  validFields: Partial<Record<keyof TrainerProfile, boolean>>;
  setValidFields: React.Dispatch<React.SetStateAction<Partial<Record<keyof TrainerProfile, boolean>>>>;
  activeSection: string;
  setActiveSection: React.Dispatch<React.SetStateAction<string>>;
  isSaving: boolean;
}

export const ProfileMainContent = ({
  profile,
  handleUpdate,
  handleSave,
  errors,
  setErrors,
  validFields,
  setValidFields,
  activeSection,
  setActiveSection,
  isSaving
}: ProfileMainContentProps) => {
  const deviceInfo = useDeviceInfo();

  return (
    <>
      {/* Header */}
      <ProfileHeader />

      {/* Main Content */}
      <div className={cn(
        "mt-8 grid gap-6",
        deviceInfo.isMobile 
          ? "grid-cols-1" 
          : "grid-cols-1 lg:grid-cols-[400px_1fr] xl:grid-cols-[440px_1fr]"
      )}>
        {/* Sidebar */}
        <ProfileSidebar
          profile={{
            image: profile.image,
            name: profile.name,
            phone: profile.phone
          }}
          onImageChange={(image) => handleUpdate('image', image)} 
          activeSection={activeSection}
          onTabChange={setActiveSection}
        />

        {/* Form */}
        <ProfileForm
          profile={profile}
          onUpdate={handleUpdate}
          onSave={handleSave}
          errors={errors}
          setErrors={setErrors}
          validFields={validFields}
          setValidFields={setValidFields}
          activeSection={activeSection}
          isSaving={isSaving}
        />
      </div>
    </>
  );
};
