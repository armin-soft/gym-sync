
import { useState, useEffect } from 'react';
import { toPersianNumbers } from '@/lib/utils/numbers';

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
    return months[monthIndex];
  };

  const getPersianSeason = (monthIndex: number): string => {
    // فروردین، اردیبهشت، خرداد = بهار
    if (monthIndex >= 0 && monthIndex <= 2) return 'بهار';
    // تیر، مرداد، شهریور = تابستان
    if (monthIndex >= 3 && monthIndex <= 5) return 'تابستان';
    // مهر، آبان، آذر = پاییز
    if (monthIndex >= 6 && monthIndex <= 8) return 'پاییز';
    // دی، بهمن، اسفند = زمستان
    return 'زمستان';
  };

  const formatPersianDate = (date: Date): string => {
    // Get Gregorian date components
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const dayOfWeek = date.getDay();

    // Simple conversion to Persian date (approximate)
    // For more accurate conversion, you might want to use a Persian calendar library
    let persianYear = year - 621;
    let persianMonth = month + 3;
    let persianDay = day;

    // Adjust for Persian calendar
    if (persianMonth > 12) {
      persianMonth -= 12;
      persianYear += 1;
    }

    // Get Persian day and month names
    const dayName = getPersianDayName(dayOfWeek);
    const monthName = getPersianMonthName(persianMonth - 1);
    const seasonName = getPersianSeason(persianMonth - 1);

    // Format: "دوشنبه ۱۲ خرداد ۱۴۰۴ - بهار"
    return `${dayName} ${toPersianNumbers(persianDay.toString())} ${monthName} ${toPersianNumbers(persianYear.toString())} - ${seasonName}`;
  };

  useEffect(() => {
    const updateDate = () => {
      const now = new Date();
      setPersianDate(formatPersianDate(now));
    };

    // Update immediately
    updateDate();

    // Update every minute (since date doesn't change every second)
    const timer = setInterval(updateDate, 60000);

    return () => clearInterval(timer);
  }, []);

  return persianDate;
};
