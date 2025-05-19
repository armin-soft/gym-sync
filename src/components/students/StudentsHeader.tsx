
import React from 'react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { UserPlus } from 'lucide-react';

interface StudentsHeaderProps {
  onAddStudent: () => void;
}

export const StudentsHeader: React.FC<StudentsHeaderProps> = ({ onAddStudent }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col sm:flex-row justify-between items-center mb-6"
    >
      <motion.h1 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
        className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent"
      >
        مدیریت شاگردان
      </motion.h1>
      
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Button 
          onClick={onAddStudent}
          className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white shadow-md hover:shadow-lg transition-all duration-300"
        >
          <UserPlus className="ml-2 h-5 w-5" />
          افزودن شاگرد جدید
        </Button>
      </motion.div>
    </motion.div>
  );
};
