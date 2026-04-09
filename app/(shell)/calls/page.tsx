'use client';
import { useState } from 'react';
import { Video, Plus } from 'lucide-react';
import { TOOLS } from '@/lib/config';
import { IframePage } from '@/components/IframePage';

export default function CallsPage() {
  const [roomName, setRoomName] = useState('');
  const [activeRoom, setActiveRoom] = useState('');

  function startCall() {
    const room = roomName.trim() || `meeting-${Date.now()}`;
    setActiveRoom(room);
  }

  if (activeRoom) {
    return (
      <div className="h-full flex flex-col">
        <div className="flex items-center gap-3 px-4 py-2 bg-white border-b border-gray-100">
          <span className="text-sm font-medium text-gray-700">{activeRoom}</span>
          <button
            onClick={() => setActiveRoom('')}
            className="ml-auto text-xs text-red-500 hover:text-red-700"
          >
            Leave call
          </button>
        </div>
        <IframePage src={`${TOOLS.calls}/${activeRoom}`} title="Video Call" />
      </div>
    );
  }

  return (
    <div className="h-full bg-gray-50 flex flex-col items-center justify-center gap-6 p-8">
      <div className="flex flex-col items-center gap-2 text-center">
        <div className="w-14 h-14 rounded-2xl gb-gradient flex items-center justify-center mb-2">
          <Video size={24} className="text-white" />
        </div>
        <h2 className="text-lg font-semibold text-gray-900">Video Calls</h2>
        <p className="text-sm text-gray-500 max-w-xs">
          Start a meeting or join one. No accounts needed — share the link with anyone.
        </p>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 w-full max-w-sm space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Room name (optional)</label>
          <input
            type="text"
            value={roomName}
            onChange={e => setRoomName(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && startCall()}
            placeholder="e.g. client-onboarding"
            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-transparent"
          />
        </div>
        <button
          onClick={startCall}
          className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold text-white gb-gradient"
        >
          <Plus size={15} />
          Start meeting
        </button>
      </div>
    </div>
  );
}
