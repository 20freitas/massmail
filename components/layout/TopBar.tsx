'use client';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

export function TopBar() {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <header className="sticky top-0 z-10 backdrop-blur bg-white/80 border-b">
      <div className="flex items-center h-14 px-6 gap-4">
        <div className="md:hidden">
          <Button variant="outline" size="icon" onClick={() => setMenuOpen(v => !v)} aria-label="Menu"><Menu className="w-4 h-4" /></Button>
        </div>
        <h1 className="text-lg font-semibold tracking-tight">MassMail</h1>
        <div className="ml-auto flex items-center gap-2">
          
          <Button variant="default" className="hidden sm:inline-flex" asChild>
            <Link href="https://mail.google.com" target="_blank">Abrir Gmail</Link>
          </Button>
        </div>
      </div>
      <AnimatePresence>
        {menuOpen && (
          <motion.nav initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="md:hidden border-t px-4 py-2 space-y-1 text-sm">
            <Link href="/" className="block py-1">Envios</Link>
            
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
