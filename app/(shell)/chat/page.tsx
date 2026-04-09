import { IframePage } from '@/components/IframePage';
import { TOOLS } from '@/lib/config';

export default function ChatPage() {
  return <IframePage src={TOOLS.chat} title="Team Chat" />;
}
