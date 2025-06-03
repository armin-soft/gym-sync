
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Plus, Search, Pill, Heart } from "lucide-react";
import { SupplementCard } from "./SupplementCard";
import { Supplement } from "../hooks/useSupplementManagement";
import { toPersianNumbers } from "@/lib/utils/numbers";

interface SupplementGridProps {
  supplements: Supplement[];
  onAddSupplement: () => void;
  onEditSupplement: (supplement: Supplement) => void;
  onDeleteSupplement: (id: number) => void;
  type: 'supplement' | 'vitamin';
}

export const SupplementGrid: React.FC<SupplementGridProps> = ({
  supplements,
  onAddSupplement,
  onEditSupplement,
  onDeleteSupplement,
  type
}) => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredSupplements = supplements.filter(supplement =>
    supplement.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    supplement.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (supplement.description && supplement.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <Card className="bg-white/90 backdrop-blur-lg border-0 shadow-xl rounded-2xl overflow-hidden" dir="rtl">
      <div className="p-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className={`p-3 rounded-xl shadow-lg ${
              type === 'supplement' 
                ? 'bg-gradient-to-l from-green-500 to-emerald-600' 
                : 'bg-gradient-to-l from-purple-500 to-pink-600'
            }`}>
              {type === 'supplement' ? (
                <Pill className="h-6 w-6 text-white" />
              ) : (
                <Heart className="h-6 w-6 text-white" />
              )}
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800">
                {type === 'supplement' ? 'مکمل‌های غذایی' : 'ویتامین‌ها'}
              </h2>
              <p className="text-gray-600">
                {toPersianNumbers(filteredSupplements.length)} مورد موجود
              </p>
            </div>
          </div>
          
          <Button
            onClick={onAddSupplement}
            className={`${
              type === 'supplement' 
                ? 'bg-gradient-to-l from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700' 
                : 'bg-gradient-to-l from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700'
            } text-white rounded-xl px-6 py-3 shadow-lg transition-all duration-300`}
          >
            <Plus className="h-5 w-5 ml-2" />
            افزودن {type === 'supplement' ? 'مکمل' : 'ویتامین'}
          </Button>
        </div>

        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <Input
            placeholder={`جستجو در ${type === 'supplement' ? 'مکمل‌ها' : 'ویتامین‌ها'}...`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pr-10 rounded-xl border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-right"
            dir="rtl"
          />
        </div>

        {/* Content */}
        {filteredSupplements.length === 0 ? (
          searchQuery ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <div className="w-20 h-20 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Search className="h-10 w-10 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-600 mb-2">نتیجه‌ای یافت نشد</h3>
              <p className="text-gray-400">
                هیچ {type === 'supplement' ? 'مکملی' : 'ویتامینی'} با عبارت "{searchQuery}" پیدا نشد
              </p>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-16"
            >
              <div className={`w-24 h-24 rounded-3xl flex items-center justify-center mx-auto mb-6 ${
                type === 'supplement' 
                  ? 'bg-gradient-to-l from-green-100 to-emerald-100' 
                  : 'bg-gradient-to-l from-purple-100 to-pink-100'
              }`}>
                {type === 'supplement' ? (
                  <Pill className="h-12 w-12 text-green-500" />
                ) : (
                  <Heart className="h-12 w-12 text-purple-500" />
                )}
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                هیچ {type === 'supplement' ? 'مکملی' : 'ویتامینی'} وجود ندارد
              </h3>
              <p className="text-gray-600 mb-8 text-lg">
                اولین {type === 'supplement' ? 'مکمل' : 'ویتامین'} خود را اضافه کنید
              </p>
              <Button
                onClick={onAddSupplement}
                className={`${
                  type === 'supplement' 
                    ? 'bg-gradient-to-l from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700' 
                    : 'bg-gradient-to-l from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700'
                } text-white rounded-xl px-8 py-3 text-lg`}
              >
                <Plus className="h-5 w-5 ml-2" />
                افزودن {type === 'supplement' ? 'مکمل' : 'ویتامین'}
              </Button>
            </motion.div>
          )
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          >
            <AnimatePresence>
              {filteredSupplements.map((supplement, index) => (
                <motion.div
                  key={supplement.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <SupplementCard
                    supplement={supplement}
                    onEdit={() => onEditSupplement(supplement)}
                    onDelete={() => onDeleteSupplement(supplement.id)}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </Card>
  );
};
