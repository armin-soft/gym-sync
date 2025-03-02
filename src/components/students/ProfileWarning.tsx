
interface ProfileWarningProps {
  isProfileComplete: boolean;
  className?: string;
}

export const ProfileWarning = ({ isProfileComplete, className = "" }: ProfileWarningProps) => {
  if (isProfileComplete) return null;
  
  return (
    <div className={`bg-amber-50 border border-amber-200 p-3 rounded-md text-amber-700 text-sm ${className}`}>
      <p className="font-bold mb-1">تکمیل اطلاعات باشگاه</p>
      <p>برای دانلود پروفایل شاگرد، لطفاً ابتدا اطلاعات باشگاه خود را در بخش پروفایل مربی تکمیل کنید.</p>
    </div>
  );
};
