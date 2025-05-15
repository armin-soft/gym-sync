
import React from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="name">نام</Label>
          <Input
            id="name"
            placeholder="نام شاگرد"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="phone">شماره تماس</Label>
          <Input
            id="phone"
            placeholder="شماره تماس"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="age">سن</Label>
          <Input
            id="age"
            type="number"
            placeholder="سن"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="height">قد (سانتی‌متر)</Label>
          <Input
            id="height"
            type="number"
            placeholder="قد (سانتی‌متر)"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="weight">وزن (کیلوگرم)</Label>
          <Input
            id="weight"
            type="number"
            placeholder="وزن (کیلوگرم)"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="wrist">دور مچ دست (سانتی‌متر)</Label>
          <Input
            id="wrist"
            type="text"
            placeholder="دور مچ دست (سانتی‌متر)"
            value={wrist}
            onChange={(e) => setWrist(e.target.value)}
          />
        </div>
        
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="goal">هدف</Label>
          <Textarea
            id="goal"
            placeholder="هدف شاگرد"
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            className="h-32 resize-none"
          />
        </div>
      </div>
    </Card>
  );
};
