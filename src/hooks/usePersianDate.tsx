
import { useState, useEffect } from 'react';
import { toPersianNumbers } from '@/lib/utils/numbers';
import { format } from 'date-fns-jalali';

export const usePersianDate = () => {
  const [persianDate, setPersianDate] = useState('');

  const getPersianDayName = (dayIndex: number): string => {
    const days = ['یکشنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه', 'پنج‌شنبه', 'جمعه', 'شنبه'];
    return days[dayIndex];
  };

  const getPersianMonthName = (monthIndex: number): string => {
    const months = [
      'فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور',
      'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'
    ];
    return months[monthIndex - 1];
  };

  const getPersianSeason = (monthIndex: number): string => {
    // فروردین، اردیبهشت، خرداد = بهار
    if (monthIndex >= 1 && monthIndex <= 3) return 'بهار';
    // تیر، مرداد، شهریور = تابستان
    if (monthIndex >= 4 && monthIndex <= 6) return 'تابستان';
    // مهر، آبان، آذر = پاییز
    if (monthIndex >= 7 && monthIndex <= 9) return 'پاییز';
    // دی، بهمن، اسفند = زمستان
    return 'زمستان';
  };

  const formatPersianDate = (date: Date): string => {
    try {
      // استفاده از date-fns-jalali برای تبدیل دقیق
      const persianYear = parseInt(format(date, 'yyyy'));
      const persianMonth = parseInt(format(date, 'MM'));
      const persianDay = parseInt(format(date, 'dd'));
      const dayOfWeek = date.getDay();

      const dayName = getPersianDayName(dayOfWeek);
      const monthName = getPersianMonthName(persianMonth);
      const seasonName = getPersianSeason(persianMonth);

      return `${dayName} ${toPersianNumbers(persianDay.toString())} ${monthName} ${toPersianNumbers(persianYear.toString())} - ${seasonName}`;
    } catch (error) {
      console.error('Error formatting Persian date:', error);
      return 'خطا در محاسبه تاریخ';
    }
  };

  useEffect(() => {
    const updateDate = () => {
      const now = new Date();
      setPersianDate(formatPersianDate(now));
    };

    updateDate();
    const timer = setInterval(updateDate, 60000);

    return () => clearInterval(timer);
  }, []);

  return persianDate;
};
