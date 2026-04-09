import { IframePage } from '@/components/IframePage';
import { TOOLS } from '@/lib/config';

export default function PipelinePage() {
  return <IframePage src={`${TOOLS.crm}/objects/opportunities`} title="Pipeline" />;
}
