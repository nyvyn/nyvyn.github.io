---
layout: note
title: Large Concept Models
description: Exploring this new approach to language models
date: 2025-1-2
status: Sprouting
references:
  - >-
    [Meta AI (2024). Large Concept Models: Language Modeling in a Sentence Representation Space](https://ai.meta.com/research/publications/large-concept-models-language-modeling-in-a-sentence-representation-space)
  - >-
    [Viliotti, A. (2024). Large Concept Model (LCM): a new paradigm for large-scale semantic reasoning in AI](https://www.andreaviliotti.it/post/large-concept-model-lcm-a-new-paradigm-for-large-scale-semantic-reasoning-in-ai)
---

In December 2024, Meta introduced the Large Concept Model (LCM) which is
designed to work with "concepts" rather than individual tokens. In the implementation from Meta, a concept
corresponds to a sentence, represented in a high-dimensional embedding space using SONAR.

> In practice, a concept would often correspond to a sentence in a text document, or an equivalent speech utterance. 
> We posit that a sentence is an appropriate unit to achieve language independence, in opposition to single words. 
> This is in sharp contrast to current LLMs techniques which are heavily English centric and token based.

The paper goes to assert:

> Despite the undeniable success of LLMs and continued progress, all current LLMs miss a crucial characteristic of 
> human intelligence: explicit reasoning and planning at multiple levels of abstraction. The human brain does not 
> operate at the word level only. We usually have a top-down process to solve a complex task or compose a long 
> document: we first plan at a higher level the overall structure, and then step-by-step, add details at lower 
> levels of abstraction. One may argue that LLMs are implicitly learning a hierarchical representation, but we 
> stipulate that models with an explicit hierarchical architecture are better suited to create coherent long-form 
> output.

## Key Components

- Segmentation: The input text is divided into sentences.
- Concept Encoding: Each sentence is transformed into a conceptual embedding using the SONAR encoder.
- Conceptual Reasoning: The LCM processes the sequence of conceptual embeddings to generate a new sequence of concepts.
- Decoding: SONAR decodes the output concepts back into subwords or tokens.

## SONAR

SONAR is a sophisticated encoder developed by Meta AI, designed to transform sentences into high-dimensional embeddings.
It plays a crucial role in the LCM framework by enabling the conversion of textual data into a format suitable for
conceptual reasoning. The encoder is optimized for capturing semantic nuances and relationships between concepts,
facilitating advanced language understanding and generation tasks.

SONAR and vec2text share similarities and I've linked to vec2text previously here:
[Embedding inversion](/notes/embedding-inversion)
Both aim to transform textual data into embeddings, but they differ in their approach and application.
While vec2text focuses on generating embeddings for individual words or phrases, SONAR operates at the
sentence level, capturing more complex semantic relationships.
This makes SONAR particularly suited for tasks requiring
a deeper understanding of context and meaning across longer text spans.

## Model Training

The LCM is trained to perform autoregressive sentence prediction in the embedding space. Researchers have explored
multiple approaches:

1. MSE Regression: This is the base LCM approach.
2. Diffusion-based Generation: Variants of this approach have been explored, including a two-tower diffusion LCM.
3. Quantized SONAR Space: Models operating in this space are under development.

Initial explorations used 1.6B parameter models trained on approximately 1.3T tokens. The architecture was later scaled
to 7B parameters with training data of about 7.7T tokens.

Source: [Large Concept Models: Language Modeling in a Sentence Representation Space](https://arxiv.org/abs/2412.08821)

## Advantages and Innovations

1. Abstract Reasoning: LCM's conceptual approach enables reasoning beyond specific language or modality constraints.
2. Explicit Hierarchical Structure: Working with concepts makes the output more interpretable and editable.
3. Longer Context Handling: Operating at the conceptual level allows for efficient processing of longer contexts.
4. Zero-Shot Generalization: LCM can be applied to any language or modality supported by SONAR encoders without
   additional training.
5. Modularity and Extensibility: The design allows for independent development of concept encoders and decoders.

Source: [Large Concept Model (LCM): a new paradigm for large-scale semantic reasoning in AI](https://www.andreaviliotti.it/post/large-concept-model-lcm-a-new-paradigm-for-large-scale-semantic-reasoning-in-ai)
