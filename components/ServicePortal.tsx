'use client';
import { ExternalLink, CheckCircle2, Clock } from 'lucide-react';

interface ServicePortalProps {
  icon: string;
  title: string;
  description: string;
  features: string[];
  href: string;
  status?: 'online' | 'setting-up';
  color: string;
}

export function ServicePortal({
  icon, title, description, features, href, status = 'online', color,
}: ServicePortalProps) {
  return (
    <div className="h-full overflow-y-auto flex items-start justify-center p-8">
      <div className="w-full max-w-md space-y-5">
        {/* Icon + title */}
        <div className="flex items-start gap-4">
          <div
            className="w-14 h-14 rounded-xl flex items-center justify-center text-3xl flex-shrink-0"
            style={{ background: color + '15', border: `1px solid ${color}30` }}
          >
            {icon}
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              {status === 'online' ? (
                <span className="badge badge-green">Online</span>
              ) : (
                <span className="badge badge-amber">Setting up</span>
              )}
            </div>
            <h1 className="text-xl font-bold" style={{ color: 'var(--text)' }}>{title}</h1>
            <p className="text-[13px] mt-1 leading-relaxed" style={{ color: 'var(--text-muted)' }}>
              {description}
            </p>
          </div>
        </div>

        {/* Features */}
        <div className="card p-4">
          <p className="text-[10px] font-semibold uppercase tracking-widest mb-3" style={{ color: 'var(--text-xs)' }}>
            What you can do here
          </p>
          <ul className="space-y-2">
            {features.map(f => (
              <li key={f} className="flex items-start gap-2.5 text-[13px]" style={{ color: 'var(--text-muted)' }}>
                <CheckCircle2 size={14} className="flex-shrink-0 mt-0.5" style={{ color }} />
                {f}
              </li>
            ))}
          </ul>
        </div>

        {/* CTA */}
        {status === 'online' ? (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 py-3 px-6 rounded-lg text-[13px] font-semibold text-white transition-all hover:opacity-90 w-full"
            style={{ background: `linear-gradient(135deg, ${color}, ${color}cc)` }}
          >
            <ExternalLink size={14} />
            Open {title}
          </a>
        ) : (
          <div className="text-center">
            <div
              className="inline-flex items-center gap-2 py-2.5 px-5 rounded-lg text-[13px] font-semibold text-white opacity-50 cursor-not-allowed"
              style={{ background: color }}
            >
              <Clock size={14} />
              Coming Soon
            </div>
            <p className="text-[11px] mt-2" style={{ color: 'var(--text-xs)' }}>
              We&apos;re setting this up. Check back soon.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
