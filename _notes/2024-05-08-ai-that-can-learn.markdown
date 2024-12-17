---
layout: note
title: AI that can learn
description: A review of ways to move beyond frozen LLMs
status: Growing
---

Today's LLMs are trained and then frozen in time. What changes when they can continuously learn?

In the rapidly evolving field of artificial intelligence, Large Language Models (LLMs) stand out with their immense
capabilities and advanced functionalities; however, they're traditionally trained once and then remain static,
effectively frozen in time. Despite the trend towards smaller models that pack a punch similar to their more substantial
counterparts, the reality is that the datasets and weight parameters for useful LLMs often span many gigabytes.

The process of training these colossal and increasingly capable LLMs typically involves orchestrating numerous GPUs in
concert. This requirement translates into high costs, substantial energy consumption, and lengthy training periods.

## In-context learning

Given the constraints of static model weights, we resort to manipulations of the data fed to the LLM during runtime,
ahead of any questions or tasks posed to the model. This pre-processing forms what is known as the context window, which
could range widely from just 4,000 tokens to upwards of a million tokens.

This method of "in-context learning" allows ephemeral adjustments based on the provided context, but comes with a
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

## Lifelong and continual learning

When LLMs can continually learn, they transition from being static entities to dynamic systems that evolve over time.
Lifelong and continual learning paradigms are designed to enable LLMs to accumulate knowledge continuously, adjust to
new trends, and forget outdated information in a controlled manner. These paradigms provide the framework for models to
learn from ongoing streams of data rather than from a fixed training dataset.

This shift has profound implications. For one, it mitigates the need for frequent, resource-intense retraining cycles.
Secondly, it positions LLMs to become more personalized and responsive, as they can learn from interactions with
specific users or environments. For industries like customer service or healthcare, where user-specific data can vastly
improve the utility of automated systems, this capability can transform service delivery.

## The challenge of scale

Adapting these models to continuous learning, however, introduces challenges, particularly regarding scale. The
mechanisms that allow for continuous updates—like low-rank adaptation or more sophisticated approaches like
meta-learning—must be designed to operate efficiently at scale. This means they must handle the vast size of LLM
parameters without compromising the speed and responsiveness crucial for real-time applications.

Moreover, these learning updates need to be managed in a way that balances new learning with the preservation of
previously learned valuable information. This requires sophisticated algorithms capable of determining what to retain
and what to overwrite, which can become quite complex as the scale of data and frequency of updates increase.

## Moving forward

As we look towards the future where LLMs can continuously learn, the focus will inevitably shift towards more efficient,
scalable, and adaptive models. The evolution from static to dynamic learning models not only enhances their practicality
but also opens up new avenues for personalized and contextually aware AI systems. However, achieving this requires
overcoming significant technical hurdles, particularly around managing the balance between adaptation and stability, and
doing so in an economically feasible way.

In the end, the development of continuous learning capabilities in LLMs represents a significant step towards more
intelligent, adaptable, and effective computational models. It promises to reduce the long-term costs and environmental
impacts associated with training large models, while greatly increasing their utility and relevance in our ever-changing
world.

