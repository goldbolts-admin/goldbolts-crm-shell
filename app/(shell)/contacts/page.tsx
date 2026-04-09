import { IframePage } from '@/components/IframePage';
import { TOOLS } from '@/lib/config';

export default function ContactsPage() {
  return <IframePage src={`${TOOLS.crm}/objects/people`} title="Contacts" />;
}
