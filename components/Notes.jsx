'use client';
import { useEffect, useState } from 'react';

const STORAGE_KEY = 'dashboard.notes.v1';

export default function Notes() {
  const [value, setValue] = useState('');

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) setValue(saved);
    } catch {}
  }, []);

  useEffect(() => {
    const id = setTimeout(() => {
      localStorage.setItem(STORAGE_KEY, value);
    }, 300);
    return () => clearTimeout(id);
  }, [value]);

  return (
    <textarea
      className="input h-56 md:h-64 resize-y"
      placeholder="Quick notes?"
      value={value}
      onChange={e => setValue(e.target.value)}
    />
  );
}
