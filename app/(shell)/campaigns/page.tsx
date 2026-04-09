import { IframePage } from '@/components/IframePage';
import { TOOLS } from '@/lib/config';

export default function CampaignsPage() {
  return <IframePage src={TOOLS.campaigns} title="Campaigns" />;
}
