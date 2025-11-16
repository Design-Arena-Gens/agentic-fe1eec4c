'use client';
import { useEffect, useState } from 'react';

const STORAGE_KEY = 'dashboard.bookmarks.v1';

export default function Bookmarks() {
  const [bookmarks, setBookmarks] = useState([]);
  const [name, setName] = useState('');
  const [url, setUrl] = useState('');

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
      if (saved.length === 0) {
        setBookmarks([
          { id: crypto.randomUUID(), name: 'Gmail', url: 'https://mail.google.com' },
          { id: crypto.randomUUID(), name: 'Calendar', url: 'https://calendar.google.com' },
          { id: crypto.randomUUID(), name: 'Drive', url: 'https://drive.google.com' },
        ]);
      } else setBookmarks(saved);
    } catch {}
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(bookmarks));
  }, [bookmarks]);

  function add(e) {
    e.preventDefault();
    const n = name.trim();
    const u = url.trim();
    if (!n || !u) return;
    setBookmarks([{ id: crypto.randomUUID(), name: n, url: u }, ...bookmarks]);
    setName('');
    setUrl('');
  }

  function remove(id) {
    setBookmarks(bookmarks.filter(b => b.id !== id));
  }

  return (
    <div className="flex flex-col gap-3">
      <form onSubmit={add} className="grid grid-cols-1 sm:grid-cols-6 gap-2">
        <input className="input sm:col-span-2" placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
        <input className="input sm:col-span-3" placeholder="URL" value={url} onChange={e => setUrl(e.target.value)} />
        <button className="btn sm:col-span-1" type="submit">Add</button>
      </form>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2">
        {bookmarks.map(b => (
          <div key={b.id} className="group relative">
            <a href={b.url} target="_blank" rel="noreferrer" className="block rounded-lg border border-gray-200/70 dark:border-white/10 px-3 py-2 hover:bg-gray-50 dark:hover:bg-gray-900/50 truncate">{b.name}</a>
            <button onClick={() => remove(b.id)} className="absolute -top-2 -right-2 hidden group-hover:block text-xs bg-red-500 text-white rounded-full px-1">?</button>
          </div>
        ))}
        {bookmarks.length === 0 && (
          <div className="text-sm text-gray-500">No bookmarks</div>
        )}
      </div>
    </div>
  );
}
