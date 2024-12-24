---
layout: note
title: Graph Embeddings
description: Thinking about embeddings as graphs
status: Growing
---

Matryoshka embeddings represent a fascinating approach to neural network embeddings where multiple vector
representations of different dimensions are nested within a single embedding space, much like Russian nesting dolls.
This innovative technique allows for dynamic dimensionality, where shorter vectors can be extracted from longer ones
while preserving semantic relationships, enabling efficient storage and flexible deployment across various computational
constraints without requiring separate models for different embedding sizes.

For example, OpenAI's text-embedding-3-large model produces 3072-dimensional embeddings using the matryoshka principle.
The full vector represents detailed text semantics, while the first 1536 dimensions capture core meaning,
and the first 768 dimensions retain essential concepts.
This is often used for performance or to save space, by deploying the same embedding at different sizes -
using all 3072 dimensions on powerful servers, but only the first 768 on mobile devices, while maintaining some semantic
consistency across deployments.


