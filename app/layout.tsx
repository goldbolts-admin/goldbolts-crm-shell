import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Goldbolts CRM',
  description: 'All-in-one RevOps platform by Goldbolts',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full" suppressHydrationWarning>
      <head>
        {/* Prevent dark-mode flash */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var t=localStorage.getItem('gb-theme');if(t==='dark'){document.documentElement.classList.add('dark');}})()`,
          }}
        />
      </head>
      <body className="h-full">{children}</body>
    </html>
  );
}
