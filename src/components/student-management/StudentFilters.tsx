
import React from 'react';
import { motion } from 'framer-motion';
import { Filter, Users, User, UserCheck, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toPersianNumbers } from '@/lib/utils/numbers';

interface StudentFiltersProps {
  activeFilter: 'all' | 'male' | 'female' | 'active';
  onFilterChange: (filter: 'all' | 'male' | 'female' | 'active') => void;
  studentCounts: {
    total: number;
    male: number;
    female: number;
    active: number;
  };
}

export const StudentFilters: React.FC<StudentFiltersProps> = ({
  activeFilter,
  onFilterChange,
  studentCounts
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-8"
    >
      <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg rounded-2xl p-6 shadow-lg border border-white/20 dark:border-slate-700/20">
        
        {/* Filter Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl student-gradient-secondary flex items-center justify-center">
            <Filter className="w-5 h-5 text-white" />
          </div>
          <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200">
            فیلتر شاگردان
          </h3>
        </div>

        {/* Filter Tabs */}
        <Tabs value={activeFilter} onValueChange={onFilterChange} className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-slate-100 dark:bg-slate-800 rounded-xl p-1">
            <TabsTrigger 
              value="all" 
              className="flex items-center gap-2 data-[state=active]:student-gradient-primary data-[state=active]:text-white rounded-lg transition-all duration-300"
            >
              <Users className="w-4 h-4" />
              <span className="hidden sm:inline">همه</span>
              <Badge variant="secondary" className="bg-white/20 text-current border-0">
                {toPersianNumbers(studentCounts.total)}
              </Badge>
            </TabsTrigger>
            
            <TabsTrigger 
              value="male" 
              className="flex items-center gap-2 data-[state=active]:student-gradient-primary data-[state=active]:text-white rounded-lg transition-all duration-300"
            >
              <User className="w-4 h-4" />
              <span className="hidden sm:inline">آقایان</span>
              <Badge variant="secondary" className="bg-white/20 text-current border-0">
                {toPersianNumbers(studentCounts.male)}
              </Badge>
            </TabsTrigger>
            
            <TabsTrigger 
              value="female" 
              className="flex items-center gap-2 data-[state=active]:student-gradient-primary data-[state=active]:text-white rounded-lg transition-all duration-300"
            >
              <UserCheck className="w-4 h-4" />
              <span className="hidden sm:inline">بانوان</span>
              <Badge variant="secondary" className="bg-white/20 text-current border-0">
                {toPersianNumbers(studentCounts.female)}
              </Badge>
            </TabsTrigger>
            
            <TabsTrigger 
              value="active" 
              className="flex items-center gap-2 data-[state=active]:student-gradient-primary data-[state=active]:text-white rounded-lg transition-all duration-300"
            >
              <TrendingUp className="w-4 h-4" />
              <span className="hidden sm:inline">فعال</span>
              <Badge variant="secondary" className="bg-white/20 text-current border-0">
                {toPersianNumbers(studentCounts.active)}
              </Badge>
            </TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Quick Stats */}
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="text-center p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
            <p className="text-xs text-slate-600 dark:text-slate-400">کل شاگردان</p>
            <p className="text-lg font-bold student-text-gradient">
              {toPersianNumbers(studentCounts.total)}
            </p>
          </div>
          
          <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
            <p className="text-xs text-slate-600 dark:text-slate-400">آقایان</p>
            <p className="text-lg font-bold text-blue-600 dark:text-blue-400">
              {toPersianNumbers(studentCounts.male)}
            </p>
          </div>
          
          <div className="text-center p-3 bg-pink-50 dark:bg-pink-900/20 rounded-xl">
            <p className="text-xs text-slate-600 dark:text-slate-400">بانوان</p>
            <p className="text-lg font-bold text-pink-600 dark:text-pink-400">
              {toPersianNumbers(studentCounts.female)}
            </p>
          </div>
          
          <div className="text-center p-3 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl">
            <p className="text-xs text-slate-600 dark:text-slate-400">فعال</p>
            <p className="text-lg font-bold text-emerald-600 dark:text-emerald-400">
              {toPersianNumbers(studentCounts.active)}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
