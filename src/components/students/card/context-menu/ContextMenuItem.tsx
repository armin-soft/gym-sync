
import React from 'react';
import { ContextMenuItem } from '@/components/ui/context-menu';
import { motion } from 'framer-motion';

interface ContextMenuItemWithAnimationProps {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  onClick: () => void;
  index: number;
  variant?: 'purple' | 'blue' | 'green' | 'red' | 'orange' | 'indigo';
}

export const ContextMenuItemWithAnimation: React.FC<ContextMenuItemWithAnimationProps> = ({
  icon,
  title,
  subtitle,
  onClick,
  index,
  variant = 'blue'
}) => {
  // Define variant colors
  const getVariantClasses = () => {
    switch (variant) {
      case 'purple':
        return {
          icon: 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400',
          hover: 'hover:bg-purple-50 dark:hover:bg-purple-900/20',
          text: 'group-hover:text-purple-600 dark:group-hover:text-purple-400'
        };
      case 'blue':
        return {
          icon: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400',
          hover: 'hover:bg-blue-50 dark:hover:bg-blue-900/20',
          text: 'group-hover:text-blue-600 dark:group-hover:text-blue-400'
        };
      case 'green':
        return {
          icon: 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400',
          hover: 'hover:bg-green-50 dark:hover:bg-green-900/20',
          text: 'group-hover:text-green-600 dark:group-hover:text-green-400'
        };
      case 'red':
        return {
          icon: 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400',
          hover: 'hover:bg-red-50 dark:hover:bg-red-900/20',
          text: 'group-hover:text-red-600 dark:group-hover:text-red-400'
        };
      case 'orange':
        return {
          icon: 'bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400',
          hover: 'hover:bg-orange-50 dark:hover:bg-orange-900/20',
          text: 'group-hover:text-orange-600 dark:group-hover:text-orange-400'
        };
      case 'indigo':
        return {
          icon: 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400',
          hover: 'hover:bg-indigo-50 dark:hover:bg-indigo-900/20',
          text: 'group-hover:text-indigo-600 dark:group-hover:text-indigo-400'
        };
      default:
        return {
          icon: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400',
          hover: 'hover:bg-blue-50 dark:hover:bg-blue-900/20',
          text: 'group-hover:text-blue-600 dark:group-hover:text-blue-400'
        };
    }
  };
  
  const { icon: iconClass, hover: hoverClass, text: textClass } = getVariantClasses();

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ 
        opacity: 1, 
        x: 0,
        transition: { delay: index * 0.05, duration: 0.2 } 
      }}
      whileHover={{ x: 3 }}
      whileTap={{ scale: 0.98 }}
    >
      <ContextMenuItem 
        onClick={onClick}
        className={`flex items-center gap-3 p-2 cursor-pointer rounded-lg transition-all duration-200 group ${hoverClass}`}
      >
        <span className={`flex-shrink-0 p-1.5 rounded-md shadow-sm ${iconClass}`}>
          {icon}
        </span>
        <div>
          <div className={`text-sm font-medium text-slate-700 dark:text-slate-200 ${textClass}`}>
            {title}
          </div>
          <div className="text-xs text-slate-500 dark:text-slate-400">
            {subtitle}
          </div>
        </div>
      </ContextMenuItem>
    </motion.div>
  );
};
