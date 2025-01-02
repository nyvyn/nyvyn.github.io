---
layout: note
title: Large Concept Models
description: Exploring this new approach to language models
status: Sprouting
---

[Large Concept Models (LCMs)](https://ai.meta.com/research/publications/large-concept-models-language-modeling-in-a-sentence-representation-space/)
are designed to work with "concepts" rather than individual tokens. In the current
implementation, a concept corresponds to a sentence, represented in a high-dimensional embedding space called SONAR.

## Key Components

- Segmentation: The input text is divided into sentences.
- Concept Encoding: Each sentence is transformed into a conceptual embedding using the SONAR encoder.
- Conceptual Reasoning: The LCM processes the sequence of conceptual embeddings to generate a new sequence of concepts.
- Decoding: SONAR decodes the output concepts back into subwords or tokens.

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
4. Zero-Shot Generalization: LCM can be applied to any language or modality supported by SONAR encoders without additional training. 
5. Modularity and Extensibility: The design allows for independent development of concept encoders and decoders.

Source: [Large Concept Model (LCM): a new paradigm for large-scale semantic reasoning in AI](https://www.andreaviliotti.it/post/large-concept-model-lcm-a-new-paradigm-for-large-scale-semantic-reasoning-in-ai)