import { ServicePortal } from '@/components/ServicePortal';
import { TOOLS } from '@/lib/config';

export default function DocsPage() {
  return (
    <ServicePortal
      icon="📚"
      title="Knowledge Base"
      description="Your team's shared brain. Write playbooks, document processes, and store everything your team needs to know."
      features={[
        'Write and organize team documents',
        'Create sales playbooks and templates',
        'Share knowledge across your team',
        'Search everything instantly',
        'Keep everyone on the same page',
      ]}
      href={TOOLS.docs}
      status="setting-up"
      color={{
        from: 'from-rose-400',
        to: 'to-pink-500',
        bg: 'bg-rose-50',
        text: 'text-rose-500',
      }}
    />
  );
}
