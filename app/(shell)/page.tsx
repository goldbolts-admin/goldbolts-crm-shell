'use client';
import {
  Users, Zap, Mail, TrendingUp, ArrowUpRight, DollarSign,
  Eye, MousePointer, Star, Plus, Phone, FileText, CreditCard,
  Calendar, BarChart2,
} from 'lucide-react';
import { getUser } from '@/lib/auth';
import Link from 'next/link';

// ── KPI Cards ──────────────────────────────────────────────────────
const KPIS = [
  {
    label: 'Total Contacts',
    value: '10,159',
    delta: '+22K imported',
    deltaUp: true,
    icon: Users,
    color: '#F472B6',
    bg: 'rgba(244,114,182,0.08)',
  },
  {
    label: 'Active Deals',
    value: '—',
    delta: 'Add via Pipeline',
    deltaUp: null,
    icon: Zap,
    color: '#F97316',
    bg: 'rgba(249,115,22,0.08)',
  },
  {
    label: 'Pipeline Value',
    value: '—',
    delta: 'Add deals to track',
    deltaUp: null,
    icon: DollarSign,
    color: '#8B5CF6',
    bg: 'rgba(139,92,246,0.08)',
  },
  {
    label: 'MTD Revenue',
    value: '—',
    delta: 'Connect billing',
    deltaUp: null,
    icon: TrendingUp,
    color: '#10B981',
    bg: 'rgba(16,185,129,0.08)',
  },
  {
    label: 'Emails Sent',
    value: '2,400',
    delta: 'AEC campaign active',
    deltaUp: true,
    icon: Mail,
    color: '#3B82F6',
    bg: 'rgba(59,130,246,0.08)',
  },
  {
    label: 'Open Rate',
    value: '—',
    delta: 'Awaiting data',
    deltaUp: null,
    icon: Eye,
    color: '#EC4899',
    bg: 'rgba(236,72,153,0.08)',
  },
  {
    label: 'Click Rate',
    value: '—',
    delta: 'Awaiting data',
    deltaUp: null,
    icon: MousePointer,
    color: '#F59E0B',
    bg: 'rgba(245,158,11,0.08)',
  },
  {
    label: 'Active Campaigns',
    value: '2',
    delta: 'AEC + Telco lists',
    deltaUp: true,
    icon: Star,
    color: '#06B6D4',
    bg: 'rgba(6,182,212,0.08)',
  },
];

// ── Quick Actions ──────────────────────────────────────────────────
const QUICK_ACTIONS = [
  { label: 'Add Contact',     href: '/contacts',   icon: Users,      color: '#F472B6' },
  { label: 'Create Deal',     href: '/pipeline',   icon: Zap,        color: '#F97316' },
  { label: 'New Campaign',    href: '/campaigns',  icon: Mail,       color: '#8B5CF6' },
  { label: 'Schedule Call',   href: '/calendar',   icon: Calendar,   color: '#10B981' },
  { label: 'Create Invoice',  href: '/billing',    icon: CreditCard, color: '#3B82F6' },
  { label: 'New Contract',    href: '/contracts',  icon: FileText,   color: '#EC4899' },
];

// ── Module Links ───────────────────────────────────────────────────
const MODULES = [
  { label: 'Contacts & CRM', href: '/contacts',  icon: Users,    desc: 'Manage contacts, companies, deals', color: '#F472B6' },
  { label: 'Pipeline',        href: '/pipeline',  icon: Zap,      desc: 'Visualize deals through stages',    color: '#F97316' },
  { label: 'Campaigns',       href: '/campaigns', icon: Mail,     desc: 'Email sequences & list management', color: '#8B5CF6' },
  { label: 'Calls',           href: '/calls',     icon: Phone,    desc: 'Host & join video meetings',        color: '#10B981' },
  { label: 'Contracts',       href: '/contracts', icon: FileText, desc: 'E-signature document workflows',    color: '#3B82F6' },
  { label: 'Billing',         href: '/billing',   icon: CreditCard, desc: 'Invoices, payments, subscriptions', color: '#EC4899' },
  { label: 'Analytics',       href: '/reports',   icon: BarChart2, desc: 'Revenue & performance reporting',  color: '#F59E0B' },
  { label: 'Calendar',        href: '/calendar',  icon: Calendar, desc: 'Meetings, scheduling & follow-ups', color: '#06B6D4' },
];

