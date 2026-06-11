import Link from 'next/link';
import { ThemeToggle } from './ThemeToggle';
import { Trophy } from 'lucide-react';

export function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 text-xl font-bold text-green-700 dark:text-green-400">
          <Trophy size={24} />
          <span>Copa 2026</span>
        </Link>
        <nav className="flex items-center gap-4">
          <Link href="/simulation" className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors">
            Simulação
          </Link>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
