'use client';
import { useTheme } from './ThemeProvider';

// GOLDBOL + [T] + S — T is the bolt, gold, with flat bar above (🔩 side view)
// Gradient text = glossy effect for both black letters and gold T

export function GoldboltsLogo({ collapsed = false }: { collapsed?: boolean }) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  // Glossy black (light) / glossy silver-white (dark)
  const letterGradient = isDark
    ? 'linear-gradient(180deg, #FFFFFF 0%, #CBD5E1 50%, #94A3B8 100%)'
    : 'linear-gradient(180deg, #555555 0%, #111111 35%, #000000 100%)';

  // Glossy gold — same in both modes
  const goldGradient = 'linear-gradient(180deg, #FFF2A0 0%, #FFD700 28%, #D4A017 62%, #8B6914 100%)';

  // Bolt head bar gradient (horizontal shine)
  const boltHeadGradient = 'linear-gradient(90deg, #8B6914 0%, #FFD700 40%, #FFF2A0 60%, #D4A017 80%, #8B6914 100%)';

  const gradientText = {
    background: letterGradient,
    WebkitBackgroundClip: 'text' as const,
    WebkitTextFillColor: 'transparent' as const,
    backgroundClip: 'text' as const,
  };

  const goldText = {
    background: goldGradient,
    WebkitBackgroundClip: 'text' as const,
    WebkitTextFillColor: 'transparent' as const,
    backgroundClip: 'text' as const,
  };

  const baseStyle = {
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontWeight: 800,
    lineHeight: 1,
    letterSpacing: '0.03em',
  } as const;

  if (collapsed) {
    return (
      <div
        className="relative flex items-center justify-center select-none mx-auto"
        style={{ width: 28, height: 28 }}
        aria-label="Goldbolts"
      >
        {/* Bolt head — wider flat bar above T */}
        <span
          aria-hidden
          style={{
            position: 'absolute',
            top: 1,
            left: '50%',
            transform: 'translateX(-50%)',
            width: 18,
            height: 3,
            background: boltHeadGradient,
            borderRadius: 1,
          }}
        />
        <span style={{ ...baseStyle, fontSize: 20, ...goldText }}>T</span>
      </div>
    );
  }

  return (
    <div
      className="flex items-center justify-center select-none"
      aria-label="Goldbolts"
      style={{ ...baseStyle, fontSize: 14, display: 'inline-flex', alignItems: 'center' }}
    >
      {/* GOLDBOL */}
      <span style={gradientText}>GOLDBOL</span>

      {/* T — the bolt */}
      <span className="relative inline-block" style={goldText}>
        {/* Bolt head — flat bar above T crossbar */}
        <span
          aria-hidden
          style={{
            position: 'absolute',
            top: -4,
            left: '50%',
            transform: 'translateX(-50%)',
            width: '140%',
            height: 2,
            background: boltHeadGradient,
            borderRadius: 1,
            display: 'block',
          }}
        />
        T
      </span>

      {/* S */}
      <span style={gradientText}>S</span>
    </div>
  );
}
