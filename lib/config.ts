export const TOOLS = {
  crm:       process.env.NEXT_PUBLIC_TWENTY_URL  || 'https://crm.goldbolts.org',
  campaigns: process.env.NEXT_PUBLIC_LISTMONK_URL || 'https://campaigns.goldbolts.org',
  chat:      process.env.NEXT_PUBLIC_MATTERMOST_URL || 'https://chat.goldbolts.org',
  calls:     process.env.NEXT_PUBLIC_JITSI_URL   || 'https://meet.goldbolts.org',
  billing:   process.env.NEXT_PUBLIC_BILLING_URL || 'https://billing.goldbolts.org',
  contracts: process.env.NEXT_PUBLIC_DOCUSEAL_URL || 'https://docuseal.goldbolts.org',
  docs:      process.env.NEXT_PUBLIC_OUTLINE_URL || 'https://docs.goldbolts.org',
  pocketbase: process.env.NEXT_PUBLIC_PB_URL     || 'https://pb.goldbolts.org',
} as const;

export const BRAND = {
  name: process.env.NEXT_PUBLIC_BRAND_NAME || 'Goldbolts CRM',
  domain: process.env.NEXT_PUBLIC_BRAND_DOMAIN || 'goldbolts.org',
} as const;
