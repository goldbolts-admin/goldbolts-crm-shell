'use client';
import { useEffect, useState } from 'react';
import { Users, Zap, Mail, TrendingUp } from 'lucide-react';
import { TOOLS } from '@/lib/config';
import { getUser } from '@/lib/auth';

interface Stat {
  label: string;
  value: string | number;
  icon: React.ElementType;
  color: string;
  bg: string;
}

export default function DashboardPage() {
  const user = getUser();
  const [stats, setStats] = useState<Stat[]>([
    { label: 'Total Contacts', value: '—', icon: Users, color: 'text-pink-500', bg: 'bg-pink-50' },
    { label: 'Pipeline Deals', value: '—', icon: Zap, color: 'text-orange-500', bg: 'bg-orange-50' },
    { label: 'Campaigns', value: '—', icon: Mail, color: 'text-purple-500', bg: 'bg-purple-50' },
    { label: 'Open Opportunities', value: '—', icon: TrendingUp, color: 'text-blue-500', bg: 'bg-blue-50' },
  ]);

  useEffect(() => {
    // Fetch counts from Twenty GraphQL — fire and forget, best effort
    fetch(`${TOOLS.crm}/metadata`, {
      method: 'GET',
      credentials: 'include',
    }).catch(() => null);
  }, []);

  return (
    <div className="h-full overflow-y-auto bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-xl font-semibold text-gray-900">
          Welcome back{user?.name ? `, ${user.name}` : ''}
        </h1>
        <p className="text-sm text-gray-500 mt-0.5">Here&apos;s what&apos;s happening in your CRM.</p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 gap-4 mb-8 lg:grid-cols-4">
        {stats.map(({ label, value, icon: Icon, color, bg }) => (
          <div key={label} className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
            <div className={`inline-flex p-2 rounded-lg ${bg} mb-3`}>
              <Icon size={18} className={color} />
            </div>
            <div className="text-2xl font-bold text-gray-900">{value}</div>
            <div className="text-xs text-gray-500 mt-0.5">{label}</div>
          </div>
        ))}
      </div>

      {/* Quick links */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[
          { title: 'Contacts & CRM', href: '/contacts', desc: 'Manage contacts, companies, and deals', gradient: 'from-pink-400 to-rose-500' },
          { title: 'Email Campaigns', href: '/campaigns', desc: 'Create and send email sequences', gradient: 'from-orange-400 to-amber-500' },
          { title: 'Team Chat', href: '/chat', desc: 'Communicate with your team in real time', gradient: 'from-purple-400 to-violet-500' },
          { title: 'Video Calls', href: '/calls', desc: 'Host and join calls with clients', gradient: 'from-blue-400 to-cyan-500' },
          { title: 'Contracts', href: '/contracts', desc: 'Send, sign, and manage documents', gradient: 'from-teal-400 to-green-500' },
          { title: 'Billing', href: '/billing', desc: 'Invoices, payments, and subscriptions', gradient: 'from-indigo-400 to-blue-500' },
        ].map(({ title, href, desc, gradient }) => (
          <a
            key={href}
            href={href}
            className="group bg-white rounded-xl border border-gray-100 shadow-sm p-4 hover:shadow-md transition-shadow"
          >
            <div className={`h-1.5 w-12 rounded-full bg-gradient-to-r ${gradient} mb-3`} />
            <h3 className="font-semibold text-sm text-gray-900 group-hover:text-pink-600 transition-colors">{title}</h3>
            <p className="text-xs text-gray-500 mt-1">{desc}</p>
          </a>
        ))}
      </div>
    </div>
  );
}
