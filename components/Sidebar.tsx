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
import { GoldboltsLogo } from './GoldboltsLogo';

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
  forceCollapsed?: boolean;
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
    <div
      className="flex flex-col h-full"
      style={{ background: 'var(--sidebar-bg)', borderRight: '1px solid var(--sidebar-border)' }}
    >
      {/* Logo — always centered, collapse button absolute right */}
      <div
        className="relative flex items-center justify-center border-b flex-shrink-0 px-3"
        style={{ borderColor: 'var(--sidebar-border)', minHeight: '60px' }}
      >
        <GoldboltsLogo collapsed={collapsed} />

        {/* Controls — absolute so they don't push logo off-center */}
        <div className="absolute right-2 flex items-center gap-1">
          {onMobileClose && (
            <button
              onClick={onMobileClose}
              className="md:hidden p-1.5 rounded transition-colors"
              style={{ color: 'var(--sidebar-section)' }}
            >
              <X size={16} />
            </button>
          )}
          {!collapsed && (
            <button
              onClick={() => setCollapsed(true)}
              className="hidden md:flex p-1.5 rounded transition-colors"
              style={{ color: 'var(--sidebar-section)' }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--sidebar-text-hover)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--sidebar-section)')}
            >
              <ChevronLeft size={16} />
            </button>
          )}
          {collapsed && (
            <button
              onClick={() => setCollapsed(false)}
              className="hidden md:flex p-1.5 rounded transition-colors"
              style={{ color: 'var(--sidebar-section)' }}
            >
              <ChevronRight size={16} />
            </button>
          )}
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 py-4 overflow-y-auto overflow-x-hidden">
        {SECTIONS.map(({ label, items }) => (
          <div key={label} className={clsx('mb-1', !collapsed && 'px-3')}>
            {!collapsed && (
              <p
                className="text-[11px] font-semibold uppercase tracking-widest px-2 mb-2 mt-6 first:mt-1"
                style={{ color: 'var(--sidebar-section)' }}
              >
                {label}
              </p>
            )}
            {collapsed && (
              <div
                className="h-px mx-3 mb-2 mt-6 first:mt-1"
                style={{ background: 'var(--sidebar-border)' }}
              />
            )}

            {items.map(({ label: itemLabel, href, icon: Icon }) => {
              const active = href === '/' ? path === '/' : path.startsWith(href);
              return (
                <Link
                  key={href}
                  href={href}
                  onClick={onMobileClose}
                  title={collapsed ? itemLabel : undefined}
                  className={clsx(
                    'flex items-center gap-3 py-3 rounded-md text-[14px] font-medium transition-all',
                    collapsed ? 'justify-center px-3 mx-1' : 'px-4',
                    active ? 'nav-item-active' : ''
                  )}
                  style={{
                    color: active ? 'var(--sidebar-active-text)' : 'var(--sidebar-text)',
                  }}
                  onMouseEnter={e => {
                    if (!active) {
                      (e.currentTarget as HTMLAnchorElement).style.color = 'var(--sidebar-text-hover)';
                      (e.currentTarget as HTMLAnchorElement).style.background = 'var(--sidebar-active-bg)';
                    }
                  }}
                  onMouseLeave={e => {
                    if (!active) {
                      (e.currentTarget as HTMLAnchorElement).style.color = 'var(--sidebar-text)';
                      (e.currentTarget as HTMLAnchorElement).style.background = 'transparent';
                    }
                  }}
                >
                  <Icon
                    size={17}
                    className="flex-shrink-0"
                    style={{ color: active ? 'var(--sidebar-active-icon)' : 'var(--sidebar-section)' }}
                  />
                  {!collapsed && itemLabel}
                </Link>
              );
            })}
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div
        className="border-t flex-shrink-0 p-4"
        style={{ borderColor: 'var(--sidebar-border)' }}
      >
        <div className={clsx('flex items-center gap-3 px-1 py-2.5 mb-1', collapsed && 'justify-center px-0')}>
          <div className="w-9 h-9 rounded-lg gb-gradient flex items-center justify-center text-white text-[11px] font-bold flex-shrink-0">
            {initials}
          </div>
          {!collapsed && (
            <div className="min-w-0 flex-1">
              <p className="text-[13px] font-semibold truncate" style={{ color: 'var(--sidebar-user-name)' }}>
                {user?.name || 'Admin'}
              </p>
              <p className="text-[11px] mt-0.5 truncate" style={{ color: 'var(--sidebar-user-sub)' }}>
                {user?.email || 'goldbolts.org'}
              </p>
            </div>
          )}
        </div>

        <button
          onClick={logout}
          title={collapsed ? 'Sign out' : undefined}
          className={clsx(
            'flex items-center gap-2.5 w-full rounded-md py-2.5 text-[13px] font-medium transition-all',
            collapsed ? 'justify-center px-3' : 'px-3'
          )}
          style={{ color: 'var(--sidebar-section)', fontFamily: 'inherit' }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLButtonElement).style.color = '#EF4444';
            (e.currentTarget as HTMLButtonElement).style.background = 'rgba(239,68,68,0.06)';
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLButtonElement).style.color = 'var(--sidebar-section)';
            (e.currentTarget as HTMLButtonElement).style.background = 'transparent';
          }}
        >
          <LogOut size={15} />
          {!collapsed && 'Sign out'}
        </button>
      </div>
    </div>
  );
}

export function Sidebar({ mobileOpen = false, onMobileClose, forceCollapsed }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const isCollapsed = forceCollapsed ?? collapsed;

  return (
    <>
      {/* Desktop */}
      <aside
        className="hidden md:block flex-shrink-0 h-full transition-all duration-200"
        style={{ width: isCollapsed ? 'var(--sidebar-width-collapsed)' : 'var(--sidebar-width)' }}
      >
        <NavContent collapsed={isCollapsed} setCollapsed={forceCollapsed !== undefined ? () => {} : setCollapsed} />
      </aside>

      {/* Mobile overlay */}
      <aside
        className={clsx(
          'md:hidden fixed inset-y-0 left-0 z-50 w-64 transition-transform duration-300',
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        )}
        style={{ boxShadow: 'var(--shadow-lg)' }}
      >
        <NavContent collapsed={false} setCollapsed={() => {}} onMobileClose={onMobileClose} />
      </aside>
    </>
  );
}
