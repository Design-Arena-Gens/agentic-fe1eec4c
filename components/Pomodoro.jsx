'use client';
import { useEffect, useMemo, useRef, useState } from 'react';

const STORAGE_KEY = 'dashboard.pomodoro.v1';

function secondsToMMSS(seconds) {
  const m = Math.floor(seconds / 60).toString().padStart(2, '0');
  const s = Math.floor(seconds % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}

export default function Pomodoro() {
  const [focusMin, setFocusMin] = useState(25);
  const [breakMin, setBreakMin] = useState(5);
  const [isRunning, setIsRunning] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(25 * 60);
  const intervalRef = useRef(null);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
      if (saved.focusMin) setFocusMin(saved.focusMin);
      if (saved.breakMin) setBreakMin(saved.breakMin);
    } catch {}
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ focusMin, breakMin }));
  }, [focusMin, breakMin]);

  useEffect(() => {
    if (!isRunning) return;
    intervalRef.current = setInterval(() => {
      setSecondsLeft(prev => {
        if (prev <= 1) {
          const nextIsBreak = !isBreak;
          setIsBreak(nextIsBreak);
          return (nextIsBreak ? breakMin : focusMin) * 60;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(intervalRef.current);
  }, [isRunning, isBreak, focusMin, breakMin]);

  useEffect(() => {
    if (!isRunning) setSecondsLeft((isBreak ? breakMin : focusMin) * 60);
  }, [focusMin, breakMin, isBreak, isRunning]);

  const label = isBreak ? 'Break' : 'Focus';
  const total = (isBreak ? breakMin : focusMin) * 60;
  const progress = useMemo(() => 100 - Math.floor((secondsLeft / total) * 100), [secondsLeft, total]);

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-3">
        <div className="text-5xl font-semibold tabular-nums">{secondsToMMSS(secondsLeft)}</div>
        <span className="text-sm text-gray-500 dark:text-gray-400">{label}</span>
      </div>

      <div className="w-full h-2 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
        <div className="h-full bg-gray-900 dark:bg-white" style={{ width: `${progress}%` }} />
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <button className="btn" onClick={() => setIsRunning(r => !r)}>{isRunning ? 'Pause' : 'Start'}</button>
        <button className="btn" onClick={() => { setIsRunning(false); setIsBreak(false); setSecondsLeft(focusMin * 60); }}>Reset</button>
        <div className="ml-auto flex items-center gap-2 text-sm">
          <label>Focus</label>
          <input type="number" min={1} max={120} className="input w-20" value={focusMin} onChange={e => setFocusMin(Number(e.target.value))} />
          <label>Break</label>
          <input type="number" min={1} max={60} className="input w-20" value={breakMin} onChange={e => setBreakMin(Number(e.target.value))} />
        </div>
      </div>
    </div>
  );
}
