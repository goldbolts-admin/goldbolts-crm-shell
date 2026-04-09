'use client';
import { useState, useEffect, useCallback } from 'react';
import { Toaster } from 'sonner';
import { AIAssistant, AIAssistantButton } from './AIAssistant';
import { CommandPalette } from './CommandPalette';

export function ShellProvider({ children }: { children: React.ReactNode }) {
  const [aiOpen, setAiOpen] = useState(false);
  const [cmdOpen, setCmdOpen] = useState(false);

  const toggleAI = useCallback(() => setAiOpen(v => !v), []);
  const toggleCmd = useCallback(() => setCmdOpen(v => !v), []);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      // Cmd+K or Ctrl+K → command palette
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        toggleCmd();
      }
      // Cmd+/ or Ctrl+/ → AI assistant
      if ((e.metaKey || e.ctrlKey) && e.key === '/') {
        e.preventDefault();
        toggleAI();
      }
      // ESC → close both
      if (e.key === 'Escape') {
        setAiOpen(false);
        setCmdOpen(false);
      }
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [toggleAI, toggleCmd]);

  return (
    <>
      {children}

      <CommandPalette
        open={cmdOpen}
        onClose={() => setCmdOpen(false)}
        onOpenAI={() => setAiOpen(true)}
      />

      <AIAssistant
        open={aiOpen}
        onClose={() => setAiOpen(false)}
      />

      {!aiOpen && (
        <AIAssistantButton onClick={() => setAiOpen(true)} />
      )}

      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: '#fff',
            border: '1px solid #f3f4f6',
            borderRadius: '12px',
            fontSize: '13px',
          },
        }}
      />
    </>
  );
}
