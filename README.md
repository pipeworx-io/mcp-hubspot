# mcp-hubspot

HubSpot MCP Pack

Part of [Pipeworx](https://pipeworx.io) — an MCP gateway connecting AI agents to 250+ live data sources.

## Tools

| Tool | Description |
|------|-------------|
| `hs_list_contacts` | Browse all contacts in your HubSpot workspace. Returns contact IDs, names, emails, and properties. Paginate with limit and after parameters. |
| `hs_get_contact` | Fetch a contact\'s full profile by ID. Returns name, email, phone, company, and all custom properties. |
| `hs_search_contacts` | Search contacts by name, email, or custom properties. Use when you need to find specific people in your database. |
| `hs_list_companies` | Browse all companies in your HubSpot workspace. Returns company IDs, names, domains, and properties. Paginate with limit and after parameters. |
| `hs_get_company` | Fetch a company\'s full profile by ID. Returns name, domain, industry, revenue, and all custom properties. |
| `hs_list_deals` | Browse all deals in your HubSpot workspace. Returns deal IDs, names, amounts, pipeline stages, and close dates. Paginate with limit and after parameters. |
| `hs_get_deal` | Fetch a deal\'s full details by ID. Returns deal name, amount, stage, owner, and linked contacts and companies. |

## Quick Start

Add to your MCP client (Claude Desktop, Cursor, Windsurf, etc.):

```json
{
  "mcpServers": {
    "hubspot": {
      "url": "https://gateway.pipeworx.io/hubspot/mcp"
    }
  }
}
```

Or connect to the full Pipeworx gateway for access to all 250+ data sources:

```json
{
  "mcpServers": {
    "pipeworx": {
      "url": "https://gateway.pipeworx.io/mcp"
    }
  }
}
```

## Using with ask_pipeworx

Instead of calling tools directly, you can ask questions in plain English:

```
ask_pipeworx({ question: "your question about Hubspot data" })
```

The gateway picks the right tool and fills the arguments automatically.

## More

- [All tools and guides](https://github.com/pipeworx-io/examples)
- [pipeworx.io](https://pipeworx.io)

## License

MIT
