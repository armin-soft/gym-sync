
import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Clock, CheckCircle, AlertCircle, Calendar, 
  Dumbbell, Apple, Pill, TrendingUp, 
  ArrowRight, Activity
} from "lucide-react";
import { toPersianNumbers } from "@/lib/utils/numbers";

interface ActivityItem {
  id: string;
  type: 'workout' | 'meal' | 'supplement' | 'progress';
  title: string;
  description: string;
  time: string;
  status: 'completed' | 'pending' | 'missed';
  value?: number;
}

interface NewStudentRecentActivitiesProps {
  activities: ActivityItem[];
}

export const NewStudentRecentActivities: React.FC<NewStudentRecentActivitiesProps> = ({ activities }) => {
  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'workout': return Dumbbell;
      case 'meal': return Apple;
      case 'supplement': return Pill;
      case 'progress': return TrendingUp;
      default: return Activity;
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'workout': return {
        gradient: 'from-emerald-500 to-teal-500',
        bg: 'from-emerald-50 to-teal-50 dark:from-emerald-950/20 dark:to-teal-950/20',
        border: 'border-emerald-200 dark:border-emerald-800'
      };
      case 'meal': return {
        gradient: 'from-blue-500 to-indigo-500',
        bg: 'from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20',
        border: 'border-blue-200 dark:border-blue-800'
      };
      case 'supplement': return {
        gradient: 'from-purple-500 to-pink-500',
        bg: 'from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20',
        border: 'border-purple-200 dark:border-purple-800'
      };
      case 'progress': return {
        gradient: 'from-orange-500 to-red-500',
        bg: 'from-orange-50 to-red-50 dark:from-orange-950/20 dark:to-red-950/20',
        border: 'border-orange-200 dark:border-orange-800'
      };
      default: return {
        gradient: 'from-gray-500 to-gray-600',
        bg: 'from-gray-50 to-gray-100 dark:from-gray-950/20 dark:to-gray-900/20',
        border: 'border-gray-200 dark:border-gray-800'
      };
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return (
          <Badge className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300 border-green-200">
            <CheckCircle className="w-3 h-3 ml-1" />
            تکمیل شده
          </Badge>
        );
      case "pending":
        return (
          <Badge className="bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300 border-yellow-200">
            <Clock className="w-3 h-3 ml-1" />
            در انتظار
          </Badge>
        );
      case "missed":
        return (
          <Badge className="bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300 border-red-200">
            <AlertCircle className="w-3 h-3 ml-1" />
            از دست رفته
          </Badge>
        );
      default:
        return null;
    }
  };

  return (
    <Card className="border-0 shadow-xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <Clock className="h-5 w-5 text-white" />
            </div>
            <span className="text-2xl font-black">فعالیت‌های اخیر</span>
          </div>
          <Badge className="bg-white/20 text-white border-white/30">
            {toPersianNumbers(activities.length.toString())} فعالیت
          </Badge>
        </CardTitle>
      </CardHeader>

      <CardContent className="p-8">
        {activities.length > 0 ? (
          <div className="space-y-4">
            {activities.map((activity, index) => {
              const Icon = getActivityIcon(activity.type);
              const colors = getActivityColor(activity.type);
              
              return (
                <motion.div
                  key={activity.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className={`group relative overflow-hidden rounded-2xl p-6 bg-gradient-to-r ${colors.bg} border ${colors.border} hover:shadow-lg transition-all duration-300 cursor-pointer`}
                >
                  <div className="flex items-start gap-5">
                    {/* Icon */}
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${colors.gradient} flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform flex-shrink-0`}>
                      <Icon className="h-7 w-7 text-white" />
                    </div>
                    
                    {/* Content */}
                    <div className="flex-1 space-y-3">
                      <div className="flex items-center justify-between">
                        <h3 className="font-bold text-lg text-gray-900 dark:text-white">
                          {activity.title}
                        </h3>
                        {getStatusBadge(activity.status)}
                      </div>
                      
                      <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                        {activity.description}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                          <Calendar className="w-4 h-4" />
                          {activity.time}
                        </div>
                        
                        {activity.value && (
                          <div className="flex items-center gap-2">
                            <span className="text-lg font-bold text-gray-900 dark:text-white">
                              {toPersianNumbers(activity.value.toString())}
                            </span>
                            <ArrowRight className="w-4 h-4 text-gray-400 group-hover:translate-x-1 transition-transform" />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Background decoration */}
                  <div className="absolute -top-4 -right-4 w-20 h-20 bg-white/10 rounded-full blur-2xl" />
                  <div className="absolute -bottom-2 -left-2 w-12 h-12 bg-white/5 rounded-full blur-lg" />
                </motion.div>
              );
            })}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="w-24 h-24 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 flex items-center justify-center">
              <Activity className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              هنوز فعالیتی ثبت نشده
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              وقتی شروع به تمرین یا ثبت وعده‌های غذایی کنید، فعالیت‌هایتان اینجا نمایش داده می‌شود
            </p>
            <Button className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white">
              شروع اولین فعالیت
            </Button>
          </motion.div>
        )}
        
        {activities.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700 text-center"
          >
            <Button variant="outline" className="hover:bg-gray-50 dark:hover:bg-gray-800">
              مشاهده تمام فعالیت‌ها
              <ArrowRight className="w-4 h-4 mr-2" />
            </Button>
          </motion.div>
        )}
      </CardContent>
    </Card>
  );
};
