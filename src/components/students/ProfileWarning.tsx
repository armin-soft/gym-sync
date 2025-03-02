
interface ProfileWarningProps {
  isProfileComplete: boolean;
  className?: string;
}

export const ProfileWarning = ({ isProfileComplete, className = "" }: ProfileWarningProps) => {
  if (isProfileComplete) return null;
  
  return (
    <div className={`bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-amber-950/30 dark:to-yellow-950/30 border border-amber-200 dark:border-amber-800/30 p-4 rounded-xl text-amber-800 dark:text-amber-300 text-sm ${className}`}>
      <p className="font-bold mb-1">تکمیل اطلاعات باشگاه</p>
      <p>برای دانلود و چاپ پروفایل شاگرد، لطفاً ابتدا اطلاعات باشگاه خود را در بخش پروفایل مربی تکمیل کنید.</p>
    </div>
  );
};
