
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Pill, Heart } from 'lucide-react';

interface SupplementCardProps {
  supplement: any;
  index: number;
  type: 'supplement' | 'vitamin';
}

export const SupplementCard: React.FC<SupplementCardProps> = ({
  supplement,
  index,
  type,
}) => {
  const isVitamin = type === 'vitamin';
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <Card className={`${
        isVitamin 
          ? 'bg-gradient-to-r from-purple-50 to-violet-50 dark:from-purple-900/20 dark:to-violet-900/20 border-purple-200 dark:border-purple-700'
          : 'bg-gradient-to-r from-pink-50 to-rose-50 dark:from-pink-900/20 dark:to-rose-900/20 border-pink-200 dark:border-pink-700'
      } hover:shadow-lg transition-shadow`}>
        <CardContent className="p-4">
          <div className="flex items-center gap-3 mb-3">
            <div className={`p-2 ${
              isVitamin 
                ? 'bg-gradient-to-r from-purple-500 to-violet-500'
                : 'bg-gradient-to-r from-pink-500 to-rose-500'
            } rounded-lg`}>
              {isVitamin ? (
                <Heart className="h-5 w-5 text-white" />
              ) : (
                <Pill className="h-5 w-5 text-white" />
              )}
            </div>
            <div>
              <h4 className={`font-bold ${
                isVitamin 
                  ? 'text-purple-800 dark:text-purple-200'
                  : 'text-pink-800 dark:text-pink-200'
              }`}>
                {supplement.name}
              </h4>
              {supplement.category && (
                <Badge variant="secondary" className="text-xs">
                  {supplement.category}
                </Badge>
              )}
            </div>
          </div>
          {supplement.description && (
            <p className="text-sm text-gray-600 dark:text-gray-300">
              {supplement.description}
            </p>
          )}
          {supplement.dosage && (
            <div className={`mt-2 p-2 ${
              isVitamin 
                ? 'bg-purple-100 dark:bg-purple-900/30'
                : 'bg-pink-100 dark:bg-pink-900/30'
            } rounded-lg`}>
              <p className={`text-xs ${
                isVitamin 
                  ? 'text-purple-700 dark:text-purple-300'
                  : 'text-pink-700 dark:text-pink-300'
              }`}>
                <strong>دوز مصرف:</strong> {supplement.dosage}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};
