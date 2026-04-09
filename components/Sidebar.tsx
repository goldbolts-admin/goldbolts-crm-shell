'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard, Users, Zap, Mail, MessageSquare, Video,
  FileText, CreditCard, BookOpen, Settings, LogOut,
  ChevronLeft, ChevronRight, X, Calendar, Sparkles,
} from 'lucide-react';
import { logout, getUser } from '@/lib/auth';
import clsx from 'clsx';
import { useState } from 'react';

const SECTIONS = [
  {
    label: 'Overview',
    items: [
      { label: 'Dashboard', href: '/',    icon: LayoutDashboard },
      { label: 'Bolt AI',   href: '/ai',  icon: Sparkles },
    ],
  },
  {
    label: 'CRM',
    items: [
      { label: 'Contacts',   href: '/contacts',   icon: Users },
      { label: 'Pipeline',   href: '/pipeline',   icon: Zap },
      { label: 'Calendar',   href: '/calendar',   icon: Calendar },
      { label: 'Campaigns',  href: '/campaigns',  icon: Mail },
    ],
  },
  {
    label: 'Tools',
    items: [
      { label: 'Calls',      href: '/calls',      icon: Video },
      { label: 'Chat',       href: '/chat',       icon: MessageSquare },
      { label: 'Contracts',  href: '/contracts',  icon: FileText },
      { label: 'Billing',    href: '/billing',    icon: CreditCard },
      { label: 'Docs',       href: '/docs',       icon: BookOpen },
    ],
  },
  {
    label: 'System',
    items: [
      { label: 'Settings',   href: '/settings',   icon: Settings },
    ],
  },
];

interface SidebarProps {
  mobileOpen?: boolean;
  onMobileClose?: () => void;
}

