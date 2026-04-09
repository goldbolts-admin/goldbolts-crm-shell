import { AuthGuard } from '@/components/AuthGuard';
import { AppShell } from '@/components/AppShell';
import { ShellProvider } from '@/components/ShellProvider';

export default function ShellLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthGuard>
      <ShellProvider>
        <AppShell>
          {children}
        </AppShell>
      </ShellProvider>
    </AuthGuard>
  );
}
