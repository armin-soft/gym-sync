
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { AlertTriangle, ArrowRight } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';

export const ProfileCompletionAlert = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Alert variant="warning" className="bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800">
        <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-500" />
        <AlertTitle className="text-amber-800 dark:text-amber-400 mr-2">
          تکمیل پروفایل مربی
        </AlertTitle>
        <AlertDescription className="text-amber-700 dark:text-amber-300 mr-2">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 mt-1">
            <p>برای استفاده از تمام امکانات، لطفاً پروفایل مربی خود را تکمیل کنید.</p>
            <Button asChild variant="outline" size="sm" className="bg-amber-100 hover:bg-amber-200 border-amber-200 text-amber-900 w-fit">
              <Link to="/profile" className="flex items-center gap-1 text-xs">
                <span>تکمیل پروفایل</span>
                <ArrowRight className="h-3.5 w-3.5 mr-1" />
              </Link>
            </Button>
          </div>
        </AlertDescription>
      </Alert>
    </motion.div>
  );
};
