'use client';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';
import { ThemeProvider } from './ThemeProvider';

// Pages that embed full third-party apps — auto-collapse sidebar to minimise double-nav visual noise
const IFRAME_ROUTES = ['/campaigns', '/chat', '/billing', '/docs', '/contracts'];

export function AppShell({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const path = usePathname();
  const forceCollapsed = IFRAME_ROUTES.includes(path) ? true : undefined;

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

        <Sidebar
          mobileOpen={mobileOpen}
          onMobileClose={() => setMobileOpen(false)}
          forceCollapsed={forceCollapsed}
        />

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
