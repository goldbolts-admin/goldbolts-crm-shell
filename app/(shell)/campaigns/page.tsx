import { ServicePortal } from '@/components/ServicePortal';
import { TOOLS } from '@/lib/config';

export default function CampaignsPage() {
  // Listmonk admin panel is at /admin path
  const adminUrl = `${TOOLS.campaigns}/admin`;

  return (
    <ServicePortal
      icon="📧"
      title="Email Campaigns"
      description="Send beautiful email campaigns to your leads and customers. Schedule sequences, track opens, and grow your pipeline with great emails."
      features={[
        'Create and send email campaigns',
        'Build automated follow-up sequences',
        'See who opened and clicked your emails',
        'Segment your list by interest or behavior',
        'Import and manage subscriber lists',
      ]}
      href={adminUrl}
      status="online"
      color={{
        from: 'from-purple-400',
        to: 'to-violet-500',
        bg: 'bg-purple-50',
        text: 'text-purple-500',
      }}
    />
  );
}
