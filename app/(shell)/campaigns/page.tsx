import { ServicePortal } from '@/components/ServicePortal';
import { TOOLS } from '@/lib/config';

export default function CampaignsPage() {
  return (
    <ServicePortal
      icon="📧"
      title="Email Campaigns"
      description="Send targeted email campaigns, build sequences, and track every open and click."
      features={[
        'Create and send email campaigns',
        'Build automated follow-up sequences',
        'Track opens, clicks, and unsubscribes',
        'Segment your list by behavior or industry',
        'Import and manage subscriber lists',
      ]}
      href={`${TOOLS.campaigns}/admin`}
      status="online"
      color="#8B5CF6"
    />
  );
}
