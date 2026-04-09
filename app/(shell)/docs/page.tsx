import { ServicePortal } from '@/components/ServicePortal';
import { TOOLS } from '@/lib/config';

export default function DocsPage() {
  return (
    <ServicePortal
      icon="📚"
      title="Knowledge Base"
      description="Your team's shared brain — playbooks, SOPs, and everything your team needs to know."
      features={[
        'Write and organize team documents',
        'Create sales playbooks and templates',
        'Share knowledge across your team',
        'Search everything instantly',
        'Manage permissions by team or role',
      ]}
      href={TOOLS.docs}
      status="setting-up"
      color="#EC4899"
    />
  );
}
