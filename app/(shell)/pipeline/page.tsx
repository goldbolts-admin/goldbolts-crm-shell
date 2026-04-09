import { ServicePortal } from '@/components/ServicePortal';
import { TOOLS } from '@/lib/config';

export default function PipelinePage() {
  return (
    <ServicePortal
      icon="⚡"
      title="Sales Pipeline"
      description="Visualize deals, drag them through stages, and never let a lead slip through."
      features={[
        'View all deals on a Kanban board',
        'Drag deals from stage to stage',
        'Set deal values and expected close dates',
        'Get reminders for follow-ups',
        'Track pipeline velocity and conversion',
      ]}
      href={`${TOOLS.crm}/objects/opportunities`}
      status="online"
      color="#F97316"
    />
  );
}
