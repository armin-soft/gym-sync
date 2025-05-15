
import React from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";

interface FormInfoSectionProps {
  active: boolean;
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
  age: string;
  setAge: React.Dispatch<React.SetStateAction<string>>;
  height: string;
  setHeight: React.Dispatch<React.SetStateAction<string>>;
  weight: string;
  setWeight: React.Dispatch<React.SetStateAction<string>>;
  wrist: string;
  setWrist: React.Dispatch<React.SetStateAction<string>>;
  phone: string;
  setPhone: React.Dispatch<React.SetStateAction<string>>;
  goal: string;
  setGoal: React.Dispatch<React.SetStateAction<string>>;
}

export const FormInfoSection: React.FC<FormInfoSectionProps> = ({
  active,
  name,
  setName,
  age,
  setAge,
  height,
  setHeight,
  weight,
  setWeight,
  wrist,
  setWrist,
  phone,
  setPhone,
  goal,
  setGoal,
}) => {
  if (!active) return null;

  return (
    <Card className="flex-1 overflow-y-auto p-6">
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name">نام و نام خانوادگی</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="نام و نام خانوادگی"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="phone">شماره تماس</Label>
            <Input
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="شماره تماس"
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="age">سن</Label>
            <Input
              id="age"
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              placeholder="سن"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="height">قد (سانتی‌متر)</Label>
            <Input
              id="height"
              type="number"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              placeholder="قد به سانتی‌متر"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="weight">وزن (کیلوگرم)</Label>
            <Input
              id="weight"
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              placeholder="وزن به کیلوگرم"
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="wrist">دور مچ (سانتی‌متر)</Label>
          <Input
            id="wrist"
            type="number"
            value={wrist}
            onChange={(e) => setWrist(e.target.value)}
            placeholder="دور مچ به سانتی‌متر"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="goal">هدف</Label>
          <Textarea
            id="goal"
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            placeholder="هدف شاگرد"
            rows={4}
          />
        </div>
      </div>
    </Card>
  );
};
