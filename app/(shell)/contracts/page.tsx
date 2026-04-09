import { ServicePortal } from '@/components/ServicePortal';
import { TOOLS } from '@/lib/config';

export default function ContractsPage() {
  return (
    <ServicePortal
      icon="📝"
      title="Contracts"
      description="Send documents for e-signature in minutes. No printing, no scanning — just click, sign, done."
      features={[
        'Upload any document (PDF, Word) to sign',
        'Send to clients for signature via email',
        'Track who has signed and who hasn\'t',
        'Download signed copies anytime',
        'Legally binding e-signatures',
      ]}
      href={TOOLS.contracts}
      status="online"
      color={{
        from: 'from-indigo-400',
        to: 'to-blue-500',
        bg: 'bg-indigo-50',
        text: 'text-indigo-500',
      }}
    />
  );
}
