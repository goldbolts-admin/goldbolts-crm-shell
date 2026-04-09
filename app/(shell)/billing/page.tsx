import { ServicePortal } from '@/components/ServicePortal';
import { TOOLS } from '@/lib/config';

export default function BillingPage() {
  return (
    <ServicePortal
      icon="💳"
      title="Billing"
      description="Send invoices, track payments, and manage client subscriptions in one dashboard."
      features={[
        'Create and send professional invoices',
        'Track who has paid and who hasn\'t',
        'Set up recurring billing for retainers',
        'Accept online payments',
        'Download financial reports',
      ]}
      href={TOOLS.billing}
      status="online"
      color="#10B981"
    />
  );
}
