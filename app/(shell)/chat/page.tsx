import { ServicePortal } from '@/components/ServicePortal';

export default function ChatPage() {
  return (
    <ServicePortal
      icon="💬"
      title="Team Chat"
      description="Real-time messaging for your whole team — channels, direct messages, and file sharing."
      features={[
        'Message your team in real time',
        'Create channels for projects or departments',
        'Share files and images',
        'Get notified about important updates',
        'Works on desktop and mobile',
      ]}
      href="https://chat.goldbolts.org"
      status="setting-up"
      color="#3B82F6"
    />
  );
}
