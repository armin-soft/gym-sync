
import React from "react";

interface CardContentProps {
  title: string;
  subtitle: string;
  description: string;
}

export const CardContent: React.FC<CardContentProps> = ({ title, subtitle, description }) => {
  return (
    <div className="text-center space-y-4 mb-8">
      <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
        {title}
      </h2>
      <p className="text-lg text-blue-600 dark:text-blue-400 font-semibold">
        {subtitle}
      </p>
      <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
        {description}
      </p>
    </div>
  );
};
