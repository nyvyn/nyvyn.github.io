---
layout: post
title: Detecting Hallucinations with Entropy
tags: [ "machine learning" ]
references:
  - >-
    [Co Tran (2025). Detecting Hallucinations in LLM Function Calling with Entropy](https://www.archgw.com/blogs/detecting-hallucinations-in-llm-function-calling-with-entropy-and-varentropy)
---

In short, those models that provide log probability and function calling in theory can be used
together to detect hallucinations. Interesting idea.

> Entropy measures uncertainty. In LLMs, it tells us how "sure" the model is about the next token. 
> When the model is confident (e.g., it knows the next token should be <tool_call>), entropy is low. 
> When it’s unsure (e.g., hesitating between get_weather or get_forecast), entropy is high. 
> High entropy means the model is guessing, which could lead to errors.

> VarEntropy goes a step further. Instead of measuring uncertainty at a single token, it tracks how uncertainty 
> changes across a distribution of tokens. If the model’s confidence is steady 
> (e.g., generating a well-structured tool call), VarEntropy is low. If confidence fluctuates 
> (e.g., the model is sure about some tokens but unsure about others), VarEntropy is high. 
> This inconsistency often signals a problem