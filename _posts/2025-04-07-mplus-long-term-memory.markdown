---
layout: post
title: M+ Long-term memory for LLMs
tags: [ "memory" ]
references:
  - >-
    [Yu Wang et al (2025). M+: Extending MemoryLLM with Scalable Long-Term Memory](https://arxiv.org/abs/2502.00592)
  - >-
    [Yu Wang et al (2024). MEMORYLLM: Towards Self-Updatable Large Language Models](https://arxiv.org/abs/2402.04624)
  - >-
    [MemoryLLM and M+ Github Repo](https://github.com/wangyu-ustc/MemoryLLM)
  - >-
    [Zeyu Zhang et al (2024) A Survey on the Memory Mechanism of Large Language Model based Agents](https://arxiv.org/abs/2404.13501)
---

The past couple of years have shown an exponential increase in the intelligence and knowledge of large language models.
And we're seeing increasingly powerful foundational models that can interpret and respond
with images, text, voice, and video.

These intelligences are helping us in our daily work, assisting with new science discoveries, creating art and music,
and helping us learn and make sense of an ever-increasingly complex world.

Notably, all of these advances are despite a shared constraint: these models lack memory of any prior interactions.

Currently, this limitation is  mitigated through techniques such as:
- Sending complete chat histories back to the model with each new interaction.
- Compiling condensed "memories" to prepend into the context window.
- Employing retrieval processes to selectively pull relevant past interactions from a larger stored corpus.

These strategies help models simulate memory, though they remain constrained by context window size and efficiency limitations.