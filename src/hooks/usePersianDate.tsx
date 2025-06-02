
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
    // محاسبه دقیق‌تر تاریخ فارسی
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const dayOfWeek = date.getDay();

    // تبدیل دقیق‌تر به تاریخ شمسی
    let persianYear = year - 621;
    let persianMonth = month - 3;
    let persianDay = day;

    // تنظیم ماه فارسی
    if (persianMonth <= 0) {
      persianMonth += 12;
      persianYear -= 1;
    }

    // تنظیم روز بر اساس ماه فارسی
    if (persianMonth <= 6 && persianDay > 31) {
      persianDay = 31;
    } else if (persianMonth > 6 && persianDay > 30) {
      persianDay = 30;
    }

    // در ماه اسفند (ماه 12) و سال کبیسه
    if (persianMonth === 12 && persianDay > 29) {
      const isLeapYear = ((persianYear % 33) * 8 + ((persianYear % 33) + 3) / 4) % 30 < 8;
      persianDay = isLeapYear ? 30 : 29;
    }

    const dayName = getPersianDayName(dayOfWeek);
    const monthName = getPersianMonthName(persianMonth - 1);
    const seasonName = getPersianSeason(persianMonth - 1);

    return `${dayName} ${toPersianNumbers(persianDay.toString())} ${monthName} ${toPersianNumbers(persianYear.toString())} - ${seasonName}`;
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
