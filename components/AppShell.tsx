'use client';
import { useState } from 'react';
import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';
import { ThemeProvider } from './ThemeProvider';

export function AppShell({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <ThemeProvider>
      <div className="flex h-full">
        {/* Mobile backdrop */}
        {mobileOpen && (
          <div
            className="fixed inset-0 bg-black/40 z-40 md:hidden"
            onClick={() => setMobileOpen(false)}
          />
        )}

        <Sidebar mobileOpen={mobileOpen} onMobileClose={() => setMobileOpen(false)} />

        <div className="flex-1 flex flex-col overflow-hidden min-w-0" style={{ background: 'var(--bg)' }}>
          <Topbar onMobileMenu={() => setMobileOpen(true)} />
          <main className="flex-1 overflow-hidden">
            {children}
          </main>
        </div>
      </div>
    </ThemeProvider>
  );
}
