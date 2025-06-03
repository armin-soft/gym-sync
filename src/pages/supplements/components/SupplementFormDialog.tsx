
import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Supplement, Category } from "../hooks/useSupplementManagement";
import { Plus, X, Pill, Heart } from "lucide-react";

interface SupplementFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  supplement?: Supplement | null;
  categories: Category[];
  type: 'supplement' | 'vitamin';
  onSave: (data: any) => void;
}

export const SupplementFormDialog: React.FC<SupplementFormDialogProps> = ({
  open,
  onOpenChange,
  supplement,
  categories,
  type,
  onSave
}) => {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    dosage: '',
    timing: '',
    description: '',
    benefits: [] as string[],
    sideEffects: [] as string[]
  });
  const [newBenefit, setNewBenefit] = useState('');
  const [newSideEffect, setNewSideEffect] = useState('');

  useEffect(() => {
    if (supplement) {
      setFormData({
        name: supplement.name || '',
        category: supplement.category || '',
        dosage: supplement.dosage || '',
        timing: supplement.timing || '',
        description: supplement.description || '',
        benefits: supplement.benefits || [],
        sideEffects: supplement.sideEffects || []
      });
    } else {
      setFormData({
        name: '',
        category: '',
        dosage: '',
        timing: '',
        description: '',
        benefits: [],
        sideEffects: []
      });
    }
  }, [supplement, open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const dataToSave = {
      ...formData,
      type
    };
    
    if (supplement) {
      onSave(supplement.id, dataToSave);
    } else {
      onSave(dataToSave);
    }
    onOpenChange(false);
  };

  const addBenefit = () => {
    if (newBenefit.trim() && !formData.benefits.includes(newBenefit.trim())) {
      setFormData(prev => ({
        ...prev,
        benefits: [...prev.benefits, newBenefit.trim()]
      }));
      setNewBenefit('');
    }
  };

  const removeBenefit = (index: number) => {
    setFormData(prev => ({
      ...prev,
      benefits: prev.benefits.filter((_, i) => i !== index)
    }));
  };

  const addSideEffect = () => {
    if (newSideEffect.trim() && !formData.sideEffects.includes(newSideEffect.trim())) {
      setFormData(prev => ({
        ...prev,
        sideEffects: [...prev.sideEffects, newSideEffect.trim()]
      }));
      setNewSideEffect('');
    }
  };

  const removeSideEffect = (index: number) => {
    setFormData(prev => ({
      ...prev,
      sideEffects: prev.sideEffects.filter((_, i) => i !== index)
    }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange} dir="rtl">
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto" dir="rtl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3 text-xl">
            {type === 'supplement' ? (
              <Pill className="h-6 w-6 text-green-600" />
            ) : (
              <Heart className="h-6 w-6 text-purple-600" />
            )}
            {supplement ? 'ویرایش' : 'افزودن'} {type === 'supplement' ? 'مکمل' : 'ویتامین'}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">نام {type === 'supplement' ? 'مکمل' : 'ویتامین'}</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({...prev, name: e.target.value}))}
                placeholder={`نام ${type === 'supplement' ? 'مکمل' : 'ویتامین'} را وارد کنید`}
                required
                className="text-right"
                dir="rtl"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">دسته‌بندی</Label>
              <Select value={formData.category} onValueChange={(value) => setFormData(prev => ({...prev, category: value}))}>
                <SelectTrigger className="text-right" dir="rtl">
                  <SelectValue placeholder="انتخاب دسته‌بندی" />
                </SelectTrigger>
                <SelectContent dir="rtl">
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.name}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Dosage and Timing */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="dosage">دوز مصرف</Label>
              <Input
                id="dosage"
                value={formData.dosage}
                onChange={(e) => setFormData(prev => ({...prev, dosage: e.target.value}))}
                placeholder="مثال: ۳۰ گرم، ۲ قرص"
                className="text-right"
                dir="rtl"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="timing">زمان مصرف</Label>
              <Input
                id="timing"
                value={formData.timing}
                onChange={(e) => setFormData(prev => ({...prev, timing: e.target.value}))}
                placeholder="مثال: بعد از تمرین، با صبحانه"
                className="text-right"
                dir="rtl"
              />
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">توضیحات</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({...prev, description: e.target.value}))}
              placeholder="توضیحات کامل در مورد این مکمل..."
              className="text-right min-h-[100px]"
              dir="rtl"
            />
          </div>

          {/* Benefits */}
          <div className="space-y-3">
            <Label>فواید و مزایا</Label>
            <div className="flex gap-2">
              <Input
                value={newBenefit}
                onChange={(e) => setNewBenefit(e.target.value)}
                placeholder="فایده جدید اضافه کنید"
                className="text-right"
                dir="rtl"
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addBenefit())}
              />
              <Button type="button" onClick={addBenefit} variant="outline" size="sm">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            {formData.benefits.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {formData.benefits.map((benefit, index) => (
                  <Badge key={index} variant="outline" className="bg-green-50 text-green-700 border-green-200">
                    {benefit}
                    <button
                      type="button"
                      onClick={() => removeBenefit(index)}
                      className="mr-1 hover:text-green-900"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            )}
          </div>

          {/* Side Effects */}
          <div className="space-y-3">
            <Label>عوارض جانبی و نکات مهم</Label>
            <div className="flex gap-2">
              <Input
                value={newSideEffect}
                onChange={(e) => setNewSideEffect(e.target.value)}
                placeholder="نکته مهم اضافه کنید"
                className="text-right"
                dir="rtl"
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSideEffect())}
              />
              <Button type="button" onClick={addSideEffect} variant="outline" size="sm">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            {formData.sideEffects.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {formData.sideEffects.map((effect, index) => (
                  <Badge key={index} variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">
                    {effect}
                    <button
                      type="button"
                      onClick={() => removeSideEffect(index)}
                      className="mr-1 hover:text-orange-900"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            )}
          </div>

          {/* Submit Buttons */}
          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              انصراف
            </Button>
            <Button 
              type="submit"
              className={`${
                type === 'supplement' 
                  ? 'bg-gradient-to-l from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700' 
                  : 'bg-gradient-to-l from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700'
              } text-white`}
            >
              {supplement ? 'ویرایش' : 'افزودن'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
