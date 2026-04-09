import { IframePage } from '@/components/IframePage';
import { TOOLS } from '@/lib/config';

export default function BillingPage() {
  return <IframePage src={TOOLS.billing} title="Billing" />;
}
