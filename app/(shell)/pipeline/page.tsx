'use client';
import { useState, useEffect, useCallback } from 'react';
import { ExternalLink, RefreshCw, DollarSign, AlertCircle, Zap } from 'lucide-react';
import { TOOLS } from '@/lib/config';

interface Deal {
  id: string;
  name: { value: string };
  stage: string;
  amount: { amountMicros: number; currencyCode: string } | null;
  closeDate: string | null;
  pointOfContact: { name: { firstName: string; lastName: string } } | null;
  company: { name: { value: string } } | null;
  createdAt: string;
}

const PIPELINE_QUERY = `
query GetOpportunities($first: Int, $orderBy: [OpportunityOrderByInput]) {
  opportunities(first: $first, orderBy: $orderBy) {
    edges {
      node {
        id
        name { value }
        stage
        amount { amountMicros currencyCode }
        closeDate
        pointOfContact { name { firstName lastName } }
        company { name { value } }
        createdAt
      }
    }
    totalCount
  }
}`;

const STAGES = [
  { key: 'NEW',           label: 'New',            color: '#94A3B8' },
  { key: 'SCREENING',     label: 'Screening',      color: '#3B82F6' },
  { key: 'MEETING',       label: 'Meeting',        color: '#8B5CF6' },
  { key: 'PROPOSAL',      label: 'Proposal',       color: '#F97316' },
  { key: 'CUSTOMER',      label: 'Customer',       color: '#10B981' },
  { key: 'CLOSED_LOST',   label: 'Closed Lost',    color: '#EF4444' },
];

function formatAmount(deal: Deal) {
  if (!deal.amount?.amountMicros) return null;
  const val = deal.amount.amountMicros / 1_000_000;
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: deal.amount.currencyCode || 'USD', maximumFractionDigits: 0 }).format(val);
}

async function fetchDeals() {
  const res = await fetch('/api/crm', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: PIPELINE_QUERY,
      variables: { first: 200, orderBy: [{ createdAt: 'DescNullsLast' }] },
    }),
  });
  const json = await res.json();
  if (json.error) throw new Error(json.error);
  if (json.errors) throw new Error(json.errors[0]?.message || 'GraphQL error');
  return json.data?.opportunities?.edges?.map((e: { node: Deal }) => e.node) ?? [];
}

