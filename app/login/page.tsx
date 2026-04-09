'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { login, isLoggedIn } from '@/lib/auth';
import { Mail, Lock, ArrowRight, Zap } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isLoggedIn()) router.replace('/');
  }, [router]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email, password);
      router.replace('/');
    } catch {
      setError('Incorrect email or password. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="min-h-full flex flex-col items-center justify-center px-4 py-12 relative overflow-hidden"
      style={{ background: '#0F172A' }}
    >
      {/* Background gradient blobs */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] opacity-20 blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, #F472B6 0%, transparent 60%)' }}
      />
      <div
        className="absolute bottom-0 right-1/4 w-[400px] h-[300px] opacity-10 blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, #F97316 0%, transparent 60%)' }}
      />

      <div className="relative w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-8">
          <div
            className="w-14 h-14 rounded-xl mx-auto mb-5 flex items-center justify-center shadow-xl"
            style={{ background: 'linear-gradient(135deg, #F472B6, #F97316)' }}
          >
            <Zap size={26} className="text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-1">Welcome back</h1>
          <p className="text-sm" style={{ color: '#64748B' }}>Sign in to Goldbolts CRM</p>
        </div>

        {/* Card */}
        <div
          className="rounded-xl p-7"
          style={{
            background: '#1E293B',
            border: '1px solid #334155',
            boxShadow: '0 25px 50px -12px rgba(0,0,0,0.6)',
          }}
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div>
              <label className="block text-[12px] font-semibold mb-1.5" style={{ color: '#CBD5E1' }}>
                Email address
              </label>
              <div className="relative">
                <Mail size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2" style={{ color: '#475569' }} />
                <input
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full pl-9 pr-3.5 py-2.5 text-[13px] rounded-md transition-all"
                  style={{
                    background: '#0F172A',
                    border: '1px solid #334155',
                    color: '#F1F5F9',
                    fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
                    outline: 'none',
                  }}
                  placeholder="you@company.com"
                  onFocus={e => (e.currentTarget.style.borderColor = '#F472B6')}
                  onBlur={e => (e.currentTarget.style.borderColor = '#334155')}
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-[12px] font-semibold mb-1.5" style={{ color: '#CBD5E1' }}>
                Password
              </label>
              <div className="relative">
                <Lock size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2" style={{ color: '#475569' }} />
                <input
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full pl-9 pr-3.5 py-2.5 text-[13px] rounded-md transition-all"
                  style={{
                    background: '#0F172A',
                    border: '1px solid #334155',
                    color: '#F1F5F9',
                    fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
                    outline: 'none',
                  }}
                  placeholder="Enter your password"
                  onFocus={e => (e.currentTarget.style.borderColor = '#F472B6')}
                  onBlur={e => (e.currentTarget.style.borderColor = '#334155')}
                />
              </div>
            </div>

            {/* Error */}
            {error && (
              <div
                className="px-3.5 py-2.5 rounded-md text-[12px]"
                style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)', color: '#FCA5A5' }}
              >
                {error}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-md text-[13px] font-semibold text-white transition-all mt-2"
              style={{
                background: 'linear-gradient(135deg, #F472B6, #F97316)',
                opacity: loading ? 0.7 : 1,
                cursor: loading ? 'not-allowed' : 'pointer',
                fontFamily: 'inherit',
              }}
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Signing in…
                </>
              ) : (
                <>
                  Sign in
                  <ArrowRight size={14} />
                </>
              )}
            </button>
          </form>
        </div>

        <p className="text-center text-[11px] mt-6" style={{ color: '#475569' }}>
          Need access? Contact your administrator.
        </p>
      </div>
    </div>
  );
}
