'use client';
import { useEffect, useState } from 'react';

function formatTime(date) {
  return new Intl.DateTimeFormat(undefined, {
    hour: '2-digit', minute: '2-digit', second: '2-digit'
  }).format(date);
}

function formatDate(date) {
  return new Intl.DateTimeFormat(undefined, {
    weekday: 'short', year: 'numeric', month: 'short', day: '2-digit'
  }).format(date);
}

export default function Clock() {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex flex-col gap-1">
      <div className="text-4xl font-semibold tabular-nums">{formatTime(now)}</div>
      <div className="text-sm text-gray-500 dark:text-gray-400">{formatDate(now)}</div>
    </div>
  );
}
