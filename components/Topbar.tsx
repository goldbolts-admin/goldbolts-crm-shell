'use client';
import { usePathname } from 'next/navigation';
import {
  Bell, Sun, Moon, ChevronDown, User, Settings, LogOut,
  Menu, ChevronRight,
} from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { useTheme } from './ThemeProvider';
import { logout, getUser } from '@/lib/auth';
import Link from 'next/link';

const PAGE_NAMES: Record<string, string> = {
  '/':          'Dashboard',
  '/ai':        'Bolt AI',
  '/contacts':  'Contacts',
  '/pipeline':  'Pipeline',
  '/calendar':  'Calendar',
  '/campaigns': 'Campaigns',
  '/calls':     'Calls',
  '/chat':      'Chat',
  '/contracts': 'Contracts',
  '/billing':   'Billing',
  '/docs':      'Knowledge Base',
  '/settings':  'Settings',
};

const SECTION_NAMES: Record<string, string> = {
  '/':          'Overview',
  '/ai':        'Overview',
  '/contacts':  'CRM',
  '/pipeline':  'CRM',
  '/calendar':  'CRM',
  '/campaigns': 'CRM',
  '/calls':     'Tools',
  '/chat':      'Tools',
  '/contracts': 'Tools',
  '/billing':   'Tools',
  '/docs':      'Tools',
  '/settings':  'System',
};

const MOCK_NOTIFICATIONS = [
  { id: 1, title: 'New contact imported',    desc: '10,159 contacts added from CSV', time: '2m ago',  read: false, type: 'success' },
  { id: 2, title: 'Campaign sent',           desc: 'AEC Outreach #1 sent to 2,400',  time: '1h ago',  read: false, type: 'info' },
  { id: 3, title: 'Invoice overdue',         desc: 'Quokka — $1,497 past due',       time: '3h ago',  read: false, type: 'warning' },
  { id: 4, title: 'Deal moved to Proposal',  desc: 'Quokka — HubSpot Migration',     time: '1d ago',  read: true,  type: 'info' },
];

function useClickOutside(ref: React.RefObject<HTMLElement | null>, cb: () => void) {
  useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) cb();
    }
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [ref, cb]);
}

interface TopbarProps {
  onMobileMenu: () => void;
}

