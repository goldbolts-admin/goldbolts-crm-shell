'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Users, BarChart2, Mail, MessageSquare, Video,
  FileText, CreditCard, BookOpen, Settings, LogOut, Zap,
} from 'lucide-react';
import { Logo } from './Logo';
import { logout } from '@/lib/auth';
import clsx from 'clsx';

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

export function Sidebar() {
  const path = usePathname();

  return (
    <aside className="flex flex-col h-full w-56 bg-white border-r border-gray-100 shadow-sm flex-shrink-0">
      {/* Logo */}
      <div className="px-4 py-5 border-b border-gray-100">
        <Logo size={28} />
      </div>

      {/* Nav */}
      <nav className="flex-1 py-3 overflow-y-auto">
        {NAV.map(({ label, href, icon: Icon }) => {
          const active = href === '/' ? path === '/' : path.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={clsx(
                'flex items-center gap-3 px-4 py-2.5 mx-2 rounded-lg text-sm font-medium transition-all',
                active
                  ? 'nav-item-active'
                  : 'text-gray-500 hover:bg-gray-50 hover:text-gray-800 border-l-3 border-transparent'
              )}
            >
              <Icon size={16} className={active ? 'text-pink-500' : 'text-gray-400'} />
              {label}
            </Link>
          );
        })}
      </nav>

      {/* User + logout */}
      <div className="px-3 py-3 border-t border-gray-100">
        <button
          onClick={logout}
          className="flex items-center gap-3 w-full px-3 py-2 rounded-lg text-sm text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all"
        >
          <LogOut size={15} />
          Sign out
        </button>
      </div>
    </aside>
  );
}
