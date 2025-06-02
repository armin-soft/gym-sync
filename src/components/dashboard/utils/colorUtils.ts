
export const getColorClasses = (color: string) => {
  const colorMap: { [key: string]: { bg: string; border: string; icon: string; } } = {
    emerald: {
      bg: "from-emerald-50 to-emerald-100/50 dark:from-emerald-950/30 dark:to-emerald-900/20",
      border: "border-emerald-200/50 dark:border-emerald-800/50",
      icon: "from-emerald-500 to-emerald-600"
    },
    sky: {
      bg: "from-sky-50 to-sky-100/50 dark:from-sky-950/30 dark:to-sky-900/20",
      border: "border-sky-200/50 dark:border-sky-800/50",
      icon: "from-sky-500 to-sky-600"
    },
    orange: {
      bg: "from-orange-50 to-orange-100/50 dark:from-orange-950/30 dark:to-orange-900/20",
      border: "border-orange-200/50 dark:border-orange-800/50",
      icon: "from-orange-500 to-orange-600"
    },
    purple: {
      bg: "from-purple-50 to-purple-100/50 dark:from-purple-950/30 dark:to-purple-900/20",
      border: "border-purple-200/50 dark:border-purple-800/50",
      icon: "from-purple-500 to-purple-600"
    },
    pink: {
      bg: "from-pink-50 to-pink-100/50 dark:from-pink-950/30 dark:to-pink-900/20",
      border: "border-pink-200/50 dark:border-pink-800/50",
      icon: "from-pink-500 to-pink-600"
    },
    indigo: {
      bg: "from-indigo-50 to-indigo-100/50 dark:from-indigo-950/30 dark:to-indigo-900/20",
      border: "border-indigo-200/50 dark:border-indigo-800/50",
      icon: "from-indigo-500 to-indigo-600"
    }
  };
  return colorMap[color];
};
