import { useEffect, useState } from "react";


const getTimeAgo = (date) => {
    const now = new Date();
  const past = new Date(date);
  const diffInSeconds = Math.floor((now - past) / 1000);

  const intervals = [
    { label: "year", seconds: 31536000 },
    { label: "month", seconds: 2592000 },
    { label: "week", seconds: 604800 },
    { label: "day", seconds: 86400 },
    { label: "hour", seconds: 3600 },
    { label: "minute", seconds: 60 },
    { label: "second", seconds: 1 }
  ];

  for (const interval of intervals) {
    const count = Math.floor(diffInSeconds / interval.seconds);
    if (count > 0) {
      return new Intl.RelativeTimeFormat("en", { numeric: "auto" }).format(-count, interval.label);
    }
  }

  return "just now"
}

const useTimeAgo = (date) => {
  const [timeAgo, setTimeAgo] = useState("");

  useEffect(() => {
    if (!date) {
      setTimeAgo(""); // Reset the state if date is undefined
      return;
    }

    // Set initial "time ago" value
    setTimeAgo(getTimeAgo(date));

    // Update "time ago" value every second
    const interval = setInterval(() => {
      setTimeAgo(getTimeAgo(date));
    }, 1000);

    // Cleanup interval on unmount
    return () => clearInterval(interval);
  }, [date]);

  return timeAgo;
};

export default useTimeAgo;