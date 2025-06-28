
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Database, Users, Dumbbell, UtensilsCrossed, Pill } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

export const DatabaseStatsCards = () => {
  const [stats, setStats] = useState({
    students: 0,
    exercises: 0,
    meals: 0,
    supplements: 0,
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const [studentsRes, exercisesRes, mealsRes, supplementsRes] = await Promise.all([
        supabase.from('students').select('*', { count: 'exact', head: true }),
        supabase.from('exercises').select('*', { count: 'exact', head: true }),
        supabase.from('meals').select('*', { count: 'exact', head: true }),
        supabase.from('supplements').select('*', { count: 'exact', head: true }),
      ]);

      setStats({
        students: studentsRes.count || 0,
        exercises: exercisesRes.count || 0,
        meals: mealsRes.count || 0,
        supplements: supplementsRes.count || 0,
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const statsCards = [
    {
      title: "شاگردان",
      value: stats.students,
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "تمرینات",
      value: stats.exercises,
      icon: Dumbbell,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "وعده‌های غذایی",
      value: stats.meals,
      icon: UtensilsCrossed,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
    {
      title: "مکمل‌ها",
      value: stats.supplements,
      icon: Pill,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {statsCards.map((stat, index) => (
        <Card key={index}>
          <CardContent className="flex items-center p-6">
            <div className={`rounded-full p-3 ${stat.bgColor} ml-4`}>
              <stat.icon className={`h-6 w-6 ${stat.color}`} />
            </div>
            <div>
              <p className="text-2xl font-bold">{stat.value}</p>
              <p className="text-muted-foreground text-sm">{stat.title}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
