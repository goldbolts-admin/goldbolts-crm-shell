'use client';
import { useState } from 'react';
import { ChevronLeft, ChevronRight, Plus, Video, Clock, Users, ExternalLink } from 'lucide-react';
import { TOOLS } from '@/lib/config';

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = [
  'January','February','March','April','May','June',
  'July','August','September','October','November','December',
];

// Mock upcoming meetings
const UPCOMING = [
  {
    id: 1,
    title: 'Quokka — Onboarding Call',
    date: 'Today, 2:00 PM',
    duration: '30 min',
    attendees: 2,
    type: 'video',
    color: '#F472B6',
  },
  {
    id: 2,
    title: 'AEC Prospect — Discovery',
    date: 'Tomorrow, 10:00 AM',
    duration: '45 min',
    attendees: 3,
    type: 'video',
    color: '#F97316',
  },
  {
    id: 3,
    title: 'Team Sync',
    date: 'Wed, Apr 12 · 9:00 AM',
    duration: '60 min',
    attendees: 5,
    type: 'video',
    color: '#8B5CF6',
  },
];

function getCalendarDays(year: number, month: number) {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrev = new Date(year, month, 0).getDate();

  const cells: { day: number; current: boolean }[] = [];

  // Previous month fill
  for (let i = firstDay - 1; i >= 0; i--) {
    cells.push({ day: daysInPrev - i, current: false });
  }
  // Current month
  for (let i = 1; i <= daysInMonth; i++) {
    cells.push({ day: i, current: true });
  }
  // Next month fill
  const remaining = 42 - cells.length;
  for (let i = 1; i <= remaining; i++) {
    cells.push({ day: i, current: false });
  }
  return cells;
}

