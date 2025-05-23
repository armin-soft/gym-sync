
import { useState, useEffect } from 'react';

interface DateTimeResponse {
  Result: {
    Code: number;
    Shamsi_Date: string;
    Season: string;
    Season_Emoji: string;
    Time_Based: string;
    Time_Based_Emoji: string;
  };
}

export const useShamsiDate = () => {
  const [dateInfo, setDateInfo] = useState<DateTimeResponse["Result"] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDate = async () => {
      try {
        console.log("Fetching date from API...");
        setIsLoading(true);
        
        const response = await fetch(
          "https://api.armin-soft.ir/Date-Time/?License=d5LAyJxbYst0egh2qNCdc6kWq0gdckmj&Next=0&Mounth=0"
        );
        
        if (!response.ok) {
          throw new Error(`API returned status: ${response.status}`);
        }
        
        const data: DateTimeResponse = await response.json();
        console.log("API response:", data);
        
        if (data && data.Result) {
          setDateInfo(data.Result);
          console.log("Date info set successfully:", data.Result);
        } else {
          console.error("Invalid API response format:", data);
          setError("فرمت پاسخ API نامعتبر است");
        }
      } catch (err) {
        console.error("Error fetching date:", err);
        setError("خطا در دریافت تاریخ");
      } finally {
        setIsLoading(false);
      }
    };

    fetchDate();
    // Update every minute
    const interval = setInterval(fetchDate, 60000);
    
    return () => clearInterval(interval);
  }, []);

  return { dateInfo, isLoading, error };
};
