---
layout: note
title: Graph Embeddings
description: Thinking about embeddings as graphs
status: Growing
---

Matryoshka embeddings, introduced by Yu et al. in their 2022 paper "Matryoshka Representation Learning"[^1], represent a
fascinating approach to neural network embeddings where multiple vector
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

This nested structure enables an interesting approach to building semantic graphs: we can construct multiple layers of
concept relationships by comparing similarities at different dimensional depths. For instance, comparing the full
3072-dimensional vectors might reveal fine-grained topic clusters, while similarities in the first 768 dimensions could
identify broader thematic communities. By analyzing how these relationships shift across different dimensional
"slices" of the embeddings, we can build a rich hierarchical graph structure that captures both granular connections
and high-level concept groupings, all from a single set of embeddings.

[^1]: Yu, W., Luo, F., Zhu, P., Peng, P., Zhou, J., Wen, X., ... & Zhou, J. (2022). Matryoshka representation learning.
Advances in Neural Information Processing Systems, 35, 12156-12168.


