import { ServicePortal } from '@/components/ServicePortal';
import { TOOLS } from '@/lib/config';

export default function PipelinePage() {
  return (
    <ServicePortal
      icon="⚡"
      title="Sales Pipeline"
      description="See every deal at a glance. Drag and drop deals through stages, set follow-up dates, and never let a lead slip through the cracks."
      features={[
        'View all deals on a visual board',
        'Drag deals from stage to stage',
        'Set deal values and close dates',
        'Get reminders for follow-ups',
        'See your pipeline at a glance',
      ]}
      href={`${TOOLS.crm}/objects/opportunities`}
      status="online"
      color={{
        from: 'from-orange-400',
        to: 'to-amber-500',
        bg: 'bg-orange-50',
        text: 'text-orange-500',
      }}
    />
  );
}
