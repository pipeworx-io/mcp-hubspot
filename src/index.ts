interface McpToolDefinition {
  name: string;
  description: string;
  inputSchema: {
    type: 'object';
    properties: Record<string, unknown>;
    required?: string[];
  };
}

interface McpToolExport {
  tools: McpToolDefinition[];
  callTool: (name: string, args: Record<string, unknown>) => Promise<unknown>;
}

/**
 * HubSpot MCP Pack
 *
 * Requires OAuth connection — gateway injects credentials via _context.hubspot.
 * Tools: list/get/search contacts, list/get companies, list/get deals.
 */


interface HubSpotContext {
  hubspot?: { accessToken: string };
}

const BASE_URL = 'https://api.hubapi.com/crm/v3/objects';

async function hsFetch(ctx: HubSpotContext, path: string) {
  if (!ctx.hubspot) {
    return { error: 'connection_required', message: 'Connect your HubSpot account at https://pipeworx.io/account' };
  }
  const { accessToken } = ctx.hubspot;
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`HubSpot API error (${res.status}): ${text}`);
  }
  return res.json();
}

async function hsPost(ctx: HubSpotContext, path: string, body: unknown) {
  if (!ctx.hubspot) {
    return { error: 'connection_required', message: 'Connect your HubSpot account at https://pipeworx.io/account' };
  }
  const { accessToken } = ctx.hubspot;
  const res = await fetch(`${BASE_URL}${path}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`HubSpot API error (${res.status}): ${text}`);
  }
  return res.json();
}

const tools: McpToolExport['tools'] = [
  {
    name: 'hs_list_contacts',
    description: 'List contacts from HubSpot CRM. Supports pagination via limit and after cursor.',
    inputSchema: {
      type: 'object' as const,
      properties: {
        limit: { type: 'number', description: 'Maximum number of contacts to return (default 10, max 100)' },
        after: { type: 'string', description: 'Pagination cursor from a previous response' },
      },
    },
  },
  {
    name: 'hs_get_contact',
    description: 'Get a single HubSpot contact by ID.',
    inputSchema: {
      type: 'object' as const,
      properties: {
        id: { type: 'string', description: 'HubSpot contact ID' },
      },
      required: ['id'],
    },
  },
  {
    name: 'hs_search_contacts',
    description: 'Search HubSpot contacts by query string. Matches against name, email, and other default searchable properties.',
    inputSchema: {
      type: 'object' as const,
      properties: {
        query: { type: 'string', description: 'Search query (e.g., name or email)' },
        limit: { type: 'number', description: 'Maximum number of results (default 10, max 100)' },
      },
      required: ['query'],
    },
  },
  {
    name: 'hs_list_companies',
    description: 'List companies from HubSpot CRM. Supports pagination via limit and after cursor.',
    inputSchema: {
      type: 'object' as const,
      properties: {
        limit: { type: 'number', description: 'Maximum number of companies to return (default 10, max 100)' },
        after: { type: 'string', description: 'Pagination cursor from a previous response' },
      },
    },
  },
  {
    name: 'hs_get_company',
    description: 'Get a single HubSpot company by ID.',
    inputSchema: {
      type: 'object' as const,
      properties: {
        id: { type: 'string', description: 'HubSpot company ID' },
      },
      required: ['id'],
    },
  },
  {
    name: 'hs_list_deals',
    description: 'List deals from HubSpot CRM. Supports pagination via limit and after cursor.',
    inputSchema: {
      type: 'object' as const,
      properties: {
        limit: { type: 'number', description: 'Maximum number of deals to return (default 10, max 100)' },
        after: { type: 'string', description: 'Pagination cursor from a previous response' },
      },
    },
  },
  {
    name: 'hs_get_deal',
    description: 'Get a single HubSpot deal by ID.',
    inputSchema: {
      type: 'object' as const,
      properties: {
        id: { type: 'string', description: 'HubSpot deal ID' },
      },
      required: ['id'],
    },
  },
];

async function callTool(name: string, args: Record<string, unknown>): Promise<unknown> {
  const context = (args._context ?? {}) as HubSpotContext;
  delete args._context;

  switch (name) {
    case 'hs_list_contacts': {
      const params = new URLSearchParams();
      if (args.limit) params.set('limit', String(args.limit));
      if (args.after) params.set('after', args.after as string);
      const qs = params.toString();
      return hsFetch(context, `/contacts${qs ? `?${qs}` : ''}`);
    }
    case 'hs_get_contact':
      return hsFetch(context, `/contacts/${args.id}`);
    case 'hs_search_contacts': {
      const body: Record<string, unknown> = { query: args.query };
      if (args.limit) body.limit = args.limit;
      return hsPost(context, '/contacts/search', body);
    }
    case 'hs_list_companies': {
      const params = new URLSearchParams();
      if (args.limit) params.set('limit', String(args.limit));
      if (args.after) params.set('after', args.after as string);
      const qs = params.toString();
      return hsFetch(context, `/companies${qs ? `?${qs}` : ''}`);
    }
    case 'hs_get_company':
      return hsFetch(context, `/companies/${args.id}`);
    case 'hs_list_deals': {
      const params = new URLSearchParams();
      if (args.limit) params.set('limit', String(args.limit));
      if (args.after) params.set('after', args.after as string);
      const qs = params.toString();
      return hsFetch(context, `/deals${qs ? `?${qs}` : ''}`);
    }
    case 'hs_get_deal':
      return hsFetch(context, `/deals/${args.id}`);
    default:
      throw new Error(`Unknown tool: ${name}`);
  }
}

export default { tools, callTool, meter: { credits: 10 }, provider: 'hubspot' } satisfies McpToolExport;
