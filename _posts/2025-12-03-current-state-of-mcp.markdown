---
layout: post
link: "https://www.reddit.com/r/ClaudeAI/comments/1pcyzdi/current_state_of_mcp/"
title: Current state of MCP (quoted)
tags: ["mcp", "model context protocol", "agents"]
---

Source: [Current state of MCP](https://www.reddit.com/r/ClaudeAI/comments/1pcyzdi/current_state_of_mcp/) by u/entrehacker on r/ClaudeAI (posted Wednesday, December 3, 2025 at 2:37 AM)

> Thought I would share some stats about MCP, since I have crawlers over the whole MCP corpus, cataloguing and indexing the MCP server codebases for my MCP chat client.
>
> ### State of the MCP ecosystem
>
> #### Top-line stats
> - Total of 36,039 MCP servers as of December 2025 according to my crawlers. Across 32,762 unique GitHub repos. Note: this undercounts slightly because I don't parse all file sizes and all possible 3P MCP libraries.
> - The median MCP server has 0 stars. 51% have zero. 77% have less than 10. The ecosystem is mostly experimental projects, tutorials, and personal tools.
> - MCP growth exploded in Spring 2025, peaked in June, and has cooled off slightly since. New MCP servers went from 135 / month at launch (Nov 2024), to 5,069 / month in June 2025. Last month (Nov 2025) saw 2,093 new servers.
> - TypeScript dominates: 43% are TS, 20% are Python, 16% are JavaScript. The official SDKs being TS and Python shaped the ecosystem. These are good choices IMO, I'll discuss later. Also Go is only 5%.
> - Half the ecosystem is package managed: 32% are published to npm (npx), 13% to PyPi (uvx), 4% on Docker. The other half require cloning repos and manual setup.
> - 61% of MCP servers are solo projects with zero forks. 16% have no READMEs. Most are one person experimental projects.
> - The top 50 repos account for 60% of all GitHub stars. modelcontextprotocol (Anthropic), Microsoft, AWS, and CloudFlare lead the top servers. But 83% of publishers have only one server. It's a long tail ecosystem.
> - Stdio transport won with 85% share. SSE is growing (9%) for remote/hosted servers. WebSocket, HTTP and other transports are negligible.
> - Big tech is adopting MCP as a feature, not a focus. n8n, VS Code, Next.js, Flowise, Supabase, and Lobe Chat all have MCP integrations now. But they're adding MCP to existing products, not building MCP-first.
> - 29% of servers haven't been updated in 6+ months. Only 27% were touched in the last 30 days. Expect consolidation as abandoned projects fade and winners emerge.
> - Chrome DevTools MCP gained 15k stars in 3 months. The hottest category right now is browser automation and dev tooling integration.
> - Other growing categories are Memory/Context (OpenMemory), Security (MCP Scanner by Cisco**), Finance / Business (**QuickBooks MCP).
> - My corpus: Curates the top ~10% of MCP servers, so the following stats apply to servers we index.
>
> 81% are rated "low risk" by automated safety analysis, using static code analysis tools like semgrep and LLM based labeling mechanism (can go into more detail if you're curious). 6.5% are banned from the platform for dangerous detected patterns (unsafe shell commands, eval, etc.). The ecosystem is generally safe but requires vigilance. On rare occasions I have personally witnessed malware hidden through code obfuscation patterns.
>
> #### Raw category stats
> Note: servers can be tagged in multiple domains so percentages exceed 100%
> - AI / LLM tooling 49.3%
> - Automation / Workflow 18.9%
> - Cloud / DevOps 12.8%
> - Analytics 9.3%
> - Security 8.1%
> - Database 6.5%
> - Messaging 4.2%
> - Finance 4.1%
> - Browser automation 3.6%
> - Blockchain / Crypto 3.0%
>
> #### Recommendations for MCP builders
> - If you're building serious MCP projects, please publish to npm or PyPi. It makes all the difference if you want your project to be taken seriously, and are used in MCP marketplaces for recommendation decisions like ToolPlex.
> - Use TypeScript. Dependencies are cleaner, official SDK support is best there, types are your friend here. Otherwise use Python.
> - Write a real README. Lack of README signals this is not real project. ToolPlex doesn't index servers without it. 16% have no documentation.
> - Don't build another AI wrapper. It's very crowded. Consider serving new niches like Finance, Security, Messaging, other something even more niche.
> - Security patterns are a must, even if the standard is open. With new tools like MCP Scanner by Cisco, security issues will be a non-starter for distributing your servers. Avoid eval(), dynamic shell commands, or anything that looks like code injection. If you need shell, sandbox it.
>
> #### Will MCP survive?
> Note: all of this is my opinion.
>
> Probably yes, but it's still in a "promising but unproven" stage. MCP suffers from a few key issues:
> - MCP month-over-month growth is in decline: Probably saturation from an early builder euphoria.
> - Protocol is missing some things: auth, discovery, confusing stance on the choice of SSE or Stdio. Will a better standard emerge? Will the protocol evolve? That remains to be seen.
> - High abandonment rate: 29% haven't been updated in 6+ months, 27% updated in the last 30 days. This is not alarming, it just means most builders probably don't have a project that catches on and they move on to other things.
> - Abandoned by Anthropic?: Anthropic seemed to have released MCP but moved on to other things like Skills, developer tooling or 1P tool integration in Claude Desktop. IMO the Claude Desktop MCP integration is very ad-hoc -- adding tools is confusing, error prone, and all your added tools still bloat the context.
> - Poor discoverability: Very few are trying to accurately catalogue and separate the 90% poor quality servers. An official registry was created by anthropic, but IMO it's more of a grassroots / community effort. IMO it still lacks standardizations, safety metrics, classification and categorization and thus will lead to MCP marketplaces still needing to curate a lot of their own signals.
>
> MCP has the following positives right now:
> - Big tech adoption. Every major tech company is building an MCP server to integrate with their services.
> - Global "mindshare": MCP is not perfect, but it's the agent-tooling standard everyone is talking about.
> - Simple, implementable spec: The SDK is relatively simple, easy to use, and straightforward to adopt.
>
> ### Final note
> At the end of the day, it's not about the protocol. It's about what you can do with it. Is it solving real problems, or is it a toy?
>
> In my opinion, it's about 90/10. 90% of MCP use cases are novelties: vanity projects meant for organizations to claim "we're using AI" or "we're integrating our services with AI". But the reality is most of these integrations will never be used.
>
> I believe there are truly useful integration patterns to be built on top of MCP, but MCP is just the tooling layer. That's why Anthropic created skills -- tools aren't enough, the agents need context: why are we using these tools, when do I use a tool, etc.
>
> So when you're building with MCP, I think it's wise to keep this in mind. Ask yourself if you're building something truly useful. Is it better for agents to interact with these tools and services than people? What benefits can I get from automating this interaction? And how do I ensure my agents have the context to not just know the tools exist, but know why and when they should use them.
>
> Hype bubbles will come and go, but as models get better, I think the opportunities to create real value will slowly be discovered. It's up to all of us to find the right solutions.
