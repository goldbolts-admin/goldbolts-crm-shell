'use client';
import { getUser } from '@/lib/auth';
import { BRAND, TOOLS } from '@/lib/config';
import { ExternalLink, User, Globe, Key } from 'lucide-react';

const TOOL_LINKS = [
  { label: 'Twenty CRM', desc: 'CRM settings, users, workspaces', url: TOOLS.crm, color: '#F472B6' },
  { label: 'Listmonk', desc: 'Email list settings, SMTP, templates', url: `${TOOLS.campaigns}/admin`, color: '#8B5CF6' },
  { label: 'Mattermost', desc: 'Team channels, integrations, admin', url: TOOLS.chat, color: '#3B82F6' },
  { label: 'DocuSeal', desc: 'Template settings and signing workflows', url: TOOLS.contracts, color: '#6366F1' },
  { label: 'Invoice Ninja', desc: 'Company settings, payment gateways', url: TOOLS.billing, color: '#10B981' },
  { label: 'Outline', desc: 'Knowledge base settings and permissions', url: TOOLS.docs, color: '#EC4899' },
];

export default function SettingsPage() {
  const user = getUser();

  return (
    <div className="h-full overflow-y-auto p-6 space-y-6 max-w-2xl">
      <div>
        <h1 className="text-xl font-bold" style={{ color: 'var(--text)' }}>Settings</h1>
        <p className="text-[13px] mt-0.5" style={{ color: 'var(--text-muted)' }}>
          Manage your account and connected tools.
        </p>
      </div>

      {/* Account */}
      <section className="card p-5">
        <div className="flex items-center gap-2 mb-4">
          <User size={14} style={{ color: 'var(--text-muted)' }} />
          <h2 className="text-[13px] font-semibold" style={{ color: 'var(--text)' }}>Account</h2>
        </div>
        <div className="space-y-3">
          {[
            { label: 'Name', value: user?.name ?? '—' },
            { label: 'Email', value: user?.email ?? '—' },
            { label: 'Role', value: 'Admin' },
          ].map(({ label, value }) => (
            <div key={label} className="flex items-center justify-between py-2 border-b last:border-0" style={{ borderColor: 'var(--border)' }}>
              <span className="text-[12px] font-medium" style={{ color: 'var(--text-muted)' }}>{label}</span>
              <span className="text-[13px] font-semibold" style={{ color: 'var(--text)' }}>{value}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Brand */}
      <section className="card p-5">
        <div className="flex items-center gap-2 mb-4">
          <Globe size={14} style={{ color: 'var(--text-muted)' }} />
          <h2 className="text-[13px] font-semibold" style={{ color: 'var(--text)' }}>Platform</h2>
        </div>
        <div className="space-y-3">
          {[
            { label: 'Brand', value: BRAND.name },
            { label: 'Domain', value: BRAND.domain },
            { label: 'Plan', value: '$1,497/mo RevOps' },
          ].map(({ label, value }) => (
            <div key={label} className="flex items-center justify-between py-2 border-b last:border-0" style={{ borderColor: 'var(--border)' }}>
              <span className="text-[12px] font-medium" style={{ color: 'var(--text-muted)' }}>{label}</span>
              <span className="text-[13px] font-semibold" style={{ color: 'var(--text)' }}>{value}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Connected tools */}
      <section className="card p-5">
        <div className="flex items-center gap-2 mb-4">
          <Key size={14} style={{ color: 'var(--text-muted)' }} />
          <h2 className="text-[13px] font-semibold" style={{ color: 'var(--text)' }}>Connected Tools</h2>
        </div>
        <div className="space-y-1">
          {TOOL_LINKS.map(({ label, desc, url, color }) => (
            <a
              key={url}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between py-2.5 px-3 rounded-md transition-colors group"
              style={{ color: 'var(--text)' }}
              onMouseEnter={e => (e.currentTarget.style.background = 'var(--bg-card-hover)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-2 h-2 rounded-full flex-shrink-0"
                  style={{ background: color }}
                />
                <div>
                  <p className="text-[13px] font-semibold">{label}</p>
                  <p className="text-[11px]" style={{ color: 'var(--text-muted)' }}>{desc}</p>
                </div>
              </div>
              <ExternalLink size={12} className="flex-shrink-0" style={{ color: 'var(--text-xs)' }} />
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}
