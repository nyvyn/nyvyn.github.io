---
layout: note
title: AI that can learn
description: A review of ways to move beyond frozen LLMs
date: 2024-05-08
status: Growing
references:
  - >-
    [Simonds, T., Yoshiyama, A. (2025)](https://arxiv.org/abs/2503.00735)
---

Today's LLMs are trained and then frozen in time. What changes when they can continuously learn?

In the rapidly evolving field of artificial intelligence, Large Language Models (LLMs) stand out with their immense
capabilities and advanced functionalities; however, they're traditionally trained once and then remain static,
effectively frozen in time. Despite the trend towards smaller models that pack a punch similar to their more substantial
counterparts, the reality is that the datasets and weight parameters for useful LLMs often span many gigabytes.

The process of training these colossal and increasingly capable LLMs typically involves orchestrating numerous GPUs in
concert. This requirement translates into high costs, substantial energy consumption, and lengthy training periods.

## In-context learning

Given the constraints of static model weights, manipulations of the data fed to the LLM during runtime are employed,
ahead of any questions or tasks posed to the model. This pre-processing forms what is known as the context window, which
could range widely from just 4,000 tokens to upwards of a million tokens.

This method of "in-context learning" enables ephemeral adjustments based on the provided context, but it comes with a
significant long-term cost. Each interaction or turn in a conversation necessitates the retransmission of this
context—this not only increases operational demands but also exacerbates cost inefficiencies over time.

## Low-rank adaptation

Low-rank adaptation is a technique used to address some of the challenges presented by traditional large language
models. Instead of retraining the entire model—a costly and compute-intensive process—low-rank adaptation focuses on
updating a small subset of parameters. This enables the model to adapt to new tasks or changes in the data environment
with minimal overhead.

Low-rank adaptation leverages the idea that many changes in data can be captured by adjusting a low-dimensional subspace
within the model's parameters. By focusing on this subspace, significant adaptations can be made without the need to
overhaul the entire model architecture. This approach is particularly useful for integrating continuous learning, as it
allows for rapid adjustments in response to new information while maintaining the integrity and stability of the core
model.

## LADDER: Self-Improving LLMs

The LADDER framework, introduced by Simonds and Yoshiyama (2025), represents a significant advancement in the field of
continuous learning for LLMs. LADDER stands for Learning through Autonomous Difficulty-Driven Example Recursion, and it
enables LLMs to autonomously improve their problem-solving capabilities. This is achieved through self-guided learning,
where the model recursively generates and solves progressively simpler variants of complex problems.

Unlike traditional methods that rely on curated datasets or human feedback, LADDER leverages the model's own
capabilities to generate easier question variants. This approach has demonstrated significant improvements in the
accuracy of LLMs on complex tasks, such as mathematical integration, without the need for architectural scaling or human
supervision.

The introduction of LADDER highlights the potential for LLMs to become more adaptive and capable over time, reducing the
need for extensive retraining and enabling more efficient use of computational resources.

# Thoughts on what's next

Looking towards the future where LLMs can continuously learn, the focus will inevitably shift towards more efficient,
scalable, and adaptive models. The evolution from static to dynamic learning models not only enhances their practicality
but also opens up new avenues for personalized and contextually aware AI systems. However, achieving this requires
overcoming significant technical hurdles, particularly around managing the balance between adaptation and stability, and
doing so in an economically feasible way.

In the end, the development of continuous learning capabilities in LLMs represents a significant step towards more
intelligent, adaptable, and effective computational models. It promises to reduce the long-term costs and environmental
impacts associated with training large models, while greatly increasing their utility and relevance in our ever-changing
world.

