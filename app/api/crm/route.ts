// GraphQL proxy for Twenty CRM — keeps API key server-side
export const runtime = 'nodejs';

const TWENTY_URL = process.env.TWENTY_URL || 'https://crm.goldbolts.org';
const TWENTY_API_KEY = process.env.TWENTY_API_KEY || '';

export async function POST(req: Request) {
  if (!TWENTY_API_KEY) {
    return Response.json(
      { error: 'TWENTY_API_KEY not configured. Add it to your environment variables.' },
      { status: 503 }
    );
  }

  const body = await req.json();

  try {
    const res = await fetch(`${TWENTY_URL}/api`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${TWENTY_API_KEY}`,
      },
      body: JSON.stringify(body),
    });

    const data = await res.json();
    return Response.json(data);
  } catch (err) {
    return Response.json(
      { error: `Failed to reach Twenty CRM: ${(err as Error).message}` },
      { status: 502 }
    );
  }
}
