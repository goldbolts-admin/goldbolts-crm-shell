import { ServicePortal } from '@/components/ServicePortal';
import { TOOLS } from '@/lib/config';

export default function ContactsPage() {
  return (
    <ServicePortal
      icon="👥"
      title="Contacts & CRM"
      description="Manage all your contacts, companies, and relationships. See every conversation, deal, and touchpoint in one place."
      features={[
        'Add and organize contacts and companies',
        'See full contact history and notes',
        'Track emails, calls, and meetings',
        'Import contacts from spreadsheets',
        'Filter and search your entire list',
      ]}
      href={`${TOOLS.crm}/objects/people`}
      status="online"
      color={{
        from: 'from-pink-400',
        to: 'to-rose-500',
        bg: 'bg-pink-50',
        text: 'text-pink-500',
      }}
    />
  );
}
