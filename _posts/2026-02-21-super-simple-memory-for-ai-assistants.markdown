---
layout: post
title: Super Simple Memory for AI Assistants
tags: ["artificial intelligence", "software engineering", "agents"]
---

I'm working on a research effort, paired with an AI coding agent, and I'm tracking the results of the changes over time. I recognize there are more sophisticated memory management approaches (eval services, vector stores, graph databases, tiered journals, etc.), but I'm having good success with just a simple log that I archive periodically.

What do you use for memory management with AI assistants?

——
Place in AGENTS .md
——

Memory Discipline

Keep a project memory log in MEMORY .md at the repository root.

At the start of each task, read the most recent entries in MEMORY .md.

As work progresses, append short factual updates after meaningful changes.

Include a timestamp for each entry in YYYY-MM-DD HH:MM (local time).

Keep entries concise (1-4 lines per update), and do not store secrets or credentials.