'use client';

// GOLDBOL T S — T is gold with a diagonal dash above (⚡ effect)
// Collapsed: gold T monogram only

const GOLD = '#D4A017';

export function GoldboltsLogo({ collapsed = false }: { collapsed?: boolean }) {
  if (collapsed) {
    return (
      <div
        className="relative flex items-center justify-center select-none"
        style={{ width: 32, height: 32 }}
        aria-label="Goldbolts"
      >
        <span
          style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontWeight: 800,
            fontSize: 22,
            lineHeight: 1,
            color: GOLD,
            letterSpacing: '-0.02em',
          }}
        >
          T
        </span>
        {/* Dash above — angled like a lightning bolt */}
        <span
          aria-hidden
          style={{
            position: 'absolute',
            top: 3,
            left: '50%',
            transform: 'translateX(-46%) rotate(-22deg)',
            width: 16,
            height: 2.5,
            background: GOLD,
            borderRadius: 2,
          }}
        />
      </div>
    );
  }

  return (
    <span
      className="select-none whitespace-nowrap leading-none"
      style={{
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        fontWeight: 800,
        fontSize: 15,
        letterSpacing: '0.06em',
      }}
      aria-label="Goldbolts"
    >
      {/* GOLDBOLT */}
      <span style={{ color: 'var(--sidebar-text-hover)' }}>GOLDBOLT</span>

      {/* Gold T with dash above */}
      <span
        className="relative inline-block"
        style={{ color: GOLD }}
      >
        {/* Diagonal dash — sits above the T crossbar, angled to read as ⚡ */}
        <span
          aria-hidden
          style={{
            position: 'absolute',
            top: -4,
            left: '50%',
            transform: 'translateX(-50%) rotate(-22deg)',
            width: '110%',
            height: 2,
            background: GOLD,
            borderRadius: 2,
            display: 'block',
          }}
        />
        T
      </span>

      {/* S */}
      <span style={{ color: 'var(--sidebar-text-hover)' }}>S</span>
    </span>
  );
}