export default function DashboardPage() {
  const user = getUser();
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';

  return (
    <div className="h-full overflow-y-auto p-8 space-y-8">
      {/* Page header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold" style={{ color: 'var(--text)' }}>
            {greeting}{user?.name ? `, ${user.name.split(' ')[0]}` : ''} 👋
          </h1>
          <p className="text-[13px] mt-1" style={{ color: 'var(--text-muted)' }}>
            Here&apos;s your RevOps snapshot for today.
          </p>
        </div>
        <Link
          href="/ai"
          className="btn-secondary hidden sm:flex items-center gap-2 text-xs"
        >
          <span className="gb-gradient-text font-semibold">Ask Bolt AI</span>
        </Link>
      </div>

      {/* KPI Grid */}
      <div>
        <h2 className="text-[11px] font-semibold uppercase tracking-widest mb-4" style={{ color: 'var(--text-xs)' }}>
          Key Metrics
        </h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {KPIS.map(({ label, value, delta, deltaUp, icon: Icon, color, bg }) => (
            <div
              key={label}
              className="card p-5 hover:shadow-md transition-shadow cursor-default"
            >
              <div className="flex items-start justify-between mb-4">
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: bg }}
                >
                  <Icon size={16} style={{ color }} />
                </div>
                {deltaUp === true && (
                  <ArrowUpRight size={13} className="text-emerald-500 mt-0.5" />
                )}
              </div>
              <p className="text-2xl font-bold tabular-nums" style={{ color: 'var(--text)' }}>
                {value}
              </p>
              <p className="text-[12px] font-medium mt-1" style={{ color: 'var(--text-muted)' }}>
                {label}
              </p>
              <p className="text-[11px] mt-1.5 font-medium" style={{ color }}>
                {delta}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-[11px] font-semibold uppercase tracking-widest mb-4" style={{ color: 'var(--text-xs)' }}>
          Quick Actions
        </h2>
        <div className="flex flex-wrap gap-2.5">
          {QUICK_ACTIONS.map(({ label, href, icon: Icon, color }) => (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-2 px-4 py-2.5 rounded-md text-[13px] font-semibold transition-all hover:shadow-sm border"
              style={{
                background: 'var(--bg-card)',
                borderColor: 'var(--border)',
                color: 'var(--text)',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLAnchorElement).style.borderColor = color;
                (e.currentTarget as HTMLAnchorElement).style.color = color;
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLAnchorElement).style.borderColor = 'var(--border)';
                (e.currentTarget as HTMLAnchorElement).style.color = 'var(--text)';
              }}
            >
              <Plus size={12} style={{ color }} />
              {label}
            </Link>
          ))}
        </div>
      </div>

      {/* Modules */}
      <div>
        <h2 className="text-[11px] font-semibold uppercase tracking-widest mb-4" style={{ color: 'var(--text-xs)' }}>
          All Modules
        </h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {MODULES.map(({ label, href, icon: Icon, desc, color }) => (
            <Link
              key={href}
              href={href}
              className="card p-5 hover:shadow-md transition-all group"
              onMouseEnter={e => (e.currentTarget.style.borderColor = color + '40')}
              onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--border)')}
            >
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center mb-4"
                style={{ background: color + '12' }}
              >
                <Icon size={16} style={{ color }} />
              </div>
              <div className="flex items-start justify-between gap-1">
                <p className="text-[13px] font-semibold leading-tight" style={{ color: 'var(--text)' }}>
                  {label}
                </p>
                <ArrowUpRight size={12} className="flex-shrink-0 mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity" style={{ color }} />
              </div>
              <p className="text-[11px] mt-1 leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                {desc}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
