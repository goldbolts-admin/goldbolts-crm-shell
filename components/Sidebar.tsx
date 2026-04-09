'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Users, BarChart2, Mail, MessageSquare, Video,
  FileText, CreditCard, BookOpen, Settings, LogOut,
  Zap, ChevronLeft, ChevronRight, Command, X,
} from 'lucide-react';
import { Logo } from './Logo';
import { logout, getUser } from '@/lib/auth';
import clsx from 'clsx';
import { useState } from 'react';

const NAV = [
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

function UserAvatar({ name, collapsed }: { name?: string; collapsed: boolean }) {
  const initials = name
    ? name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
    : 'GB';
  return (
    <div className={clsx('flex items-center gap-2.5 min-w-0', collapsed && 'justify-center')}>
      <div className="w-7 h-7 rounded-lg gb-gradient flex items-center justify-center text-white text-[11px] font-bold flex-shrink-0">
        {initials}
      </div>
      {!collapsed && (
        <div className="min-w-0">
          <p className="text-xs font-semibold text-gray-700 truncate">{name || 'Admin'}</p>
          <p className="text-[10px] text-gray-400">goldbolts.org</p>
        </div>
      )}
    </div>
  );
}

interface SidebarProps {
  mobileOpen?: boolean;
  onMobileClose?: () => void;
}

export function Sidebar({ mobileOpen = false, onMobileClose }: SidebarProps) {
  const path = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const user = getUser();

  const sidebarContent = (
    <>
      {/* Logo */}
      <div className={clsx(
        'flex items-center border-b border-gray-100 flex-shrink-0',
        collapsed ? 'px-3 py-4 justify-center' : 'px-4 py-4 justify-between'
      )}>
        {!collapsed && <Logo size={26} />}
        {collapsed && (
          <div className="w-7 h-7 rounded-lg gb-gradient flex items-center justify-center">
            <svg width={14} height={14} viewBox="0 0 48 48">
              <polygon points="24,2 43,12 43,36 24,46 5,36 5,12" fill="white" fillOpacity="0.3"/>
              <path d="M28,10 L16,26 L22,26 L20,38 L32,22 L26,22 Z" fill="white" />
            </svg>
          </div>
        )}
        <div className="flex items-center gap-1">
          {/* Mobile close button */}
          {onMobileClose && (
            <button
              onClick={onMobileClose}
              className="md:hidden p-1 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
            >
              <X size={16} />
            </button>
          )}
          {/* Desktop collapse button */}
          {!collapsed && (
            <button
              onClick={() => setCollapsed(true)}
              className="hidden md:flex p-1 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
            >
              <ChevronLeft size={14} />
            </button>
          )}
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 py-2 overflow-y-auto overflow-x-hidden">
        {collapsed && (
          <button
            onClick={() => setCollapsed(false)}
            className="flex items-center justify-center w-8 h-8 mx-auto mb-1 rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-700 transition-colors"
          >
            <ChevronRight size={14} />
          </button>
        )}

        {NAV.map(({ label, href, icon: Icon }) => {
          const active = href === '/' ? path === '/' : path.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              title={collapsed ? label : undefined}
              onClick={onMobileClose}
              className={clsx(
                'flex items-center gap-3 py-2.5 mx-2 rounded-lg text-sm font-medium transition-all',
                collapsed ? 'justify-center px-2' : 'px-3',
                active
                  ? 'nav-item-active'
                  : 'text-gray-500 hover:bg-gray-50 hover:text-gray-800'
              )}
            >
              <Icon size={16} className={clsx('flex-shrink-0', active ? 'text-pink-500' : 'text-gray-400')} />
              {!collapsed && label}
            </Link>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className="border-t border-gray-100 p-2 space-y-1 flex-shrink-0">
        {/* Cmd+K hint */}
        {!collapsed && (
          <div className="hidden md:flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-50 mb-1">
            <Command size={11} className="text-gray-400 flex-shrink-0" />
            <span className="text-[10px] text-gray-400">⌘K search · ⌘/ AI</span>
          </div>
        )}

        {/* User */}
        <div className={clsx('px-2 py-2', collapsed && 'flex justify-center')}>
          <UserAvatar name={user?.name} collapsed={collapsed} />
        </div>

        {/* Sign out */}
        <button
          onClick={logout}
          title={collapsed ? 'Sign out' : undefined}
          className={clsx(
            'flex items-center gap-2.5 w-full rounded-lg text-xs text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all py-2',
            collapsed ? 'justify-center px-2' : 'px-3'
          )}
        >
          <LogOut size={14} />
          {!collapsed && 'Sign out'}
        </button>
      </div>
    </>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside
        className={clsx(
          'hidden md:flex flex-col h-full bg-white border-r border-gray-100 shadow-sm flex-shrink-0 transition-all duration-200',
          collapsed ? 'w-14' : 'w-56'
        )}
      >
        {sidebarContent}
      </aside>

      {/* Mobile sidebar — slides in as overlay */}
      <aside
        className={clsx(
          'md:hidden fixed inset-y-0 left-0 z-50 flex flex-col w-64 bg-white border-r border-gray-100 shadow-xl transition-transform duration-300',
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        {sidebarContent}
      </aside>
    </>
  );
}
