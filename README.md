# mcp-hubspot

HubSpot MCP Pack

Part of the [Pipeworx](https://pipeworx.io) open MCP gateway.

## Tools

| Tool | Description |
|------|-------------|
| `hs_list_contacts` | List contacts from HubSpot CRM. Supports pagination via limit and after cursor. |
| `hs_get_contact` | Get a single HubSpot contact by ID. |
| `hs_search_contacts` | Search HubSpot contacts by query string. Matches against name, email, and other default searchable properties. |
| `hs_list_companies` | List companies from HubSpot CRM. Supports pagination via limit and after cursor. |
| `hs_get_company` | Get a single HubSpot company by ID. |
| `hs_list_deals` | List deals from HubSpot CRM. Supports pagination via limit and after cursor. |
| `hs_get_deal` | Get a single HubSpot deal by ID. |

## Quick Start

Add to your MCP client config:

```json
{
  "mcpServers": {
    "hubspot": {
      "url": "https://gateway.pipeworx.io/hubspot/mcp"
    }
  }
}
```

Or use the CLI:

```bash
npx pipeworx use hubspot
```

## License

MIT
