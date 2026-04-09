import { IframePage } from '@/components/IframePage';
import { TOOLS } from '@/lib/config';

export default function DocsPage() {
  return <IframePage src={TOOLS.docs} title="Docs" />;
}
