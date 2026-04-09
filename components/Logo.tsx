import { BRAND } from '@/lib/config';

export function Logo({ size = 32 }: { size?: number }) {
  return (
    <div className="flex items-center gap-2.5">
      <svg width={size} height={size} viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="gb-g" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#F9A8D4" />
            <stop offset="100%" stopColor="#FB923C" />
          </linearGradient>
        </defs>
        <polygon points="24,2 43,12 43,36 24,46 5,36 5,12" fill="url(#gb-g)" />
        <path d="M28,10 L16,26 L22,26 L20,38 L32,22 L26,22 Z" fill="white" />
      </svg>
      <span
        className="font-bold tracking-tight"
        style={{
          fontSize: size * 0.56,
          background: 'linear-gradient(135deg, #F472B6, #F97316)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}
      >
        {BRAND.name}
      </span>
    </div>
  );
}
