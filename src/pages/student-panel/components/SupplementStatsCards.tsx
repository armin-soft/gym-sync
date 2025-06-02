
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Pill, Heart, Shield } from 'lucide-react';
import { toPersianNumbers } from '@/lib/utils/numbers';

interface SupplementStatsCardsProps {
  supplementCount: number;
  vitaminCount: number;
  totalCount: number;
}

export const SupplementStatsCards: React.FC<SupplementStatsCardsProps> = ({
  supplementCount,
  vitaminCount,
  totalCount,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card className="bg-gradient-to-br from-pink-50 to-rose-50 dark:from-pink-900/20 dark:to-rose-900/20 border-pink-200 dark:border-pink-800">
        <CardContent className="p-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Pill className="h-5 w-5 text-pink-600" />
            <span className="font-medium text-pink-800 dark:text-pink-200">مکمل‌ها</span>
          </div>
          <p className="text-2xl font-bold text-pink-600">{toPersianNumbers(supplementCount)}</p>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-purple-50 to-violet-50 dark:from-purple-900/20 dark:to-violet-900/20 border-purple-200 dark:border-purple-800">
        <CardContent className="p-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Heart className="h-5 w-5 text-purple-600" />
            <span className="font-medium text-purple-800 dark:text-purple-200">ویتامین‌ها</span>
          </div>
          <p className="text-2xl font-bold text-purple-600">{toPersianNumbers(vitaminCount)}</p>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-indigo-900/20 dark:to-blue-900/20 border-indigo-200 dark:border-indigo-800">
        <CardContent className="p-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Shield className="h-5 w-5 text-indigo-600" />
            <span className="font-medium text-indigo-800 dark:text-indigo-200">کل آیتم‌ها</span>
          </div>
          <p className="text-2xl font-bold text-indigo-600">{toPersianNumbers(totalCount)}</p>
        </CardContent>
      </Card>
    </div>
  );
};
