'use client';
import { useState, useEffect, useCallback } from 'react';
import {
  Search, ExternalLink, RefreshCw, ChevronLeft, ChevronRight,
  User, Mail, Phone, Building2, MapPin, AlertCircle, SlidersHorizontal,
} from 'lucide-react';
import { TOOLS } from '@/lib/config';

interface Contact {
  id: string;
  name: { firstName: string; lastName: string };
  emails: { primaryEmail: string };
  phones: { primaryPhoneNumber: string };
  company: { name: { value: string } } | null;
  city: string;
  createdAt: string;
}

const CONTACTS_QUERY = `
query GetPeople($first: Int, $after: String, $filter: PersonFilterInput, $orderBy: [PersonOrderByInput]) {
  people(first: $first, after: $after, filter: $filter, orderBy: $orderBy) {
    edges {
      node {
        id
        name { firstName lastName }
        emails { primaryEmail }
        phones { primaryPhoneNumber }
        company { name { value } }
        city
        createdAt
      }
      cursor
    }
    pageInfo { hasNextPage hasPreviousPage startCursor endCursor }
    totalCount
  }
}`;

async function fetchContacts(variables: object) {
  const res = await fetch('/api/crm', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query: CONTACTS_QUERY, variables }),
  });
  const json = await res.json();
  if (json.error) throw new Error(json.error);
  if (json.errors) throw new Error(json.errors[0]?.message || 'GraphQL error');
  return json.data?.people;
}

const PAGE_SIZE = 50;

