---
layout: post
title: "Introducing Oner Swarms"
tags: [ "artificial intelligence" ]
---

**Oner** is an AI-aware notebook, built on the idea that agents should be an integral part of every day creative work.
**Swarms** are AI agents that can cooperate to accomplish a common goal or purpose.

See Oner here: [https://www.oner.chat](https://www.oner.chat "Oner Chat").

<!--more-->

In a typical AI chat session without tools, the format is commonly call and response: that is, the user asks a question
and the AI makes its best attempt at an answer.

When the AI is provided tools, such as web search and image generation, then they the AI is an **Agent**. This style of
interaction still follows the format of call and response: where the individual asks a question or makes a request, and
the AI responds - but now that response might be in a loop behind the scenes before the final result is shared with the
requester.

For example, to make an image, the AI might call an image generation tool (this is a single loop). Or, a more
complicated request might be to search the web, which could result in multiple loops: first requesting links from a
search engine following by one or more cycles retrieving information from those links.

**Swarms**, allow these tool-using agents to cooperate in cycles: that is, one or more loops strung together, with the
ability to choose the best agent for the task at any point in processing the request.

The advantage of a Swarm over a single looping Agent is improved reliability: by restricting the number of tools and the
corresponding instructions on how to use these tools, the AI is often better able to accomplish the task.

You can think of these as a graph of agents cooperating, with the ability to skip to different nodes of the graph as
needed.

In Oner, Swarms make it easier for the creator to guide the AI agents to reliably accomplish a specific goal. And the
creation of the agents and results conditional cycles is offered in a straightforward graphical format - making it
available for anyone to create their own Swarms without writing code.

Check out [Oner](https://www.oner.chat "Oner Chat") to learn more.