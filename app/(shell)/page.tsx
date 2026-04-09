'use client';
import { Users, Zap, Mail, TrendingUp, ArrowUpRight, Sparkles, Command } from 'lucide-react';
import { getUser } from '@/lib/auth';
import { BRAND } from '@/lib/config';

const STATS = [
  { label: 'Total Contacts',      value: '10,159', change: '+22K imported', icon: Users,       from: 'from-pink-400',   to: 'to-rose-500',   bg: 'bg-pink-50',   color: 'text-pink-600' },
  { label: 'Pipeline Deals',      value: '—',       change: 'Add via CRM',  icon: Zap,         from: 'from-orange-400', to: 'to-amber-500',  bg: 'bg-orange-50', color: 'text-orange-600' },
  { label: 'Active Campaigns',    value: '2',       change: 'AI + CRM tracks', icon: Mail,     from: 'from-purple-400', to: 'to-violet-500', bg: 'bg-purple-50', color: 'text-purple-600' },
  { label: 'Open Opportunities',  value: '—',       change: 'Coming soon',  icon: TrendingUp,  from: 'from-blue-400',   to: 'to-cyan-500',   bg: 'bg-blue-50',   color: 'text-blue-600' },
];

const MODULES = [
  { title: 'Contacts & CRM',    href: '/contacts',   desc: 'Manage contacts, companies, and deals',       from: 'from-pink-400',    to: 'to-rose-500' },
  { title: 'Pipeline',          href: '/pipeline',   desc: 'Visualize and move deals through stages',     from: 'from-orange-400',  to: 'to-amber-500' },
  { title: 'Email Campaigns',   href: '/campaigns',  desc: 'Create and send email sequences to leads',    from: 'from-purple-400',  to: 'to-violet-500' },
  { title: 'Team Chat',         href: '/chat',       desc: 'Communicate with your team in real time',     from: 'from-blue-400',    to: 'to-cyan-500' },
  { title: 'Video Calls',       href: '/calls',      desc: 'Host and join calls — no account needed',     from: 'from-teal-400',    to: 'to-green-500' },
  { title: 'Contracts',         href: '/contracts',  desc: 'Send, sign, and manage e-signature docs',     from: 'from-indigo-400',  to: 'to-blue-500' },
  { title: 'Billing',           href: '/billing',    desc: 'Invoices, payments, and client subscriptions',from: 'from-emerald-400', to: 'to-teal-500' },
  { title: 'Knowledge Base',    href: '/docs',       desc: 'Docs, playbooks, and team wikis',             from: 'from-rose-400',    to: 'to-pink-500' },
];

export default function DashboardPage() {
  const user = getUser();
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';

  return (
    <div className="h-full overflow-y-auto bg-gray-50">
      {/* Hero header */}
      <div className="bg-white border-b border-gray-100 px-6 py-5">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-xl font-semibold text-gray-900">
              {greeting}{user?.name ? `, ${user.name.split(' ')[0]}` : ''} 👋
            </h1>
            <p className="text-sm text-gray-500 mt-0.5">{BRAND.name} — your all-in-one RevOps platform</p>
          </div>
          <div className="hidden sm:flex items-center gap-2 text-xs text-gray-400 bg-gray-50 border border-gray-100 rounded-lg px-3 py-2">
            <Command size={11} />
            <span>⌘K to search · ⌘/ for AI</span>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          {STATS.map(({ label, value, change, icon: Icon, from, to, bg, color }) => (
            <div key={label} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 hover:shadow-md transition-shadow">
              <div className={`inline-flex p-2 rounded-xl ${bg} mb-3`}>
                <Icon size={16} className={color} />
              </div>
              <div className="text-2xl font-bold text-gray-900 tabular-nums">{value}</div>
              <div className="text-xs font-medium text-gray-600 mt-0.5">{label}</div>
              <div className={`text-[10px] mt-1 bg-gradient-to-r ${from} ${to} bg-clip-text text-transparent font-medium`}>
                {change}
              </div>
            </div>
          ))}
        </div>

        {/* AI prompt card */}
        <div className="bg-gradient-to-r from-pink-500 to-orange-400 rounded-2xl p-5 text-white shadow-lg">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0">
              <Sparkles size={20} className="text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-sm">Goldbolts AI is ready</p>
              <p className="text-xs text-white/80 mt-0.5">
                Ask about your pipeline, draft campaign copy, write follow-ups, or get RevOps advice — powered by Claude.
              </p>
            </div>
            <button
              onClick={() => {
                const event = new KeyboardEvent('keydown', { key: '/', metaKey: true, ctrlKey: false, bubbles: true });
                window.dispatchEvent(event);
              }}
              className="flex-shrink-0 bg-white/20 hover:bg-white/30 transition-colors text-white text-xs font-semibold px-3 py-1.5 rounded-lg"
            >
              Open AI ⌘/
            </button>
          </div>
        </div>

        {/* Module grid */}
        <div>
          <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">All modules</h2>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {MODULES.map(({ title, href, desc, from, to }) => (
              <a
                key={href}
                href={href}
                className="group bg-white rounded-2xl border border-gray-100 shadow-sm p-4 hover:shadow-md transition-all hover:-translate-y-0.5"
              >
                <div className={`h-1 w-10 rounded-full bg-gradient-to-r ${from} ${to} mb-3`} />
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-sm font-semibold text-gray-900 group-hover:text-pink-600 transition-colors leading-tight">
                    {title}
                  </h3>
                  <ArrowUpRight size={13} className="text-gray-300 group-hover:text-pink-400 transition-colors flex-shrink-0 mt-0.5" />
                </div>
                <p className="text-xs text-gray-500 mt-1 leading-relaxed">{desc}</p>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