export default function ContactsPage() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [cursor, setCursor] = useState<string | null>(null);
  const [cursors, setCursors] = useState<string[]>([]);
  const [page, setPage] = useState(1);
  const [hasNext, setHasNext] = useState(false);

  // Debounce search
  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(search), 400);
    return () => clearTimeout(t);
  }, [search]);

  const load = useCallback(async (after: string | null, resetPage = false) => {
    setLoading(true);
    setError('');
    try {
      const filter = debouncedSearch
        ? {
            or: [
              { name: { firstName: { like: `%${debouncedSearch}%` } } },
              { name: { lastName: { like: `%${debouncedSearch}%` } } },
              { emails: { primaryEmail: { like: `%${debouncedSearch}%` } } },
            ],
          }
        : undefined;

      const data = await fetchContacts({
        first: PAGE_SIZE,
        after: after || undefined,
        filter,
        orderBy: [{ createdAt: 'DescNullsLast' }],
      });

      setContacts(data.edges.map((e: { node: Contact }) => e.node));
      setTotalCount(data.totalCount ?? 0);
      setHasNext(data.pageInfo.hasNextPage);
      if (resetPage) {
        setPage(1);
        setCursors([]);
      }
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setLoading(false);
    }
  }, [debouncedSearch]);

  // Reset on search change
  useEffect(() => {
    setCursor(null);
    load(null, true);
  }, [debouncedSearch, load]);

  function nextPage(endCursor: string) {
    setCursors(prev => [...prev, cursor || '']);
    setCursor(endCursor);
    setPage(p => p + 1);
    load(endCursor);
  }

  function prevPage() {
    const newCursors = [...cursors];
    const prev = newCursors.pop() || null;
    setCursors(newCursors);
    setCursor(prev);
    setPage(p => p - 1);
    load(prev);
  }

  const totalPages = Math.ceil(totalCount / PAGE_SIZE);

  function fullName(c: Contact) {
    return [c.name?.firstName, c.name?.lastName].filter(Boolean).join(' ') || '—';
  }

  // If API key not configured show setup instructions
  if (!loading && error?.includes('TWENTY_API_KEY')) {
    return (
      <div className="h-full flex items-center justify-center p-8">
        <div className="max-w-md text-center space-y-4">
          <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center mx-auto">
            <AlertCircle size={22} className="text-amber-600" />
          </div>
          <h2 className="text-lg font-bold" style={{ color: 'var(--text)' }}>API Key Required</h2>
          <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
            Add <code className="px-1.5 py-0.5 rounded text-xs" style={{ background: 'var(--border)', color: 'var(--text)' }}>TWENTY_API_KEY</code> to your Coolify environment variables.
            Get it from <strong>Twenty CRM → Settings → API & Webhooks → API Keys</strong>.
          </p>
          <a
            href={`${TOOLS.crm}/settings/developers/api-keys`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary mx-auto"
          >
            <ExternalLink size={14} />
            Open Twenty CRM Settings
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col overflow-hidden">
      {/* Toolbar */}
      <div
        className="flex items-center gap-3 px-6 py-4 border-b flex-shrink-0"
        style={{ background: 'var(--bg-card)', borderColor: 'var(--border)' }}
      >
        <div className="flex-1 relative max-w-sm">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-xs)' }} />
          <input
            type="text"
            placeholder="Search contacts…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-sm rounded-md border transition-all"
            style={{
              background: 'var(--bg)',
              border: '1px solid var(--border-strong)',
              color: 'var(--text)',
              fontFamily: 'inherit',
              outline: 'none',
            }}
            onFocus={e => (e.currentTarget.style.borderColor = 'var(--gb-pink)')}
            onBlur={e => (e.currentTarget.style.borderColor = 'var(--border-strong)')}
          />
        </div>

        <div className="flex items-center gap-2 ml-auto">
          <span className="text-sm font-medium" style={{ color: 'var(--text-muted)' }}>
            {totalCount.toLocaleString()} contacts
          </span>
          <button
            onClick={() => load(cursor, false)}
            disabled={loading}
            className="p-2 rounded-md border transition-colors"
            style={{ border: '1px solid var(--border)', color: 'var(--text-muted)', background: 'var(--bg-card)' }}
          >
            <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
          </button>
          <button
            className="p-2 rounded-md border transition-colors"
            style={{ border: '1px solid var(--border)', color: 'var(--text-muted)', background: 'var(--bg-card)' }}
          >
            <SlidersHorizontal size={14} />
          </button>
          <a
            href={`${TOOLS.crm}/objects/people`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary text-sm"
          >
            <ExternalLink size={13} />
            Open in CRM
          </a>
        </div>
      </div>

      {/* Error banner */}
      {error && !error.includes('TWENTY_API_KEY') && (
        <div className="px-5 py-2 text-sm flex items-center gap-2" style={{ background: 'rgba(239,68,68,0.08)', color: '#DC2626', borderBottom: '1px solid rgba(239,68,68,0.15)' }}>
          <AlertCircle size={14} />
          {error}
        </div>
      )}

      {/* Table */}
      <div className="flex-1 overflow-auto">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr style={{ background: 'var(--bg-card)', borderBottom: '1px solid var(--border)' }}>
              {[
                { label: 'Name', icon: User },
                { label: 'Email', icon: Mail },
                { label: 'Phone', icon: Phone },
                { label: 'Company', icon: Building2 },
                { label: 'City', icon: MapPin },
                { label: '', icon: null },
              ].map(({ label, icon: Icon }) => (
                <th
                  key={label}
                  className="text-left px-5 py-4 text-[12px] font-semibold uppercase tracking-wider whitespace-nowrap"
                  style={{ color: 'var(--text-xs)', position: 'sticky', top: 0, background: 'var(--bg-card)', zIndex: 1, borderBottom: '1px solid var(--border)' }}
                >
                  <span className="flex items-center gap-1.5">
                    {Icon && <Icon size={12} />}
                    {label}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading && contacts.length === 0 ? (
              Array.from({ length: 15 }).map((_, i) => (
                <tr key={i} style={{ borderBottom: '1px solid var(--border)' }}>
                  {Array.from({ length: 6 }).map((_, j) => (
                    <td key={j} className="px-5 py-4">
                      <div
                        className="h-4 rounded animate-pulse"
                        style={{ background: 'var(--border)', width: j === 5 ? '60px' : ['75%','55%','65%','80%','45%'][j] }}
                      />
                    </td>
                  ))}
                </tr>
              ))
            ) : contacts.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 py-16 text-center text-sm" style={{ color: 'var(--text-muted)' }}>
                  {debouncedSearch ? `No contacts matching "${debouncedSearch}"` : 'No contacts found'}
                </td>
              </tr>
            ) : contacts.map((c, i) => (
              <tr
                key={c.id}
                style={{
                  borderBottom: '1px solid var(--border)',
                  background: i % 2 === 0 ? 'var(--bg-card)' : 'var(--bg)',
                }}
                onMouseEnter={e => (e.currentTarget.style.background = 'var(--bg-card-hover)')}
                onMouseLeave={e => (e.currentTarget.style.background = i % 2 === 0 ? 'var(--bg-card)' : 'var(--bg)')}
              >
                <td className="px-5 py-4 font-semibold" style={{ color: 'var(--text)' }}>
                  <div className="flex items-center gap-2.5">
                    <div
                      className="w-7 h-7 rounded-full flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0"
                      style={{ background: 'var(--gb-gradient)' }}
                    >
                      {(c.name?.firstName?.[0] || c.name?.lastName?.[0] || '?').toUpperCase()}
                    </div>
                    {fullName(c)}
                  </div>
                </td>
                <td className="px-5 py-4" style={{ color: 'var(--text-muted)' }}>
                  {c.emails?.primaryEmail || '—'}
                </td>
                <td className="px-5 py-4" style={{ color: 'var(--text-muted)' }}>
                  {c.phones?.primaryPhoneNumber || '—'}
                </td>
                <td className="px-5 py-4" style={{ color: 'var(--text-muted)' }}>
                  {c.company?.name?.value || '—'}
                </td>
                <td className="px-5 py-4" style={{ color: 'var(--text-muted)' }}>
                  {c.city || '—'}
                </td>
                <td className="px-5 py-4">
                  <a
                    href={`${TOOLS.crm}/objects/people/${c.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 rounded-md inline-flex transition-colors"
                    style={{ color: 'var(--text-xs)' }}
                    onMouseEnter={e => {
                      (e.currentTarget as HTMLAnchorElement).style.color = 'var(--gb-pink)';
                      (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(244,114,182,0.08)';
                    }}
                    onMouseLeave={e => {
                      (e.currentTarget as HTMLAnchorElement).style.color = 'var(--text-xs)';
                      (e.currentTarget as HTMLAnchorElement).style.background = 'transparent';
                    }}
                  >
                    <ExternalLink size={13} />
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div
        className="flex items-center justify-between px-6 py-4 border-t flex-shrink-0"
        style={{ background: 'var(--bg-card)', borderColor: 'var(--border)' }}
      >
        <span className="text-sm" style={{ color: 'var(--text-muted)' }}>
          Page {page} of {totalPages || 1} · {totalCount.toLocaleString()} total
        </span>
        <div className="flex items-center gap-2">
          <button
            onClick={prevPage}
            disabled={page === 1 || loading}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm border transition-colors disabled:opacity-40"
            style={{ border: '1px solid var(--border)', color: 'var(--text)', background: 'var(--bg-card)', fontFamily: 'inherit' }}
          >
            <ChevronLeft size={14} />
            Previous
          </button>
          <button
            onClick={() => {
              const lastEdge = contacts[contacts.length - 1];
              if (lastEdge && hasNext) nextPage(lastEdge.id);
            }}
            disabled={!hasNext || loading}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm border transition-colors disabled:opacity-40"
            style={{ border: '1px solid var(--border)', color: 'var(--text)', background: 'var(--bg-card)', fontFamily: 'inherit' }}
          >
            Next
            <ChevronRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
