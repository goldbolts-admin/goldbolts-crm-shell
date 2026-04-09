'use client';
import { useState } from 'react';
import { getUser } from '@/lib/auth';
import { BRAND, TOOLS } from '@/lib/config';
import { ExternalLink } from 'lucide-react';

const TOOL_LINKS = [
  { label: 'CRM (Twenty)', url: TOOLS.crm, desc: 'Manage your CRM settings, users, and workspaces' },
  { label: 'Campaigns (Listmonk)', url: TOOLS.campaigns, desc: 'Email list settings, SMTP, templates' },
  { label: 'Chat (Mattermost)', url: TOOLS.chat, desc: 'Team channels, integrations, admin' },
  { label: 'Contracts (DocuSeal)', url: TOOLS.contracts, desc: 'Template settings and signing workflows' },
  { label: 'Billing (Invoice Ninja)', url: TOOLS.billing, desc: 'Company settings, payment gateways, plans' },
  { label: 'Docs (Outline)', url: TOOLS.docs, desc: 'Knowledge base settings and permissions' },
];

export default function SettingsPage() {
  const user = getUser();

  return (
    <div className="h-full overflow-y-auto bg-gray-50 p-6">
      <h1 className="text-xl font-semibold text-gray-900 mb-1">Settings</h1>
      <p className="text-sm text-gray-500 mb-6">Manage your account and connected tools.</p>

      {/* Account info */}
      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 mb-4">
        <h2 className="text-sm font-semibold text-gray-700 mb-3">Account</h2>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-500">Name</span>
            <span className="text-gray-900">{user?.name ?? '—'}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Email</span>
            <span className="text-gray-900">{user?.email ?? '—'}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Brand</span>
            <span className="text-gray-900">{BRAND.name}</span>
          </div>
        </div>
      </section>

      {/* Tool admin links */}
      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
        <h2 className="text-sm font-semibold text-gray-700 mb-3">Connected tools</h2>
        <div className="space-y-1">
          {TOOL_LINKS.map(({ label, url, desc }) => (
            <a
              key={url}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between py-2.5 px-3 rounded-lg hover:bg-gray-50 group transition-colors"
            >
              <div>
                <div className="text-sm font-medium text-gray-800 group-hover:text-pink-600 transition-colors">{label}</div>
                <div className="text-xs text-gray-400">{desc}</div>
              </div>
              <ExternalLink size={14} className="text-gray-300 group-hover:text-pink-400 transition-colors flex-shrink-0 ml-3" />
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}
