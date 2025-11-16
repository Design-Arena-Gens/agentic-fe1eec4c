'use client';
import { useEffect, useState } from 'react';

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('theme');
    if (stored) setIsDark(stored === 'dark');
    else setIsDark(window.matchMedia('(prefers-color-scheme: dark)').matches);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  return (
    <button className="btn" onClick={() => setIsDark(v => !v)} aria-label="Toggle theme">
      {isDark ? 'Dark' : 'Light'}
    </button>
  );
}
