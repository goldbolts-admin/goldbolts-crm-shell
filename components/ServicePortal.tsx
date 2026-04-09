'use client';
import { ExternalLink, CheckCircle2, Clock } from 'lucide-react';

interface ServicePortalProps {
  icon: string;
  title: string;
  description: string;
  features: string[];
  href: string;
  status?: 'online' | 'setting-up';
  color: {
    from: string;
    to: string;
    bg: string;
    text: string;
  };
}

export function ServicePortal({
  icon,
  title,
  description,
  features,
  href,
  status = 'online',
  color,
}: ServicePortalProps) {
  return (
    <div className="h-full overflow-y-auto bg-gray-50">
      <div className="max-w-lg mx-auto px-6 py-12 flex flex-col items-center text-center gap-6">
        {/* Icon */}
        <div
          className={`w-24 h-24 rounded-3xl flex items-center justify-center text-5xl shadow-lg bg-gradient-to-br ${color.from} ${color.to}`}
        >
          {icon}
        </div>

        {/* Title + status */}
        <div>
          <div className="flex items-center justify-center gap-2 mb-1">
            {status === 'online' ? (
              <span className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-full px-2.5 py-0.5">
                <CheckCircle2 size={11} />
                Online
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 text-xs font-medium text-amber-700 bg-amber-50 border border-amber-200 rounded-full px-2.5 py-0.5">
                <Clock size={11} />
                Setting up
              </span>
            )}
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mt-2">{title}</h1>
          <p className="text-sm text-gray-500 mt-2 leading-relaxed max-w-sm">{description}</p>
        </div>

        {/* Features list */}
        <div className="w-full bg-white rounded-2xl border border-gray-100 shadow-sm p-5 text-left">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">What you can do here</p>
          <ul className="space-y-2">
            {features.map(f => (
              <li key={f} className="flex items-start gap-2.5 text-sm text-gray-700">
                <CheckCircle2 size={15} className={`${color.text} flex-shrink-0 mt-0.5`} />
                {f}
              </li>
            ))}
          </ul>
        </div>

        {/* CTA button */}
        {status === 'online' ? (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-2.5 px-8 py-3.5 rounded-2xl text-white font-semibold text-sm bg-gradient-to-r ${color.from} ${color.to} shadow-lg hover:shadow-xl hover:scale-105 transition-all`}
          >
            <ExternalLink size={16} />
            Open {title}
          </a>
        ) : (
          <div className="flex flex-col items-center gap-2">
            <div className={`inline-flex items-center gap-2.5 px-8 py-3.5 rounded-2xl text-white font-semibold text-sm bg-gradient-to-r ${color.from} ${color.to} shadow-lg opacity-50 cursor-not-allowed`}>
              <Clock size={16} />
              Coming Soon
            </div>
            <p className="text-xs text-gray-400">We&apos;re setting this up for you. Check back soon!</p>
          </div>
        )}
      </div>
    </div>
  );
}
