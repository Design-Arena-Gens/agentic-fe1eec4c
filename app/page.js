'use client';

import Clock from '../components/Clock';
import Weather from '../components/Weather';
import TodoList from '../components/TodoList';
import Notes from '../components/Notes';
import Bookmarks from '../components/Bookmarks';
import Pomodoro from '../components/Pomodoro';
import ThemeToggle from '../components/ThemeToggle';

export default function Dashboard() {
  return (
    <main className="container-pad max-w-7xl mx-auto">
      <header className="mb-6 flex items-center justify-between">
        <h1 className="text-xl font-bold tracking-tight">Dashboard</h1>
        <ThemeToggle />
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <section className="card col-span-1 p-4">
          <div className="card-title mb-2">Time</div>
          <Clock />
        </section>

        <section className="card col-span-1 p-4">
          <div className="card-title mb-2">Weather</div>
          <Weather />
        </section>

        <section className="card col-span-1 lg:col-span-2 p-4">
          <div className="card-title mb-2">Pomodoro</div>
          <Pomodoro />
        </section>

        <section className="card col-span-1 lg:col-span-2 p-4">
          <div className="card-title mb-2">Todos</div>
          <TodoList />
        </section>

        <section className="card col-span-1 lg:col-span-2 p-4">
          <div className="card-title mb-2">Notes</div>
          <Notes />
        </section>

        <section className="card col-span-1 lg:col-span-2 p-4">
          <div className="card-title mb-2">Bookmarks</div>
          <Bookmarks />
        </section>
      </div>
    </main>
  );
}
