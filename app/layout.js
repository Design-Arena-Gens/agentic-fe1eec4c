import './globals.css';

export const metadata = {
  title: 'Agentic Dashboard',
  description: 'Minimalistic day-to-day dashboard',
};

const themeScript = `(() => {
  try {
    const stored = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const isDark = stored ? stored === 'dark' : prefersDark;
    document.documentElement.classList.toggle('dark', isDark);
  } catch (_) {}
})();`;

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full bg-white text-gray-900 dark:bg-gray-950 dark:text-gray-100 antialiased">
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        {children}
      </body>
    </html>
  );
}
