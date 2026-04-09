'use client';
import { useChat } from 'ai/react';
import { useState, useRef, useEffect } from 'react';
import { Sparkles, X, Send, RotateCcw, ChevronDown } from 'lucide-react';
import clsx from 'clsx';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

function MessageBubble({ message }: { message: Message }) {
  const isUser = message.role === 'user';
  return (
    <div className={clsx('flex gap-2.5', isUser ? 'justify-end' : 'justify-start')}>
      {!isUser && (
        <div className="w-7 h-7 rounded-full gb-gradient flex items-center justify-center flex-shrink-0 mt-0.5">
          <Sparkles size={13} className="text-white" />
        </div>
      )}
      <div
        className={clsx(
          'max-w-[82%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed',
          isUser
            ? 'bg-gradient-to-br from-pink-500 to-orange-400 text-white rounded-tr-sm'
            : 'bg-white border border-gray-100 text-gray-800 rounded-tl-sm shadow-sm'
        )}
      >
        {message.content.split('\n').map((line, i) => (
          <span key={i}>{line}{i < message.content.split('\n').length - 1 && <br />}</span>
        ))}
      </div>
    </div>
  );
}

const SUGGESTIONS = [
  'How do I set up a follow-up campaign?',
  'Best practices for lead scoring?',
  'How to write a killer cold email?',
  'Summarize pipeline best practices',
];

interface AIAssistantProps {
  open: boolean;
  onClose: () => void;
}

export function AIAssistant({ open, onClose }: AIAssistantProps) {
  const { messages, input, handleInputChange, handleSubmit, isLoading, setMessages } = useChat({
    api: '/api/chat',
  });
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 150);
  }, [open]);

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
    <>
      {/* Backdrop */}
      <div
        className={clsx(
          'fixed inset-0 bg-black/20 backdrop-blur-sm z-40 transition-opacity duration-200',
          open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        )}
        onClick={onClose}
      />

      {/* Drawer */}
      <aside
        className={clsx(
          'fixed right-0 top-0 h-full w-[380px] max-w-[95vw] bg-gray-50 border-l border-gray-100 shadow-2xl z-50',
          'flex flex-col transition-transform duration-300 ease-in-out',
          open ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        {/* Header */}
        <div className="flex items-center gap-3 px-4 py-3.5 bg-white border-b border-gray-100">
          <div className="w-8 h-8 rounded-xl gb-gradient flex items-center justify-center">
            <Sparkles size={15} className="text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-gray-900">Goldbolts AI</p>
            <p className="text-xs text-gray-400">Powered by Claude</p>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setMessages([])}
              className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
              title="Clear chat"
            >
              <RotateCcw size={14} />
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {messages.length === 0 && (
            <div className="flex flex-col items-center justify-center h-full gap-5 pb-8">
              <div className="w-14 h-14 rounded-2xl gb-gradient flex items-center justify-center shadow-lg">
                <Sparkles size={24} className="text-white" />
              </div>
              <div className="text-center">
                <p className="text-sm font-semibold text-gray-800">How can I help?</p>
                <p className="text-xs text-gray-400 mt-1">Ask anything about your CRM, campaigns, or pipeline</p>
              </div>
              <div className="flex flex-col gap-2 w-full">
                {SUGGESTIONS.map(s => (
                  <button
                    key={s}
                    onClick={() => useSuggestion(s)}
                    className="text-left text-xs px-3 py-2.5 bg-white border border-gray-100 rounded-xl text-gray-600 hover:border-pink-200 hover:text-pink-700 hover:bg-pink-50 transition-all shadow-sm"
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
            <div className="flex gap-2.5 justify-start">
              <div className="w-7 h-7 rounded-full gb-gradient flex items-center justify-center flex-shrink-0">
                <Sparkles size={13} className="text-white" />
              </div>
              <div className="bg-white border border-gray-100 rounded-2xl rounded-tl-sm px-3.5 py-3 shadow-sm">
                <div className="flex gap-1">
                  <div className="w-1.5 h-1.5 bg-pink-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-1.5 h-1.5 bg-pink-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-1.5 h-1.5 bg-pink-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div className="p-3 bg-white border-t border-gray-100">
          <form onSubmit={handleSubmit} className="flex gap-2 items-end">
            <textarea
              ref={inputRef}
              value={input}
              onChange={handleInputChange}
              onKeyDown={onKeyDown}
              rows={1}
              placeholder="Ask anything…"
              className="flex-1 resize-none px-3 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-transparent bg-gray-50 max-h-32"
              style={{ minHeight: '40px' }}
              onInput={e => {
                const el = e.currentTarget;
                el.style.height = 'auto';
                el.style.height = Math.min(el.scrollHeight, 128) + 'px';
              }}
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="p-2.5 rounded-xl gb-gradient text-white disabled:opacity-40 disabled:cursor-not-allowed transition-opacity flex-shrink-0"
            >
              <Send size={15} />
            </button>
          </form>
          <p className="text-center text-[10px] text-gray-300 mt-2">Enter to send · Shift+Enter for new line</p>
        </div>
      </aside>
    </>
  );
}

export function AIAssistantButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-6 right-6 w-12 h-12 rounded-2xl gb-gradient shadow-lg hover:shadow-xl hover:scale-105 transition-all flex items-center justify-center z-30"
      title="Goldbolts AI"
    >
      <Sparkles size={20} className="text-white" />
    </button>
  );
}
