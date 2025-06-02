
import React from 'react';
import { Pill, Heart } from 'lucide-react';

interface EmptySupplementStateProps {
  type: 'supplement' | 'vitamin';
}

export const EmptySupplementState: React.FC<EmptySupplementStateProps> = ({ type }) => {
  const isVitamin = type === 'vitamin';
  
  return (
    <div className="text-center py-12">
      {isVitamin ? (
        <Heart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
      ) : (
        <Pill className="h-16 w-16 text-gray-300 mx-auto mb-4" />
      )}
      <h3 className="text-lg font-medium text-gray-500 dark:text-gray-400 mb-2">
        هیچ {isVitamin ? 'ویتامینی' : 'مکملی'} تعیین نشده
      </h3>
      <p className="text-gray-400 dark:text-gray-500">
        مربی شما هنوز {isVitamin ? 'ویتامینی' : 'مکملی'} برای شما تعیین نکرده است
      </p>
    </div>
  );
};
