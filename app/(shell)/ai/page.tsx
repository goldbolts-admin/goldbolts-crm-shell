'use client';
import { useChat } from 'ai/react';
import { useState, useRef, useEffect } from 'react';
import { Send, Plus, Zap, RotateCcw, Sparkles } from 'lucide-react';

const SUGGESTIONS = [
  'How do I improve my pipeline conversion rate?',
  'Draft a follow-up sequence for cold leads',
  'What RevOps metrics should I track weekly?',
  'How to segment a 10K contact list effectively?',
  'Best practices for B2B email subject lines',
  'How do I qualify a lead before booking a call?',
];

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

function MessageBubble({ message }: { message: Message }) {
  const isUser = message.role === 'user';
  return (
    <div className={`flex gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
      {!isUser && (
        <div className="w-7 h-7 rounded gb-gradient flex items-center justify-center flex-shrink-0 mt-0.5">
          <Zap size={13} className="text-white" />
        </div>
      )}
      <div
        className="max-w-[78%] px-4 py-3 text-[13px] leading-relaxed"
        style={{
          background: isUser ? 'var(--gb-gradient)' : 'var(--bg-card)',
          color: isUser ? 'white' : 'var(--text)',
          borderRadius: isUser ? '8px 8px 2px 8px' : '8px 8px 8px 2px',
          border: isUser ? 'none' : '1px solid var(--border)',
          boxShadow: 'var(--shadow-sm)',
        }}
      >
        {message.content.split('\n').map((line, i, arr) => (
          <span key={i}>{line}{i < arr.length - 1 && <br />}</span>
        ))}
      </div>
    </div>
  );
}

const HISTORY = [
  { id: 'h1', label: 'Pipeline conversion tactics', active: false },
  { id: 'h2', label: 'Email sequence for AEC leads', active: false },
  { id: 'h3', label: 'RevOps dashboard metrics', active: false },
];

export default function AIPage() {
  const { messages, input, handleInputChange, handleSubmit, isLoading, setMessages } = useChat({
    api: '/api/chat',
  });
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    setTimeout(() => inputRef.current?.focus(), 100);
  }, []);

  function onKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (input.trim()) handleSubmit(e as unknown as React.FormEvent);
    }
  }

  function useSuggestion(s: string) {
    handleInputChange({ target: { value: s } } as React.ChangeEvent<HTMLTextAreaElement>);
    setTimeout(() => inputRef.current?.focus(), 50);
  }

  return (
    <div className="h-full flex overflow-hidden">
      {/* Left panel — history */}
      <aside
        className="hidden md:flex flex-col w-64 flex-shrink-0 border-r overflow-hidden"
        style={{ background: 'var(--bg-card)', borderColor: 'var(--border)' }}
      >
        <div className="p-3 border-b" style={{ borderColor: 'var(--border)' }}>
          <button
            onClick={() => setMessages([])}
            className="btn-primary w-full justify-center text-xs"
          >
            <Plus size={13} />
            New conversation
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-2">
          <p className="text-[10px] font-semibold uppercase tracking-widest px-2 py-2" style={{ color: 'var(--text-xs)' }}>
            Recent
          </p>
          {HISTORY.map(h => (
            <button
              key={h.id}
              className="w-full text-left text-[12px] px-3 py-2 rounded transition-colors truncate"
              style={{
                color: 'var(--text-muted)',
                fontFamily: 'inherit',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLButtonElement).style.background = 'var(--bg-card-hover)';
                (e.currentTarget as HTMLButtonElement).style.color = 'var(--text)';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLButtonElement).style.background = 'transparent';
                (e.currentTarget as HTMLButtonElement).style.color = 'var(--text-muted)';
              }}
            >
              {h.label}
            </button>
          ))}
        </div>

        {/* Bolt info */}
        <div className="p-3 border-t" style={{ borderColor: 'var(--border)' }}>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded gb-gradient flex items-center justify-center flex-shrink-0">
              <Zap size={11} className="text-white" />
            </div>
            <div>
              <p className="text-[11px] font-semibold" style={{ color: 'var(--text)' }}>Bolt</p>
              <p className="text-[10px]" style={{ color: 'var(--text-xs)' }}>Powered by Claude</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main chat area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <div
          className="flex items-center justify-between px-6 py-3 border-b flex-shrink-0"
          style={{ background: 'var(--bg-card)', borderColor: 'var(--border)' }}
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded gb-gradient flex items-center justify-center">
              <Zap size={15} className="text-white" />
            </div>
            <div>
              <h1 className="text-[14px] font-bold" style={{ color: 'var(--text)' }}>Bolt</h1>
              <p className="text-[11px]" style={{ color: 'var(--text-xs)' }}>
                Your strategic RevOps advisor
              </p>
            </div>
          </div>
          <button
            onClick={() => setMessages([])}
            className="flex items-center gap-1.5 text-[11px] font-medium px-2.5 py-1.5 rounded transition-colors"
            style={{ color: 'var(--text-muted)', border: '1px solid var(--border)', fontFamily: 'inherit' }}
            onMouseEnter={e => (e.currentTarget.style.background = 'var(--bg-card-hover)')}
            onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
          >
            <RotateCcw size={11} />
            Clear
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-4">
          {messages.length === 0 && (
            <div className="flex flex-col items-center justify-center h-full gap-6 py-8">
              {/* Bolt intro */}
              <div className="text-center max-w-md">
                <div className="w-16 h-16 rounded-xl gb-gradient flex items-center justify-center mx-auto mb-4 shadow-md">
                  <Zap size={28} className="text-white" />
                </div>
                <h2 className="text-[18px] font-bold mb-2" style={{ color: 'var(--text)' }}>
                  I&apos;m Bolt.
                </h2>
                <p className="text-[13px] leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                  A strategic advisor for your revenue operations. I don&apos;t give you answers —
                  I help you find better ones. Ask me about pipeline, campaigns, or any RevOps challenge.
                </p>
                <p className="text-[11px] mt-3 italic" style={{ color: 'var(--text-xs)' }}>
                  &ldquo;The impediment to action advances action. What stands in the way becomes the way.&rdquo;
                </p>
              </div>

              {/* Suggestion chips */}
              <div className="w-full max-w-lg grid grid-cols-1 sm:grid-cols-2 gap-2">
                {SUGGESTIONS.map(s => (
                  <button
                    key={s}
                    onClick={() => useSuggestion(s)}
                    className="text-left text-[12px] px-3.5 py-2.5 rounded border transition-all"
                    style={{
                      background: 'var(--bg-card)',
                      borderColor: 'var(--border)',
                      color: 'var(--text-muted)',
                      fontFamily: 'inherit',
                    }}
                    onMouseEnter={e => {
                      (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--gb-pink)';
                      (e.currentTarget as HTMLButtonElement).style.color = 'var(--text)';
                    }}
                    onMouseLeave={e => {
                      (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--border)';
                      (e.currentTarget as HTMLButtonElement).style.color = 'var(--text-muted)';
                    }}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages.map(m => (
            <MessageBubble key={m.id} message={m as Message} />
          ))}

          {isLoading && (
            <div className="flex gap-3">
              <div className="w-7 h-7 rounded gb-gradient flex items-center justify-center flex-shrink-0">
                <Zap size={13} className="text-white" />
              </div>
              <div
                className="px-4 py-3 rounded"
                style={{
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border)',
                  borderRadius: '8px 8px 8px 2px',
                }}
              >
                <div className="flex gap-1.5 items-center h-4">
                  {[0, 150, 300].map(delay => (
                    <div
                      key={delay}
                      className="w-1.5 h-1.5 rounded-full animate-bounce"
                      style={{ background: 'var(--gb-pink)', animationDelay: `${delay}ms` }}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div
          className="px-6 py-4 border-t flex-shrink-0"
          style={{ background: 'var(--bg-card)', borderColor: 'var(--border)' }}
        >
          <form onSubmit={handleSubmit} className="flex gap-2 items-end">
            <textarea
              ref={inputRef}
              value={input}
              onChange={handleInputChange}
              onKeyDown={onKeyDown}
              rows={1}
              placeholder="Ask Bolt anything about your pipeline, campaigns, or RevOps strategy…"
              className="flex-1 resize-none text-[13px] px-3.5 py-2.5 rounded border max-h-32"
              style={{
                background: 'var(--bg)',
                border: '1px solid var(--border-strong)',
                color: 'var(--text)',
                fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
                minHeight: '40px',
                outline: 'none',
              }}
              onFocus={e => (e.currentTarget.style.borderColor = 'var(--gb-pink)')}
              onBlur={e => (e.currentTarget.style.borderColor = 'var(--border-strong)')}
              onInput={e => {
                const el = e.currentTarget;
                el.style.height = 'auto';
                el.style.height = Math.min(el.scrollHeight, 128) + 'px';
              }}
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="p-2.5 rounded gb-gradient text-white flex-shrink-0 disabled:opacity-40 disabled:cursor-not-allowed transition-opacity"
              style={{ borderRadius: '6px' }}
            >
              <Send size={15} />
            </button>
          </form>
          <p className="text-center text-[10px] mt-2" style={{ color: 'var(--text-xs)' }}>
            Enter to send · Shift+Enter for new line · Bolt only operates within Goldbolts CRM
          </p>
        </div>
      </div>
    </div>
  );
}
