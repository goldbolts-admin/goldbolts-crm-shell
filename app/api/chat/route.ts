import { anthropic } from '@ai-sdk/anthropic';
import { streamText } from 'ai';

export const runtime = 'nodejs';
export const maxDuration = 60;

const SYSTEM = `You are the Goldbolts CRM AI assistant. You help sales and RevOps teams manage contacts, pipeline deals, email campaigns, contracts, and billing — all in one place.

You have deep knowledge of:
- CRM best practices (pipeline management, lead scoring, follow-up sequences)
- Email campaign strategy (subject lines, timing, segmentation)
- Sales process (discovery calls, proposals, closing)
- The Goldbolts CRM stack: Twenty CRM, Listmonk, Mattermost, Jitsi, DocuSeal, Invoice Ninja

Be concise, direct, and actionable. Format responses with markdown when helpful.`;

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = await streamText({
    model: anthropic('claude-sonnet-4-6'),
    system: SYSTEM,
    messages,
    maxTokens: 1024,
  });

  return result.toDataStreamResponse();
}
