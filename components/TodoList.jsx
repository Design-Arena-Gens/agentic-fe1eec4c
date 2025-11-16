'use client';
import { useEffect, useMemo, useState } from 'react';

const STORAGE_KEY = 'dashboard.todos.v1';

export default function TodoList() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState('');
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
      setTodos(saved);
    } catch {}
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  const visible = useMemo(() => {
    if (filter === 'active') return todos.filter(t => !t.done);
    if (filter === 'done') return todos.filter(t => t.done);
    return todos;
  }, [todos, filter]);

  function addTodo(e) {
    e.preventDefault();
    const value = text.trim();
    if (!value) return;
    setTodos([{ id: crypto.randomUUID(), text: value, done: false }, ...todos]);
    setText('');
  }

  function toggle(id) {
    setTodos(todos.map(t => t.id === id ? { ...t, done: !t.done } : t));
  }

  function remove(id) {
    setTodos(todos.filter(t => t.id !== id));
  }

  function clearDone() {
    setTodos(todos.filter(t => !t.done));
  }

  return (
    <div className="flex flex-col gap-3">
      <form onSubmit={addTodo} className="flex gap-2">
        <input className="input" placeholder="Add a task?" value={text} onChange={e => setText(e.target.value)} />
        <button className="btn" type="submit">Add</button>
      </form>

      <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
        <div className="flex gap-2">
          <button className={`px-2 py-1 rounded ${filter==='all'?'bg-gray-200 dark:bg-gray-800':''}`} onClick={() => setFilter('all')}>All</button>
          <button className={`px-2 py-1 rounded ${filter==='active'?'bg-gray-200 dark:bg-gray-800':''}`} onClick={() => setFilter('active')}>Active</button>
          <button className={`px-2 py-1 rounded ${filter==='done'?'bg-gray-200 dark:bg-gray-800':''}`} onClick={() => setFilter('done')}>Done</button>
        </div>
        <button onClick={clearDone} className="underline">Clear done</button>
      </div>

      <ul className="divide-y divide-gray-200/70 dark:divide-white/10">
        {visible.map(t => (
          <li key={t.id} className="flex items-center gap-3 py-2">
            <input type="checkbox" className="h-4 w-4" checked={t.done} onChange={() => toggle(t.id)} />
            <span className={`flex-1 ${t.done ? 'line-through text-gray-400' : ''}`}>{t.text}</span>
            <button onClick={() => remove(t.id)} className="text-xs text-red-500">Delete</button>
          </li>
        ))}
        {visible.length === 0 && (
          <li className="py-4 text-sm text-gray-500">No tasks</li>
        )}
      </ul>
    </div>
  );
}