function NavContent({
  collapsed,
  setCollapsed,
  onMobileClose,
}: {
  collapsed: boolean;
  setCollapsed: (v: boolean) => void;
  onMobileClose?: () => void;
}) {
  const path = usePathname();
  const user = getUser();
  const initials = user?.name
    ? user.name.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2)
    : 'GB';

  return (
    <div className="flex flex-col h-full" style={{ background: 'var(--sidebar-bg)' }}>
      {/* Logo area */}
      <div
        className={clsx(
          'flex items-center border-b flex-shrink-0',
          collapsed ? 'px-3 py-[14px] justify-center' : 'px-4 py-[14px] justify-between'
        )}
        style={{ borderColor: 'var(--sidebar-border)' }}
      >
        {!collapsed && (
          <div className="flex items-center gap-2.5 min-w-0">
            <svg width={28} height={28} viewBox="0 0 48 48">
              <defs>
                <linearGradient id="sg" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#F9A8D4"/>
                  <stop offset="100%" stopColor="#FB923C"/>
                </linearGradient>
              </defs>
              <polygon points="24,2 43,12 43,36 24,46 5,36 5,12" fill="url(#sg)"/>
              <path d="M28,10 L16,26 L22,26 L20,38 L32,22 L26,22 Z" fill="white"/>
            </svg>
            <span className="font-bold text-sm tracking-tight gb-gradient-text whitespace-nowrap">
              Goldbolts CRM
            </span>
          </div>
        )}
        {collapsed && (
          <div className="w-7 h-7 rounded flex items-center justify-center gb-gradient">
            <svg width={14} height={14} viewBox="0 0 48 48">
              <polygon points="24,2 43,12 43,36 24,46 5,36 5,12" fill="white" fillOpacity="0.3"/>
              <path d="M28,10 L16,26 L22,26 L20,38 L32,22 L26,22 Z" fill="white"/>
            </svg>
          </div>
        )}
        <div className="flex items-center gap-1">
          {onMobileClose && (
            <button
              onClick={onMobileClose}
              className="md:hidden p-1.5 rounded text-slate-500 hover:text-slate-300 hover:bg-white/5 transition-colors"
            >
              <X size={14} />
            </button>
          )}
          {!collapsed && (
            <button
              onClick={() => setCollapsed(true)}
              className="hidden md:flex p-1.5 rounded text-slate-500 hover:text-slate-300 hover:bg-white/5 transition-colors"
            >
              <ChevronLeft size={14} />
            </button>
          )}
          {collapsed && (
            <button
              onClick={() => setCollapsed(false)}
              className="hidden md:flex p-1.5 rounded text-slate-500 hover:text-slate-300 hover:bg-white/5 transition-colors"
            >
              <ChevronRight size={14} />
            </button>
          )}
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 py-3 overflow-y-auto overflow-x-hidden space-y-0.5">
        {SECTIONS.map(({ label, items }) => (
          <div key={label} className={clsx('mb-1', !collapsed && 'px-3')}>
            {/* Section label */}
            {!collapsed && (
              <p
                className="text-[10px] font-semibold uppercase tracking-widest px-1 mb-1 mt-3 first:mt-1"
                style={{ color: 'var(--sidebar-section)' }}
              >
                {label}
              </p>
            )}
            {collapsed && <div className="h-px mx-auto w-6 mb-2 mt-3 first:mt-1" style={{ background: 'var(--sidebar-border)' }} />}

            {items.map(({ label: itemLabel, href, icon: Icon }) => {
              const active = href === '/' ? path === '/' : path.startsWith(href);
              return (
                <Link
                  key={href}
                  href={href}
                  onClick={onMobileClose}
                  title={collapsed ? itemLabel : undefined}
                  className={clsx(
                    'flex items-center gap-3 py-2 rounded text-[13px] font-medium transition-all relative',
                    collapsed ? 'justify-center px-2 mx-1' : 'px-3',
                    active
                      ? 'nav-item-active'
                      : 'hover:bg-white/5'
                  )}
                  style={{
                    color: active ? 'var(--sidebar-active-text)' : 'var(--sidebar-text)',
                  }}
                  onMouseEnter={e => {
                    if (!active) (e.currentTarget as HTMLAnchorElement).style.color = 'var(--sidebar-text-hover)';
                  }}
                  onMouseLeave={e => {
                    if (!active) (e.currentTarget as HTMLAnchorElement).style.color = 'var(--sidebar-text)';
                  }}
                >
                  <Icon
                    size={15}
                    className="flex-shrink-0"
                    style={{ color: active ? 'var(--sidebar-active-icon)' : 'inherit' }}
                  />
                  {!collapsed && itemLabel}
                </Link>
              );
            })}
          </div>
        ))}
      </nav>

      {/* User footer */}
      <div
        className="border-t flex-shrink-0 p-3"
        style={{ borderColor: 'var(--sidebar-border)' }}
      >
        <div className={clsx('flex items-center gap-2.5 mb-2', collapsed && 'justify-center')}>
          <div className="w-7 h-7 rounded gb-gradient flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0">
            {initials}
          </div>
          {!collapsed && (
            <div className="min-w-0 flex-1">
              <p className="text-[12px] font-semibold truncate" style={{ color: 'var(--sidebar-text-hover)' }}>
                {user?.name || 'Admin'}
              </p>
              <p className="text-[10px] truncate" style={{ color: 'var(--sidebar-section)' }}>
                {user?.email || 'goldbolts.org'}
              </p>
            </div>
          )}
        </div>
        <button
          onClick={logout}
          title={collapsed ? 'Sign out' : undefined}
          className={clsx(
            'flex items-center gap-2 w-full rounded py-1.5 text-[12px] font-medium transition-colors',
            collapsed ? 'justify-center px-2' : 'px-2'
          )}
          style={{ color: 'var(--sidebar-section)' }}
          onMouseEnter={e => (e.currentTarget.style.color = '#EF4444')}
          onMouseLeave={e => (e.currentTarget.style.color = 'var(--sidebar-section)')}
        >
          <LogOut size={13} />
          {!collapsed && 'Sign out'}
        </button>
      </div>
    </div>
  );
}

export function Sidebar({ mobileOpen = false, onMobileClose }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <>
      {/* Desktop sidebar */}
      <aside
        className="hidden md:flex flex-col h-full flex-shrink-0 transition-all duration-200"
        style={{
          width: collapsed ? 'var(--sidebar-width-collapsed)' : 'var(--sidebar-width)',
          background: 'var(--sidebar-bg)',
          borderRight: '1px solid var(--sidebar-border)',
        }}
      >
        <NavContent collapsed={collapsed} setCollapsed={setCollapsed} />
      </aside>

      {/* Mobile sidebar overlay */}
      <aside
        className={clsx(
          'md:hidden fixed inset-y-0 left-0 z-50 flex flex-col w-64 transition-transform duration-300',
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        )}
        style={{ background: 'var(--sidebar-bg)' }}
      >
        <NavContent collapsed={false} setCollapsed={() => {}} onMobileClose={onMobileClose} />
      </aside>
    </>
  );
}
