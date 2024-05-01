---
layout: note
title: AI that can learn
description: >-
  A review of ways to move beyond frozen LLMs
---

Today's LLMs are trained and then frozen in time. What changes when they can continuously learn?

While there is a trend in decreasing size of LLMs with capabilities matching their larger siblings,
the reality is that the weights for a useful LLM are many gigabytes large.

In turn, training these larger and more capable LLMs requires the coordination of many GPUs.
The result is costly, energy intensive, and lengthy.

## In-Context Learning

Without the ability to modify the weights of the LLM, we're left with manipulating the data sent
at runtime to the LLM in advance of the question or task posed to the language model.

This is the context window—which ranges from 4k tokens to a million tokens in length.

This "learning" is termed "in-context learning".
And due to the transient nature, it introduces a tremendous cost
over time as the context is sent each time turn of a conversation.

