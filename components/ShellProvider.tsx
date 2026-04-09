'use client';
import { Toaster } from 'sonner';

export function ShellProvider({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: 'var(--bg-card)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--r-md)',
            color: 'var(--text)',
            fontSize: '13px',
            fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
          },
        }}
      />
    </>
  );
}
