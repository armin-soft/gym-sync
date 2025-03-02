
import React from "react";
import { Card } from "@/components/ui/card";
import { UserRound, Trophy, Scale, LineChart } from "lucide-react";
import { toPersianNumbers } from "@/lib/utils/numbers";

interface Student {
  id: number;
  name: string;
  phone: string;
  height: string;
  weight: string;
  image: string;
  payment?: string;
  exercises?: number[];
  meals?: number[];
  supplements?: number[];
  vitamins?: number[];
}

interface StudentStatsCardsProps {
  students: Student[];
}

export const StudentStatsCards = ({ students }: StudentStatsCardsProps) => {
  const averageWeight = Math.round(
    students.reduce((acc, student) => acc + Number(student.weight), 0) /
    (students.length || 1)
  );

  const averageHeight = Math.round(
    students.reduce((acc, student) => acc + Number(student.height), 0) /
    (students.length || 1)
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card className="p-6 backdrop-blur-xl bg-white/50 border-primary/10 transition-all duration-300 hover:shadow-lg hover:bg-white/60 animate-fade-in">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-blue-100 flex items-center justify-center text-white shadow-lg shadow-blue-500/25 animate-fade-in">
            <UserRound className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">کل شاگردان</p>
            <p className="text-2xl font-bold">{toPersianNumbers(students.length)}</p>
          </div>
        </div>
      </Card>
      
      <Card className="p-6 backdrop-blur-xl bg-white/50 border-primary/10 transition-all duration-300 hover:shadow-lg hover:bg-white/60 animate-fade-in [animation-delay:200ms]">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-green-100 flex items-center justify-center text-white shadow-lg shadow-green-500/25 animate-fade-in">
            <Trophy className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">شاگردان فعال</p>
            <p className="text-2xl font-bold">{toPersianNumbers(students.length)}</p>
          </div>
        </div>
      </Card>
      
      <Card className="p-6 backdrop-blur-xl bg-white/50 border-primary/10 transition-all duration-300 hover:shadow-lg hover:bg-white/60 animate-fade-in [animation-delay:400ms]">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-purple-100 flex items-center justify-center text-white shadow-lg shadow-purple-500/25 animate-fade-in">
            <Scale className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">میانگین وزن</p>
            <p className="text-2xl font-bold">
              {toPersianNumbers(averageWeight)}
            </p>
          </div>
        </div>
      </Card>
      
      <Card className="p-6 backdrop-blur-xl bg-white/50 border-primary/10 transition-all duration-300 hover:shadow-lg hover:bg-white/60 animate-fade-in [animation-delay:600ms]">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-orange-100 flex items-center justify-center text-white shadow-lg shadow-orange-500/25 animate-fade-in">
            <LineChart className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">میانگین قد</p>
            <p className="text-2xl font-bold">
              {toPersianNumbers(averageHeight)}
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};
