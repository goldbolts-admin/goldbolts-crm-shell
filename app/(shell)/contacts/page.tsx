import { ServicePortal } from '@/components/ServicePortal';
import { TOOLS } from '@/lib/config';

export default function ContactsPage() {
  return (
    <ServicePortal
      icon="👥"
      title="Contacts & CRM"
      description="Manage all your contacts, companies, and relationships in one place."
      features={[
        'Add and organize contacts and companies',
        'See full contact history and notes',
        'Track emails, calls, and meetings',
        'Import contacts from spreadsheets',
        'Filter and search your entire list',
      ]}
      href={`${TOOLS.crm}/objects/people`}
      status="online"
      color="#F472B6"
    />
  );
}
