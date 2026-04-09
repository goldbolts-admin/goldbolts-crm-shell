import { IframePage } from '@/components/IframePage';
import { TOOLS } from '@/lib/config';

export default function ContractsPage() {
  return <IframePage src={TOOLS.contracts} title="Contracts" />;
}
