'use client';
import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Command } from 'cmdk';
import {
  BarChart2, Users, Zap, Mail, MessageSquare, Video,
  FileText, CreditCard, BookOpen, Settings, Sparkles,
  Search,
} from 'lucide-react';
import clsx from 'clsx';

const NAV_ITEMS = [
  { label: 'Dashboard',  href: '/',           icon: BarChart2 },
  { label: 'Contacts',   href: '/contacts',   icon: Users },
  { label: 'Pipeline',   href: '/pipeline',   icon: Zap },
  { label: 'Campaigns',  href: '/campaigns',  icon: Mail },
  { label: 'Chat',       href: '/chat',       icon: MessageSquare },
  { label: 'Calls',      href: '/calls',      icon: Video },
  { label: 'Contracts',  href: '/contracts',  icon: FileText },
  { label: 'Billing',    href: '/billing',    icon: CreditCard },
  { label: 'Docs',       href: '/docs',       icon: BookOpen },
  { label: 'Settings',   href: '/settings',   icon: Settings },
];

interface CommandPaletteProps {
  open: boolean;
  onClose: () => void;
  onOpenAI: () => void;
}

export function CommandPalette({ open, onClose, onOpenAI }: CommandPaletteProps) {
  const router = useRouter();
  const [search, setSearch] = useState('');

  useEffect(() => {
    if (!open) setSearch('');
  }, [open]);

  function navigate(href: string) {
    router.push(href);
    onClose();
  }

  function openAI() {
    onOpenAI();
    onClose();
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Dialog */}
      <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[560px] max-w-[calc(100vw-2rem)]">
        <Command
          className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden"
          shouldFilter={true}
        >
          <div className="flex items-center gap-3 px-4 py-3.5 border-b border-gray-100">
            <Search size={16} className="text-gray-400 flex-shrink-0" />
            <Command.Input
              value={search}
              onValueChange={setSearch}
              placeholder="Search pages, actions…"
              className="flex-1 bg-transparent text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none"
              autoFocus
            />
            <kbd className="text-[10px] text-gray-400 border border-gray-200 rounded px-1.5 py-0.5">ESC</kbd>
          </div>

          <Command.List className="max-h-72 overflow-y-auto p-2">
            <Command.Empty className="text-sm text-gray-400 text-center py-8">
              No results found
            </Command.Empty>

            <Command.Group heading={
              <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest px-2">Navigate</span>
            }>
              {NAV_ITEMS.map(({ label, href, icon: Icon }) => (
                <Command.Item
                  key={href}
                  value={label}
                  onSelect={() => navigate(href)}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-gray-700 cursor-pointer data-[selected=true]:bg-pink-50 data-[selected=true]:text-pink-700 transition-colors"
                >
                  <Icon size={15} className="text-gray-400" />
                  {label}
                </Command.Item>
              ))}
            </Command.Group>

            <Command.Separator className="my-1.5 border-t border-gray-100" />

            <Command.Group heading={
              <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest px-2">AI</span>
            }>
              <Command.Item
                value="ai assistant ask goldbolts"
                onSelect={openAI}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-gray-700 cursor-pointer data-[selected=true]:bg-pink-50 data-[selected=true]:text-pink-700 transition-colors"
              >
                <div className="w-5 h-5 rounded-md gb-gradient flex items-center justify-center">
                  <Sparkles size={11} className="text-white" />
                </div>
                Ask Goldbolts AI
              </Command.Item>
            </Command.Group>
          </Command.List>

          <div className="px-4 py-2 border-t border-gray-100 flex items-center gap-3 text-[10px] text-gray-400">
            <span><kbd className="border border-gray-200 rounded px-1 py-0.5">↑↓</kbd> navigate</span>
            <span><kbd className="border border-gray-200 rounded px-1 py-0.5">↵</kbd> select</span>
            <span><kbd className="border border-gray-200 rounded px-1 py-0.5">ESC</kbd> close</span>
          </div>
        </Command>
      </div>
    </div>
  );
}