export default function CalendarPage() {
  const now = new Date();
  const [year, setYear] = useState(now.getFullYear());
  const [month, setMonth] = useState(now.getMonth());
  const [selected, setSelected] = useState(now.getDate());

  const cells = getCalendarDays(year, month);
  const today = now.getDate();
  const isCurrentMonth = year === now.getFullYear() && month === now.getMonth();

  function prevMonth() {
    if (month === 0) { setMonth(11); setYear(y => y - 1); }
    else setMonth(m => m - 1);
  }
  function nextMonth() {
    if (month === 11) { setMonth(0); setYear(y => y + 1); }
    else setMonth(m => m + 1);
  }

  // Mock events on certain days
  const EVENTS: Record<number, string> = { 9: '#F472B6', 12: '#F97316', 15: '#8B5CF6', 22: '#10B981' };

  return (
    <div className="h-full overflow-y-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold" style={{ color: 'var(--text)' }}>Calendar</h1>
          <p className="text-[13px] mt-0.5" style={{ color: 'var(--text-muted)' }}>
            Schedule meetings, track follow-ups, and manage your time.
          </p>
        </div>
        <a
          href={`${TOOLS.calls}/new-meeting-${Date.now()}`}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary text-xs"
        >
          <Video size={13} />
          Start Jitsi Meeting
        </a>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar grid */}
        <div className="lg:col-span-2">
          <div className="card overflow-hidden">
            {/* Month navigation */}
            <div
              className="flex items-center justify-between px-5 py-3.5 border-b"
              style={{ borderColor: 'var(--border)' }}
            >
              <button
                onClick={prevMonth}
                className="p-1.5 rounded transition-colors"
                style={{ color: 'var(--text-muted)' }}
                onMouseEnter={e => (e.currentTarget.style.background = 'var(--bg-card-hover)')}
                onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
              >
                <ChevronLeft size={16} />
              </button>
              <h2 className="text-[14px] font-semibold" style={{ color: 'var(--text)' }}>
                {MONTHS[month]} {year}
              </h2>
              <button
                onClick={nextMonth}
                className="p-1.5 rounded transition-colors"
                style={{ color: 'var(--text-muted)' }}
                onMouseEnter={e => (e.currentTarget.style.background = 'var(--bg-card-hover)')}
                onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
              >
                <ChevronRight size={16} />
              </button>
            </div>

            {/* Day headers */}
            <div className="grid grid-cols-7 border-b" style={{ borderColor: 'var(--border)' }}>
              {DAYS.map(d => (
                <div
                  key={d}
                  className="text-center py-2 text-[10px] font-semibold uppercase tracking-wider"
                  style={{ color: 'var(--text-xs)' }}
                >
                  {d}
                </div>
              ))}
            </div>

            {/* Calendar cells */}
            <div className="grid grid-cols-7">
              {cells.map((cell, i) => {
                const isToday = isCurrentMonth && cell.current && cell.day === today;
                const isSelected = cell.current && cell.day === selected;
                const hasEvent = cell.current && EVENTS[cell.day];

                return (
                  <button
                    key={i}
                    onClick={() => cell.current && setSelected(cell.day)}
                    className="relative flex flex-col items-center py-2.5 text-[13px] font-medium transition-colors border-b border-r"
                    style={{
                      borderColor: 'var(--border)',
                      color: !cell.current ? 'var(--text-xs)' : isToday ? 'white' : isSelected ? 'var(--gb-pink)' : 'var(--text)',
                      background: isToday ? 'var(--gb-gradient)' : isSelected ? 'rgba(244,114,182,0.08)' : 'transparent',
                      fontFamily: 'inherit',
                      cursor: cell.current ? 'pointer' : 'default',
                    }}
                    onMouseEnter={e => {
                      if (cell.current && !isToday) (e.currentTarget as HTMLButtonElement).style.background = 'var(--bg-card-hover)';
                    }}
                    onMouseLeave={e => {
                      if (cell.current && !isToday && !isSelected) (e.currentTarget as HTMLButtonElement).style.background = 'transparent';
                    }}
                  >
                    {cell.day}
                    {hasEvent && (
                      <div
                        className="w-1 h-1 rounded-full mt-0.5"
                        style={{ background: isToday ? 'white' : EVENTS[cell.day] }}
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Upcoming meetings */}
        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-[11px] font-semibold uppercase tracking-widest" style={{ color: 'var(--text-xs)' }}>
                Upcoming Meetings
              </h2>
              <button
                className="text-[11px] font-medium"
                style={{ color: 'var(--gb-pink)', fontFamily: 'inherit' }}
              >
                + Schedule
              </button>
            </div>
            <div className="space-y-2">
              {UPCOMING.map(meeting => (
                <div key={meeting.id} className="card p-3.5 hover:shadow-md transition-shadow">
                  <div className="flex items-start gap-3">
                    <div
                      className="w-1 h-full min-h-[3rem] rounded-full flex-shrink-0 mt-0.5"
                      style={{ background: meeting.color, width: '3px' }}
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-[13px] font-semibold truncate" style={{ color: 'var(--text)' }}>
                        {meeting.title}
                      </p>
                      <p className="text-[11px] mt-0.5" style={{ color: 'var(--text-muted)' }}>
                        {meeting.date}
                      </p>
                      <div className="flex items-center gap-3 mt-1.5">
                        <span className="flex items-center gap-1 text-[10px]" style={{ color: 'var(--text-xs)' }}>
                          <Clock size={10} />{meeting.duration}
                        </span>
                        <span className="flex items-center gap-1 text-[10px]" style={{ color: 'var(--text-xs)' }}>
                          <Users size={10} />{meeting.attendees} people
                        </span>
                      </div>
                    </div>
                    <a
                      href={`${TOOLS.calls}/meeting-${meeting.id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 rounded flex-shrink-0 transition-colors"
                      style={{ color: 'var(--text-xs)' }}
                      onMouseEnter={e => {
                        (e.currentTarget as HTMLAnchorElement).style.color = meeting.color;
                        (e.currentTarget as HTMLAnchorElement).style.background = 'var(--bg-card-hover)';
                      }}
                      onMouseLeave={e => {
                        (e.currentTarget as HTMLAnchorElement).style.color = 'var(--text-xs)';
                        (e.currentTarget as HTMLAnchorElement).style.background = 'transparent';
                      }}
                    >
                      <ExternalLink size={12} />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick start meeting */}
          <div className="card p-4">
            <p className="text-[12px] font-semibold mb-1" style={{ color: 'var(--text)' }}>
              Quick Meeting
            </p>
            <p className="text-[11px] mb-3" style={{ color: 'var(--text-muted)' }}>
              Start an instant Jitsi call — no account needed.
            </p>
            <a
              href={`${TOOLS.calls}/instant-${Date.now()}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary w-full justify-center text-xs"
            >
              <Video size={13} />
              Start instant call
            </a>
          </div>

          {/* Sync hint */}
          <div
            className="rounded p-3 border text-[11px]"
            style={{ background: 'rgba(244,114,182,0.04)', borderColor: 'rgba(244,114,182,0.2)', color: 'var(--text-muted)' }}
          >
            <p className="font-medium mb-0.5" style={{ color: 'var(--text)' }}>Connect your calendar</p>
            Google Calendar & Outlook sync coming soon.
          </div>
        </div>
      </div>
    </div>
  );
}
