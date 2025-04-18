---
layout: post
title: Long‑Term Memory for AI — From Ephemeral Chats to Persistent Minds
tags: [ memory ]
references:
  - "[Yu Wang et al., *M+: Extending MemoryLLM with Scalable Long‑Term Memory* (2025)](https://arxiv.org/abs/2502.00592)"
  - "[Yu Wang et al., *MEMORYLLM: Towards Self‑Updatable Large Language Models* (2024)](https://arxiv.org/abs/2402.04624)"
  - "[MemoryLLM / M+ GitHub](https://github.com/wangyu-ustc/MemoryLLM)"
  - "[Zeyu Zhang et al., *A Survey on the Memory Mechanism of LLM‑Based Agents* (2024)](https://arxiv.org/abs/2404.13501)"
  - "[Ali Modarressi et al., *NoLiMa: Long‑Context Evaluation Beyond Literal Matching* (2025)](https://arxiv.org/abs/2502.05167)"
---

Large language models (LLMs) can now read images, speak, and write code—yet every new session starts with **zero durable
recollection**.  
Developers fight this amnesia by replaying chat logs, injecting summaries, or attaching RAG snippets. These patches
*extend* context but keep memory **outside** the transformer rather than *inside* it.

---

## Why internal memory beats prompt stuffing

- **Integrated reasoning**— stored activations live in the same latent space, so the model *reasons* with them rather
  than pattern‑matching pasted text.
- **Higher signal‑to‑noise**— long‑context benchmarks show sharp accuracy drops when key facts are buried deep in the
  prompt.
- **Fewer retrieval errors**— no external search step that might surface irrelevant passages and derail generation.
- **Built‑in privacy**— nothing leaves the model for a vector database.
- **Quality first, cost second**— latency improves without an embedding‑and‑search round‑trip, but the real win is
  answer quality.  
  *(Modarressi et al., 2025)*

---

## Existing band‑aids—and their limits

Prompt‑level tricks keep today’s systems usable, yet each has trade‑offs:

| Strategy                | Upside         | Downside                                           |
|-------------------------|----------------|----------------------------------------------------|
| **Full history replay** | Simple         | Attention spread thin; ballooning tokens & compute |
| **Summaries**           | Cheap(er)      | Nuance and chain‑of‑thought lost                   |
| **External RAG**        | Scales storage | Rank‑selection errors, privacy & infra overhead    |

These limitations motivate a shift from *prompt engineering* to **model‑level memory**.  
*(Zhang et al., 2024)*

---

## Short‑term memory with **MemoryLLM**

### Short‑term memory with **MemoryLLM**

An initial step toward persistent agents is adding *short‑term* memory — 
something like what MemoryLLM introduced in 2024 by
embedding a **fixed memory matrix** alongside each transformer layer:

1. **Write** salient activations when tokens exit the window.
2. **Read** them via lightweight attention on the next step.
3. **Decay** entries exponentially, keeping the pool fresh.

Resulting in coherent replies across ~50–100 turns without inflating the prompt.

| Feature     | Impact               |
|-------------|----------------------|
| Write cost  | O(1)                 |
| Recall span | Minutes–hours        |
| Storage     | Small, fixed         |
| Limitation  | Distant history lost |

*(Wang et al., 2024)*

---

## Scaling to weeks & months with **M+**

For projects that stretch beyond a chat session, we need memory that survives **days or weeks**.  
M+ builds on MemoryLLM by introducing **hierarchical blocks**:

- **STM**– recent context (same as MemoryLLM).
- **LTM**– hundreds/thousands of slots addressed by learned routers.
- **Promotion score** moves high‑value items from STM to LTM; low‑value items fade.
- **Multi‑granular attention** queries only the relevant block, keeping compute linear.

| Addition            | Benefit                              |
|---------------------|--------------------------------------|
| Hierarchical blocks | Recall across weeks–months           |
| Learned routers     | Unused blocks incur zero extra FLOPs |
| Task‑aware scoring  | Keeps mission‑critical data          |
| Configurable depth  | Memory scales with budget            |

*(Wang et al., 2025)*

---

## Takeaway

Prompt replay and RAG *extend* context; MemoryLLM and M+ *embed* it.  
Internal memory delivers stronger reasoning, higher signal‑to‑noise, and built‑in privacy—benefits that matter more than
shaving a few milliseconds off latency.