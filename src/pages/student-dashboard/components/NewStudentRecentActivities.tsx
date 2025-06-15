import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dumbbell, Apple, Pill, TrendingUp, Clock } from "lucide-react";

const ActivityIcon = React.memo(({ type }: { type: string }) => {
  const icons = {
    workout: Dumbbell,
    meal: Apple,
    supplement: Pill,
    progress: TrendingUp
  };
  
  const Icon = icons[type as keyof typeof icons] || Clock;
  return <Icon className="w-5 h-5 text-white" />;
});

const ActivityItem = React.memo(({ activity, index }: any) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay: index * 0.1, duration: 0.5 }}
    className="flex items-start gap-4 p-4 rounded-xl bg-gradient-to-r from-white/50 to-white/30 dark:from-slate-800/50 dark:to-slate-800/30 backdrop-blur-sm border border-white/20"
  >
    <div className={`p-2 rounded-lg flex-shrink-0 ${
      activity.type === 'workout' ? 'bg-blue-500' :
      activity.type === 'meal' ? 'bg-green-500' :
      activity.type === 'supplement' ? 'bg-purple-500' : 'bg-orange-500'
    }`}>
      <ActivityIcon type={activity.type} />
    </div>
    
    <div className="flex-1 min-w-0">
      <div className="flex items-center justify-between mb-1">
        <h4 className="text-sm font-semibold text-gray-900 dark:text-white truncate">
          {activity.title}
        </h4>
        <Badge 
          variant={activity.status === 'completed' ? 'default' : 'secondary'}
          className="text-xs flex-shrink-0"
        >
          {activity.status === 'completed' ? 'تکمیل' : 
           activity.status === 'pending' ? 'در انتظار' : 'عقب‌مانده'}
        </Badge>
      </div>
      <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">
        {activity.description}
      </p>
      <p className="text-2xs text-gray-500 dark:text-gray-500">
        {activity.time}
      </p>
    </div>
  </motion.div>
));

interface NewStudentRecentActivitiesProps {
  activities: any[];
}

export const NewStudentRecentActivities: React.FC<NewStudentRecentActivitiesProps> = React.memo(({ activities }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Card className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border-white/20 shadow-lg h-full">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
            <div className="p-2 rounded-lg bg-gradient-to-r from-green-500 to-emerald-500">
              <Clock className="w-5 h-5 text-white" />
            </div>
            فعالیت‌های اخیر
          </CardTitle>
        </CardHeader>
        <CardContent>
          {activities.length > 0 ? (
            <div className="space-y-3">
              {activities.map((activity, index) => (
                <ActivityItem 
                  key={activity.id} 
                  activity={activity} 
                  index={index} 
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              <Clock className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p className="text-sm">هنوز فعالیتی ثبت نشده است</p>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
});

NewStudentRecentActivities.displayName = "NewStudentRecentActivities";
