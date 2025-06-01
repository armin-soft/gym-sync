
export const getSectionConfig = (activeSection: string) => {
  const configs = {
    personal: {
      title: 'اطلاعات شخصی',
      description: 'اطلاعات شخصی خود را کامل کنید',
      gradient: 'from-violet-500 to-purple-600'
    },
    gym: {
      title: 'اطلاعات باشگاه',
      description: 'اطلاعات باشگاه خود را وارد کنید',
      gradient: 'from-blue-500 to-cyan-600'
    },
    social: {
      title: 'شبکه‌های اجتماعی',
      description: 'حضور آنلاین خود را مدیریت کنید',
      gradient: 'from-emerald-500 to-teal-600'
    }
  };
  
  return configs[activeSection as keyof typeof configs] || configs.personal;
};
