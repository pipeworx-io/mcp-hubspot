# mcp-hubspot

HubSpot MCP Pack

Part of [Pipeworx](https://pipeworx.io) — an MCP gateway connecting AI agents to 1476+ live data sources.

## Tools

| Tool | Description |
|------|-------------|
| `hs_list_contacts` | Browse all contacts in your HubSpot workspace. Returns contact IDs, names, emails, and properties. Paginate with limit and after parameters. |
| `hs_get_contact` | Fetch a contact's full profile by ID. Returns name, email, phone, company, and all custom properties. |
| `hs_search_contacts` | Search contacts by name, email, or custom properties. Use when you need to find specific people in your database. |
| `hs_list_companies` | Browse all companies in your HubSpot workspace. Returns company IDs, names, domains, and properties. Paginate with limit and after parameters. |
| `hs_get_company` | Fetch a company's full profile by ID. Returns name, domain, industry, revenue, and all custom properties. |
| `hs_list_deals` | Browse all deals in your HubSpot workspace. Returns deal IDs, names, amounts, pipeline stages, and close dates. Paginate with limit and after parameters. |
| `hs_get_deal` | Fetch a deal's full details by ID. Returns deal name, amount, stage, owner, and linked contacts and companies. |

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

### What this endpoint actually serves

`tools/list` at `https://gateway.pipeworx.io/hubspot/mcp` returns the tools in the table
above **plus the shared Pipeworx meta-tools** — `ask_pipeworx`,
`discover_tools`, `search_within`, `remember`/`recall` and the rest of the
gateway-wide set. So the tool count you see is larger than this table: a
single-pack endpoint currently lists roughly 30 shared tools alongside the
pack's own. The connection's `initialize` response states its exact scope, and
is the authoritative answer for a given day.

This is deliberate, not multiplexing by accident. The meta-tools are what let a
scoped connection answer a question this pack does not cover — via
`ask_pipeworx`, which routes across the whole catalog — without you adding a
second MCP server. There is currently no way to mount a pack endpoint without
them; if the extra schemas cost you more context than the routing is worth,
connect to the full gateway once rather than to several pack endpoints.

Or connect to the full Pipeworx gateway to get every pack's tools listed
directly, instead of just this one's:

```json
{
  "mcpServers": {
    "pipeworx": {
      "url": "https://gateway.pipeworx.io/mcp"
    }
  }
}
```

Both URLs reach the same gateway and the same 1476+ data sources. The
only difference is which pack's tools are listed **directly**; `ask_pipeworx`
reaches all of them from either one.

## Using with ask_pipeworx

Instead of calling tools directly, you can ask questions in plain English —
this works on the pack endpoint above as well as on the full gateway:

```
ask_pipeworx({ question: "your question about Hubspot data" })
```

The gateway picks the right tool and fills the arguments automatically.

## More

- [Docs and guides](https://pipeworx.io/docs)
- [pipeworx.io](https://pipeworx.io)

## License

MIT
