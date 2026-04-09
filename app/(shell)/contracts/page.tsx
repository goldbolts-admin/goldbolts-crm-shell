import { ServicePortal } from '@/components/ServicePortal';
import { TOOLS } from '@/lib/config';

export default function ContractsPage() {
  return (
    <ServicePortal
      icon="📝"
      title="Contracts"
      description="Send documents for e-signature in minutes. No printing, no scanning — just sign."
      features={[
        'Upload any PDF or Word document',
        'Send to clients for e-signature via email',
        'Track signing status in real time',
        'Download signed copies anytime',
        'Legally binding e-signatures',
      ]}
      href={TOOLS.contracts}
      status="online"
      color="#6366F1"
    />
  );
}