export function Topbar({ onMobileMenu }: TopbarProps) {
  const path = usePathname();
  const { theme, toggleTheme } = useTheme();
  const user = getUser();
  const [notifOpen, setNotifOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);
  const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS);
  const notifRef = useRef<HTMLDivElement>(null);
  const userRef = useRef<HTMLDivElement>(null);

  useClickOutside(notifRef, () => setNotifOpen(false));
  useClickOutside(userRef, () => setUserOpen(false));

  const unread = notifications.filter(n => !n.read).length;
  const section = SECTION_NAMES[path] || 'Overview';
  const page = PAGE_NAMES[path] || path.replace('/', '').replace(/^\w/, c => c.toUpperCase());

  const initials = user?.name
    ? user.name.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2)
    : 'GB';

  function markAllRead() {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  }

  return (
    <header
      className="flex items-center gap-3 px-6 h-16 flex-shrink-0 z-30"
      style={{
        background: 'var(--topbar-bg)',
        borderBottom: '1px solid var(--topbar-border)',
        color: 'var(--topbar-text)',
      }}
    >
      {/* Mobile hamburger */}
      <button
        className="md:hidden p-1.5 rounded hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
        onClick={onMobileMenu}
        aria-label="Open menu"
      >
        <Menu size={18} style={{ color: 'var(--topbar-muted)' }} />
      </button>

      {/* Breadcrumb */}
      <div className="flex items-center gap-1.5 flex-1 min-w-0">
        <span className="text-[13px] font-medium hidden sm:block" style={{ color: 'var(--topbar-muted)' }}>
          {section}
        </span>
        <ChevronRight size={13} className="hidden sm:block flex-shrink-0" style={{ color: 'var(--topbar-muted)' }} />
        <span className="text-[15px] font-semibold truncate" style={{ color: 'var(--topbar-text)' }}>
          {page}
        </span>
      </div>

      {/* Right controls */}
      <div className="flex items-center gap-1">
        {/* Notifications */}
        <div ref={notifRef} className="relative">
          <button
            onClick={() => { setNotifOpen(v => !v); setUserOpen(false); }}
            className="relative p-2 rounded hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
            aria-label="Notifications"
          >
            <Bell size={16} style={{ color: 'var(--topbar-muted)' }} />
            {unread > 0 && (
              <span className="absolute -top-0.5 -right-0.5 min-w-[16px] h-4 bg-red-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center px-0.5">
                {unread}
              </span>
            )}
          </button>

          {/* Notifications dropdown */}
          {notifOpen && (
            <div
              className="absolute right-0 top-full mt-1 w-80 rounded-lg overflow-hidden z-50"
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border)',
                boxShadow: 'var(--shadow-lg)',
              }}
            >
              <div
                className="flex items-center justify-between px-4 py-2.5 border-b"
                style={{ borderColor: 'var(--border)' }}
              >
                <span className="text-[12px] font-semibold" style={{ color: 'var(--text)' }}>
                  Notifications
                  {unread > 0 && (
                    <span className="ml-2 badge badge-pink">{unread} new</span>
                  )}
                </span>
                {unread > 0 && (
                  <button
                    onClick={markAllRead}
                    className="text-[11px] font-medium"
                    style={{ color: 'var(--gb-pink)' }}
                  >
                    Mark all read
                  </button>
                )}
              </div>
              <div className="max-h-72 overflow-y-auto">
                {notifications.map(n => (
                  <div
                    key={n.id}
                    className="flex gap-3 px-4 py-3 border-b last:border-0 cursor-pointer transition-colors"
                    style={{
                      background: n.read ? 'transparent' : 'rgba(244,114,182,0.04)',
                      borderColor: 'var(--border)',
                    }}
                    onClick={() => setNotifications(prev => prev.map(x => x.id === n.id ? { ...x, read: true } : x))}
                  >
                    <div className={`w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0 ${n.read ? 'opacity-0' : n.type === 'success' ? 'bg-emerald-500' : n.type === 'warning' ? 'bg-amber-500' : 'bg-blue-500'}`} />
                    <div className="min-w-0 flex-1">
                      <p className="text-[12px] font-semibold truncate" style={{ color: 'var(--text)' }}>{n.title}</p>
                      <p className="text-[11px] truncate mt-0.5" style={{ color: 'var(--text-muted)' }}>{n.desc}</p>
                      <p className="text-[10px] mt-0.5" style={{ color: 'var(--text-xs)' }}>{n.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* User avatar */}
        <div ref={userRef} className="relative">
          <button
            onClick={() => { setUserOpen(v => !v); setNotifOpen(false); }}
            className="flex items-center gap-1.5 pl-1 pr-2 py-1 rounded hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
          >
            <div className="w-7 h-7 rounded gb-gradient flex items-center justify-center text-white text-[10px] font-bold">
              {initials}
            </div>
            <ChevronDown size={12} style={{ color: 'var(--topbar-muted)' }} />
          </button>

          {/* User dropdown */}
          {userOpen && (
            <div
              className="absolute right-0 top-full mt-1 w-56 rounded-lg overflow-hidden z-50"
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border)',
                boxShadow: 'var(--shadow-lg)',
              }}
            >
              {/* User info */}
              <div className="px-4 py-3 border-b" style={{ borderColor: 'var(--border)' }}>
                <p className="text-[13px] font-semibold" style={{ color: 'var(--text)' }}>
                  {user?.name || 'Admin'}
                </p>
                <p className="text-[11px] mt-0.5 truncate" style={{ color: 'var(--text-muted)' }}>
                  {user?.email || 'admin@goldbolts.org'}
                </p>
              </div>

              {/* Menu items */}
              <div className="py-1">
                <Link
                  href="/settings"
                  onClick={() => setUserOpen(false)}
                  className="flex items-center gap-2.5 px-4 py-2 text-[13px] transition-colors"
                  style={{ color: 'var(--text)' }}
                  onMouseEnter={e => (e.currentTarget.style.background = 'var(--bg-card-hover)')}
                  onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                >
                  <Settings size={13} style={{ color: 'var(--text-muted)' }} />
                  Account settings
                </Link>

                <button
                  onClick={() => { toggleTheme(); setUserOpen(false); }}
                  className="flex items-center gap-2.5 px-4 py-2 text-[13px] w-full transition-colors"
                  style={{ color: 'var(--text)', fontFamily: 'inherit' }}
                  onMouseEnter={e => (e.currentTarget.style.background = 'var(--bg-card-hover)')}
                  onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                >
                  {theme === 'dark'
                    ? <Sun size={13} style={{ color: 'var(--text-muted)' }} />
                    : <Moon size={13} style={{ color: 'var(--text-muted)' }} />
                  }
                  {theme === 'dark' ? 'Light mode' : 'Dark mode'}
                </button>
              </div>

              <div className="border-t py-1" style={{ borderColor: 'var(--border)' }}>
                <button
                  onClick={logout}
                  className="flex items-center gap-2.5 px-4 py-2 text-[13px] w-full text-red-500 transition-colors"
                  style={{ fontFamily: 'inherit' }}
                  onMouseEnter={e => (e.currentTarget.style.background = 'var(--bg-card-hover)')}
                  onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                >
                  <LogOut size={13} />
                  Sign out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
