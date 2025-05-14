
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useDeviceInfo } from '@/hooks/use-mobile';
import { Plus, Users, Dumbbell, Pill } from 'lucide-react';

export const QuickActions: React.FC = () => {
  const deviceInfo = useDeviceInfo();

  // Quick actions for common tasks
  const quickActions = [
    {
      label: 'افزودن شاگرد',
      icon: Plus,
      href: '/Students',
      color: 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700',
      iconColor: 'text-white'
    },
    {
      label: 'لیست شاگردان',
      icon: Users,
      href: '/Students',
      color: 'bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700',
      iconColor: 'text-white'
    },
    {
      label: 'برنامه تمرینی',
      icon: Dumbbell,
      href: '/Exercise-Movements',
      color: 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700',
      iconColor: 'text-white'
    },
    {
      label: 'مکمل‌ها',
      icon: Pill,
      href: '/Supplements-Vitamins',
      color: 'bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700',
      iconColor: 'text-white'
    }
  ];

  // Animation variants for staggered appearance
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0 }
  };

  // Determine how many buttons to show based on device
  const displayActions = deviceInfo.isMobile ? quickActions.slice(0, 3) : quickActions;

  return (
    <div className="px-2 sm:px-4">
      <motion.div
        className="flex justify-between items-center mb-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-lg font-medium">دسترسی سریع</h2>
      </motion.div>
      
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="flex gap-3 overflow-x-auto pb-2 scrollbar-none"
      >
        {displayActions.map((action) => (
          <motion.div key={action.label} variants={item} className="flex-shrink-0">
            <Button
              asChild
              className={`${action.color} text-white shadow-md hover:shadow-lg min-w-24 h-10`}
            >
              <Link to={action.href} className="flex items-center gap-1.5">
                <action.icon className={`${action.iconColor} h-4 w-4`} />
                {action.label}
              </Link>
            </Button>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};
