import { ServicePortal } from '@/components/ServicePortal';

export default function ChatPage() {
  return (
    <ServicePortal
      icon="💬"
      title="Team Chat"
      description="Real-time messaging for your whole team. Share updates, coordinate on deals, and keep everyone in sync — all in one place."
      features={[
        'Message your team in real time',
        'Create channels for different projects',
        'Share files and images',
        'Get notified about important updates',
        'Works on phone and desktop',
      ]}
      href="https://chat.goldbolts.org"
      status="setting-up"
      color={{
        from: 'from-blue-400',
        to: 'to-cyan-500',
        bg: 'bg-blue-50',
        text: 'text-blue-500',
      }}
    />
  );
}
