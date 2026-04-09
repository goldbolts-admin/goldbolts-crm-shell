'use client';
import { useState } from 'react';
import { Video, Plus, Clock, Users, PhoneCall, ArrowUpRight, ExternalLink } from 'lucide-react';
import { TOOLS } from '@/lib/config';

const STATS = [
  { label: 'Calls This Week', value: '—', icon: PhoneCall, color: '#10B981', bg: 'rgba(16,185,129,0.08)' },
  { label: 'Total Minutes', value: '—', icon: Clock, color: '#3B82F6', bg: 'rgba(59,130,246,0.08)' },
  { label: 'Participants', value: '—', icon: Users, color: '#8B5CF6', bg: 'rgba(139,92,246,0.08)' },
  { label: 'Calls Today', value: '—', icon: Video, color: '#F97316', bg: 'rgba(249,115,22,0.08)' },
];

const RECENT_CALLS = [
  { id: 1, title: 'Quokka Onboarding', date: 'Today, 2:00 PM', duration: '28 min', participants: 2, color: '#F472B6' },
  { id: 2, title: 'Team Daily Sync', date: 'Yesterday, 9:00 AM', duration: '15 min', participants: 4, color: '#F97316' },
  { id: 3, title: 'AEC Prospect Call', date: 'Mon, Apr 7', duration: '42 min', participants: 3, color: '#8B5CF6' },
];

export default function CallsPage() {
  const [roomName, setRoomName] = useState('');

  function getRoom() {
    return roomName.trim() || `goldbolts-${Date.now()}`;
  }

  return (
    <div className="h-full overflow-y-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold" style={{ color: 'var(--text)' }}>Video Calls</h1>
          <p className="text-[13px] mt-0.5" style={{ color: 'var(--text-muted)' }}>
            Start instant meetings or join rooms via Jitsi — no account needed.
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {STATS.map(({ label, value, icon: Icon, color, bg }) => (
          <div key={label} className="card p-4">
            <div
              className="w-8 h-8 rounded flex items-center justify-center mb-3"
              style={{ background: bg }}
            >
              <Icon size={15} style={{ color }} />
            </div>
            <p className="text-2xl font-bold tabular-nums" style={{ color: 'var(--text)' }}>{value}</p>
            <p className="text-[11px] mt-0.5 font-medium" style={{ color: 'var(--text-muted)' }}>{label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Start a call */}
        <div className="card p-5">
          <div className="flex items-center gap-2.5 mb-4">
            <div className="w-8 h-8 rounded gb-gradient flex items-center justify-center">
              <Video size={15} className="text-white" />
            </div>
            <div>
              <p className="text-[13px] font-semibold" style={{ color: 'var(--text)' }}>Start a meeting</p>
              <p className="text-[11px]" style={{ color: 'var(--text-muted)' }}>Jitsi — share the link with anyone</p>
            </div>
          </div>

          <div className="space-y-3">
            <div>
              <label className="block text-[11px] font-semibold mb-1.5" style={{ color: 'var(--text-muted)' }}>
                Room name (optional)
              </label>
              <input
                type="text"
                value={roomName}
                onChange={e => setRoomName(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && window.open(`${TOOLS.calls}/${getRoom()}`, '_blank')}
                placeholder="e.g. client-onboarding"
                className="input-base"
              />
            </div>
            <a
              href={`${TOOLS.calls}/${getRoom()}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary w-full justify-center text-xs"
            >
              <Plus size={13} />
              Start meeting
            </a>
            <a
              href={TOOLS.calls}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary w-full justify-center text-xs"
            >
              <ExternalLink size={13} />
              Open Jitsi
            </a>
          </div>
        </div>

        {/* Recent calls */}
        <div className="lg:col-span-2">
          <h2 className="text-[11px] font-semibold uppercase tracking-widest mb-3" style={{ color: 'var(--text-xs)' }}>
            Recent Calls
          </h2>
          <div className="space-y-2">
            {RECENT_CALLS.map(call => (
              <div key={call.id} className="card p-4 flex items-center gap-4">
                <div
                  className="w-8 h-8 rounded flex items-center justify-center flex-shrink-0"
                  style={{ background: call.color + '15' }}
                >
                  <Video size={14} style={{ color: call.color }} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] font-semibold truncate" style={{ color: 'var(--text)' }}>
                    {call.title}
                  </p>
                  <div className="flex items-center gap-3 mt-0.5">
                    <span className="text-[11px]" style={{ color: 'var(--text-muted)' }}>{call.date}</span>
                    <span className="flex items-center gap-1 text-[11px]" style={{ color: 'var(--text-xs)' }}>
                      <Clock size={10} />{call.duration}
                    </span>
                    <span className="flex items-center gap-1 text-[11px]" style={{ color: 'var(--text-xs)' }}>
                      <Users size={10} />{call.participants}
                    </span>
                  </div>
                </div>
                <a
                  href={`${TOOLS.calls}/${call.title.toLowerCase().replace(/\s+/g, '-')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-[11px] font-medium px-2.5 py-1.5 rounded transition-colors"
                  style={{
                    color: call.color,
                    background: call.color + '12',
                    border: `1px solid ${call.color}30`,
                  }}
                >
                  <ArrowUpRight size={11} />
                  Rejoin
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
