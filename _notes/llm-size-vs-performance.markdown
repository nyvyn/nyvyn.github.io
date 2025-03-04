---
layout: note
title: LLM size compared to performance
description: A look at how size and performance have evolved in LLMs
date: 2025-1-2
status: Sprouting
references:
  - >-
    [Abdin et al. (2024). Phi-3 technical report: A highly capable language model locally on your phone](https://arxiv.org/abs/2404.14219)
  - >-
    [Anthropic (2024). Claude 3.5 sonnet](https://www.anthropic.com/claude/sonnet)
  - >-
    [Google (2024). Gemini 2.0 Flash](https://blog.google/technology/ai/gemini-2-0/)
  - >-
    [OpenAI (2023a). GPT-3.5-turbo](https://platform.openai.com/docs/models#gpt-3-5-turbo)
  - >-
    [OpenAI (2023b). GPT-4](https://platform.openai.com/docs/models#gpt-4-turbo-and-gpt-4)
  - >-
    [OpenAI (2024a). GPT-4o](https://platform.openai.com/docs/models#gpt-4o)
  - >-
    [OpenAI (2024b). GPT-4o mini](https://platform.openai.com/docs/models#gpt-4o-mini)
  - >-
    [OpenAI (2024c). o1-mini](https://platform.openai.com/docs/models#o1)
  - >-
    [OpenAI (2024d). o1-preview](https://platform.openai.com/docs/models#o1-preview)
  - >-
    [Singhal et al. (2023). Med-PaLM: Large Language Models Encode Clinical Knowledge](https://arxiv.org/abs/2212.13138)
  - >-
    [Zhang et al. (2024). Medec: A benchmark for medical error detection and correction in clinical notes](https://arxiv.org/pdf/2412.19260)
---


| Model                | Token Cost In/Out | Prompt Caching | Context Window Size | Model Size |
|----------------------|-------------------|----------------|---------------------|------------|
| Phi-3-7B             | $0.0001 / $0.0001 | Yes            | 2048 tokens         | 7B         |
| Claude 3.5 Sonnet    | $0.0002 / $0.0002 | Yes            | 4096 tokens         | 175B       |
| Gemini 2.0 Flash     | $0.0003 / $0.0003 | No             | 8192 tokens         | Unknown    |
| ChatGPT (GPT-3.5)    | $0.0004 / $0.0004 | Yes            | 4096 tokens         | 175B       |
| GPT-4                | $0.0005 / $0.0005 | Yes            | 8192 tokens         | 1.76T      |
| GPT-4o               | $0.0006 / $0.0006 | Yes            | 4096 tokens         | 200B       |
| GPT-4o-mini          | $0.0007 / $0.0007 | No             | 2048 tokens         | 8B         |
| o1-mini              | $0.0008 / $0.0008 | Yes            | 4096 tokens         | 100B       |
| o1-preview           | $0.0009 / $0.0009 | No             | 8192 tokens         | 300B       |

> 1. Phi-3-7B, a Small Language Model (SLM) with 7 billion parameters [Abdin et al., 2024]
> 2. Claude 3.5 Sonnet (2024-10-22), the latest model (≈175B parameters) from the Claude 3.5 family offering
>    state-of-the-art performance across several coding, vision, and reasoning tasks [Anthropic, 2024].
> 3. Gemini 2.0 Flash: the latest/most advanced Gemini model [Google, 2024]. Other Google models such as
>    Med-PaLM models (540B) [Singhal et al., 2023], designed for medical purposes, were not publicly available.
> 4. ChatGPT (≈175B) [OpenAI, 2023a] and GPT-4 (≈1.76T), a "high-intelligence" model [OpenAI, 2023b].
> 5. GPT-4o (≈200B) providing "GPT-4-level intelligence but faster" [OpenAI, 2024a] and the GPT-4o-mini
>    (gpt-4o-2024-05-13) small model (≈8B parameters) for focused tasks [OpenAI, 2024b].
> 6. The latest o1-mini (o1-mini-2024-09-12) model (≈100B) [OpenAI, 2024c], and o1-preview (o1-preview-2024-
>    09-12) model (≈300B) with "new AI capabilities" for complex reasoning tasks [OpenAI, 2024d]. 
> 
> The exact numbers of parameters of several LLMs (e.g., GPT, Gemini 2.0 Flash) have not been publicly disclosed yet.
> Most numbers of parameters are estimate reported to provide more context for understanding the models’ performance.

From Zhang et al. (2024)
