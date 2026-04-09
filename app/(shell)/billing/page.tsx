import { ServicePortal } from '@/components/ServicePortal';
import { TOOLS } from '@/lib/config';

export default function BillingPage() {
  return (
    <ServicePortal
      icon="💳"
      title="Billing"
      description="Send professional invoices, track payments, and manage client subscriptions — all in one easy dashboard."
      features={[
        'Create and send invoices in seconds',
        'Track who has paid and who hasn\'t',
        'Set up recurring billing for clients',
        'Accept online payments',
        'Download financial reports',
      ]}
      href={TOOLS.billing}
      status="online"
      color={{
        from: 'from-emerald-400',
        to: 'to-teal-500',
        bg: 'bg-emerald-50',
        text: 'text-emerald-500',
      }}
    />
  );
}