export default function PipelinePage() {
  const [deals, setDeals] = useState<Deal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [view, setView] = useState<'kanban' | 'list'>('kanban');

  const load = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const data = await fetchDeals();
      setDeals(data);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  if (!loading && error?.includes('TWENTY_API_KEY')) {
    return (
      <div className="h-full flex items-center justify-center p-8">
        <div className="max-w-md text-center space-y-4">
          <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center mx-auto">
            <AlertCircle size={22} className="text-amber-600" />
          </div>
          <h2 className="text-lg font-bold" style={{ color: 'var(--text)' }}>API Key Required</h2>
          <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
            Add <code className="px-1.5 py-0.5 rounded text-xs" style={{ background: 'var(--border)', color: 'var(--text)' }}>TWENTY_API_KEY</code> to Coolify env vars.
          </p>
          <a href={`${TOOLS.crm}/settings/developers/api-keys`} target="_blank" rel="noopener noreferrer" className="btn-primary mx-auto">
            <ExternalLink size={14} /> Get API Key
          </a>
        </div>
      </div>
    );
  }

  const byStage = (stage: string) => deals.filter(d => d.stage === stage);
  const totalValue = deals.reduce((sum, d) => sum + (d.amount?.amountMicros ?? 0) / 1_000_000, 0);

  return (
    <div className="h-full flex flex-col overflow-hidden">
      {/* Toolbar */}
      <div
        className="flex items-center gap-3 px-6 py-4 border-b flex-shrink-0"
        style={{ background: 'var(--bg-card)', borderColor: 'var(--border)' }}
      >
        <Zap size={16} style={{ color: 'var(--gb-orange)' }} />
        <span className="text-[15px] font-semibold" style={{ color: 'var(--text)' }}>
          Pipeline
        </span>
        <span className="text-sm" style={{ color: 'var(--text-muted)' }}>
          {deals.length} deals
          {totalValue > 0 && ` · ${new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(totalValue)} total value`}
        </span>

        <div className="ml-auto flex items-center gap-2">
          <div className="flex rounded-md border overflow-hidden text-sm" style={{ borderColor: 'var(--border)' }}>
            {(['kanban', 'list'] as const).map(v => (
              <button
                key={v}
                onClick={() => setView(v)}
                className="px-3 py-1.5 capitalize transition-colors"
                style={{
                  background: view === v ? 'var(--gb-gradient)' : 'var(--bg-card)',
                  color: view === v ? 'white' : 'var(--text-muted)',
                  fontFamily: 'inherit',
                  fontWeight: view === v ? 600 : 400,
                }}
              >
                {v}
              </button>
            ))}
          </div>
          <button onClick={load} disabled={loading} className="p-2 rounded-md border" style={{ border: '1px solid var(--border)', color: 'var(--text-muted)', background: 'var(--bg-card)' }}>
            <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
          </button>
          <a href={`${TOOLS.crm}/objects/opportunities`} target="_blank" rel="noopener noreferrer" className="btn-secondary text-sm">
            <ExternalLink size={13} /> Open in CRM
          </a>
        </div>
      </div>

      {error && !error.includes('TWENTY_API_KEY') && (
        <div className="px-5 py-2 text-sm flex items-center gap-2" style={{ background: 'rgba(239,68,68,0.08)', color: '#DC2626', borderBottom: '1px solid rgba(239,68,68,0.15)' }}>
          <AlertCircle size={14} />{error}
        </div>
      )}

      {/* Kanban View */}
      {view === 'kanban' && (
        <div className="flex-1 overflow-x-auto overflow-y-hidden p-6">
          <div className="flex gap-5 h-full min-w-max">
            {STAGES.map(({ key, label, color }) => {
              const stageDeals = byStage(key);
              const stageValue = stageDeals.reduce((s, d) => s + (d.amount?.amountMicros ?? 0) / 1_000_000, 0);
              return (
                <div key={key} className="w-72 flex flex-col flex-shrink-0 h-full">
                  {/* Stage header */}
                  <div
                    className="flex items-center justify-between px-4 py-3 rounded-t-lg border border-b-0 flex-shrink-0"
                    style={{ background: color + '12', borderColor: color + '30' }}
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full" style={{ background: color }} />
                      <span className="text-[13px] font-semibold" style={{ color: 'var(--text)' }}>{label}</span>
                      <span
                        className="text-[11px] font-bold px-1.5 py-0.5 rounded-full"
                        style={{ background: color + '20', color }}
                      >
                        {stageDeals.length}
                      </span>
                    </div>
                    {stageValue > 0 && (
                      <span className="text-[11px] font-medium" style={{ color: 'var(--text-muted)' }}>
                        ${(stageValue / 1000).toFixed(0)}K
                      </span>
                    )}
                  </div>

                  {/* Deal cards */}
                  <div
                    className="flex-1 overflow-y-auto p-3 space-y-3 rounded-b-lg border"
                    style={{ background: 'var(--bg)', borderColor: color + '30' }}
                  >
                    {loading ? (
                      Array.from({ length: 3 }).map((_, i) => (
                        <div key={i} className="card p-3 space-y-2 animate-pulse">
                          <div className="h-3.5 rounded" style={{ background: 'var(--border)', width: '80%' }} />
                          <div className="h-3 rounded" style={{ background: 'var(--border)', width: '60%' }} />
                        </div>
                      ))
                    ) : stageDeals.length === 0 ? (
                      <div className="text-center py-8 text-[12px]" style={{ color: 'var(--text-xs)' }}>
                        No deals
                      </div>
                    ) : stageDeals.map(deal => (
                      <a
                        key={deal.id}
                        href={`${TOOLS.crm}/objects/opportunities/${deal.id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="card p-4 block hover:shadow-md transition-shadow group"
                      >
                        <div className="flex items-start justify-between gap-2 mb-1.5">
                          <p className="text-[13px] font-semibold leading-tight" style={{ color: 'var(--text)' }}>
                            {deal.name?.value || 'Untitled Deal'}
                          </p>
                          <ExternalLink size={11} className="flex-shrink-0 mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity" style={{ color }} />
                        </div>
                        {deal.company?.name?.value && (
                          <p className="text-[11px] mb-1" style={{ color: 'var(--text-muted)' }}>
                            {deal.company.name.value}
                          </p>
                        )}
                        <div className="flex items-center justify-between mt-2">
                          {formatAmount(deal) ? (
                            <span className="flex items-center gap-1 text-[12px] font-semibold" style={{ color }}>
                              <DollarSign size={11} />{formatAmount(deal)}
                            </span>
                          ) : <span />}
                          {deal.closeDate && (
                            <span className="text-[10px]" style={{ color: 'var(--text-xs)' }}>
                              {new Date(deal.closeDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                            </span>
                          )}
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* List View */}
      {view === 'list' && (
        <div className="flex-1 overflow-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr style={{ background: 'var(--bg-card)', borderBottom: '1px solid var(--border)' }}>
                {['Deal', 'Company', 'Stage', 'Value', 'Close Date', ''].map(h => (
                  <th
                    key={h}
                    className="text-left px-5 py-4 text-[12px] font-semibold uppercase tracking-wider"
                    style={{ color: 'var(--text-xs)', position: 'sticky', top: 0, background: 'var(--bg-card)', zIndex: 1, borderBottom: '1px solid var(--border)' }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading ? Array.from({ length: 8 }).map((_, i) => (
                <tr key={i} style={{ borderBottom: '1px solid var(--border)' }}>
                  {Array.from({ length: 6 }).map((_, j) => (
                    <td key={j} className="px-5 py-4">
                      <div className="h-4 rounded animate-pulse" style={{ background: 'var(--border)', width: ['70%','55%','40%','60%','45%','32px'][j] }} />
                    </td>
                  ))}
                </tr>
              )) : deals.map((deal, i) => {
                const stage = STAGES.find(s => s.key === deal.stage);
                return (
                  <tr key={deal.id} style={{ borderBottom: '1px solid var(--border)', background: i % 2 === 0 ? 'var(--bg-card)' : 'var(--bg)' }}
                    onMouseEnter={e => (e.currentTarget.style.background = 'var(--bg-card-hover)')}
                    onMouseLeave={e => (e.currentTarget.style.background = i % 2 === 0 ? 'var(--bg-card)' : 'var(--bg)')}
                  >
                    <td className="px-5 py-4 font-semibold" style={{ color: 'var(--text)' }}>{deal.name?.value || '—'}</td>
                    <td className="px-5 py-4" style={{ color: 'var(--text-muted)' }}>{deal.company?.name?.value || '—'}</td>
                    <td className="px-5 py-4">
                      <span className="badge" style={{ background: (stage?.color || '#94A3B8') + '18', color: stage?.color || '#94A3B8' }}>
                        {stage?.label || deal.stage}
                      </span>
                    </td>
                    <td className="px-5 py-4 font-medium" style={{ color: 'var(--text)' }}>{formatAmount(deal) || '—'}</td>
                    <td className="px-5 py-4" style={{ color: 'var(--text-muted)' }}>
                      {deal.closeDate ? new Date(deal.closeDate).toLocaleDateString() : '—'}
                    </td>
                    <td className="px-5 py-4">
                      <a href={`${TOOLS.crm}/objects/opportunities/${deal.id}`} target="_blank" rel="noopener noreferrer"
                        className="p-1.5 rounded-md inline-flex" style={{ color: 'var(--text-xs)' }}
                        onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = 'var(--gb-pink)'; (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(244,114,182,0.08)'; }}
                        onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = 'var(--text-xs)'; (e.currentTarget as HTMLAnchorElement).style.background = 'transparent'; }}
                      >
                        <ExternalLink size={13} />
                      </a>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
