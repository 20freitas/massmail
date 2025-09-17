'use client';
import { useEffect } from 'react';
import { Mail, Settings } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const links = [
  { label: 'Sending', icon: Mail, href: '/' },
  { label: 'Settings', icon: Settings, href: '#' }
];

export function Sidebar() {
  // largura fixa agora (sem recolher)
  const expanded = true;
  useEffect(() => {
    document.body.style.setProperty('--sidebar-width', '250px');
    document.body.classList.remove('sidebar-collapsed');
  }, []);
  return (
    <div className="fixed inset-y-0 left-0 z-40 hidden md:flex items-start pt-3">
      <motion.aside
        initial={false}
        animate={{ width: 240 }}
        className="h-[calc(100vh-1.5rem)] ml-4 mr-6 w-[240px] rounded-lg bg-gray-800 shadow-xl border border-gray-700 flex flex-col overflow-hidden"
      >
        <div className="flex items-center px-4 pt-4 pb-3 border-b border-gray-700">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center">
              <Mail className="w-4 h-4 text-white" />
            </div>
            <span className="text-base font-semibold text-gray-100 tracking-tight select-none">MassMail</span>
          </div>
        </div>
        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
          <div className="space-y-1">
            {links.map(l => (
              <a
                key={l.label}
                href={l.href}
                className="relative group flex items-center gap-2.5 px-2.5 py-2 rounded-md hover:bg-gray-700 text-gray-300 hover:text-gray-100 text-sm font-medium transition-colors duration-200"
              >
                <span className="w-4 h-4 flex items-center justify-center">
                  <l.icon className="w-4 h-4" />
                </span>
                <span className="truncate">{l.label}</span>
              </a>
            ))}
          </div>
        </nav>
      </motion.aside>
    </div>
  );
}
