---
layout: note
title: LLM costs
description: ...and a few notes on size
date: 2025-3-4
status: Growing
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


| Provider  | Model                | Input Price | Output Price | Context Length | Output Length | Model Size |
|-----------|----------------------|-------------|--------------|----------------|---------------|------------|
| Alibaba   | Qwen2.5-Max          | $1.6        | $6.4         | 32k            | 8k            |            |
| Azure     | phi-3.5              | $0.00013    | $0.00013     | 1k             | 1k            |            |
| Anthropic | Claude 3.5 Haiku     | $0.8        | $4           | 200k           | 8k            |            |
| Anthropic | Claude 3.5 Sonnet    | $3          | $15          | 200k           | 8k            | ≈175B      |
| Anthropic | Claude 3 Haiku       | $0.25       | $1.25        | 200k           | 4k            |            |
| Anthropic | Claude 3 Opus        | $15         | $75          | 200k           | 4k            |            |
| Anthropic | Claude 3 Sonnet      | $3          | $15          | 200k           | 4k            |            |
| DeepSeek  | DeepSeek-R1          | $0.55       | $2.19        | 64k            | 8k            |            |
| DeepSeek  | DeepSeek-V3          | $0.27       | $1.1         | 64k            | 8k            |            |
| Google    | Gemini 1.5 Pro       | $1.25       | $5           | 1m             | 8k            |            |
| Google    | gemini-2.0-flash-exp | $0.15       | $0.15        | 1M             | 1M            |            |
| Google    | gemini-2.5-pro-preview-03-25 | $1.25/$2.50    | $10/$15         | 1,048,576      | 8k            |            |
| Meta      | Llama 3.2 90B        | $0.00204    | $0.00204     | 128k           | 2k            |            |
| Mistral   | Mistral Large 24.11  | $2          | $6           | 128k           | 4k            |            |
| OpenAI    | gpt-45               | $75         | $150         | 128k           | 16k           | ≈200B      | 
| OpenAI    | gpt-4o               | $2.5        | $10          | 128k           | 16k           | ≈200B      |
| OpenAI    | gpt-4o-mini          | $0.15       | $0.6         | 128k           | 16k           | ≈8B        |
| OpenAI    | o1                   | $15         | $60          | 200k           | 100k          |            |
| OpenAI    | o1-mini              | $1.1        | $4.4         | 128k           | 65k           | ≈100B      |
| OpenAI    | o3-mini              | $1.1        | $4.4         | 200k           | 100k          |            |

Cost Notes:
1. Input and output prices are normalized at per million tokens
2. Batch runs with OpenAI are 50% less expensive
3. Cached input prompts are half cost as well

Size Notes:
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
