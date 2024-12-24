---
layout: note
title: Graph Embeddings
description: Thinking about embeddings as graphs
status: Growing
---

Matryoshka embeddings, introduced by Yu et al. in their 2022 paper "Matryoshka Representation Learning"[^1], are a
hierarchical neural network embedding architecture that enables the extraction of multiple nested vector
representations of decreasing dimensionality from a single embedding space.

Unlike traditional fixed-dimension embeddings, matryoshka embeddings are trained with a specialized loss function that
ensures semantic consistency across dimensional subsets, allowing for dynamic dimensionality reduction while preserving
hierarchical relationships.

This innovative technique allows for dynamic dimensionality, where shorter vectors can be extracted from longer ones
while preserving semantic relationships. This enables efficient storage and flexible deployment across various
computational constraints without requiring separate models for different embedding sizes.

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

```mermaid
graph TD
    subgraph "3072d - Fine Details"
        A1[Dolphin Navigation] -->|echolocation| B1[Bat Navigation]
        A1 -->|marine habitat| C1[Whale Communication]
    end
    subgraph "1536d - Mid-level Concepts"
        A2[Marine Mammals] -->|sound use| B2[Flying Mammals]
        A2 -->|habitat| C2[Ocean Life]
    end
    subgraph "768d - Broad Categories"
        A3[Mammals] -->|classification| B3[Animals]
        C3[Marine Life] -->|ecosystem| B3
    end
```

Consider these knowledge statements about animals:

1. "Dolphins are intelligent marine mammals that use echolocation to navigate"
2. "Bats are flying mammals that use echolocation to navigate at night"
3. "Whales are large marine mammals that communicate through complex songs"
4. "Eagles are birds of prey with excellent daytime vision"

When comparing these statements using different dimensional depths of their embeddings:

- At 768 dimensions: Statements 1-3 cluster together as "mammals", separate from statement 4
- At 1536 dimensions: Statements 1-2 group closely (echolocation), while 3 forms a looser cluster with 1 (marine
  mammals)
- At full 3072 dimensions: The fine distinctions become clear - marine mammals (1,3), nocturnal echolocation (2), and
  visual predators (4) each form distinct clusters

This demonstrates how the matryoshka structure preserves broad categorical relationships in the lower dimensions while
encoding more specific features in the higher dimensions. However, it's important to note that this hierarchical
preservation is not perfect - some fine-grained relationships may be lost or distorted in lower dimensions, and the
quality of preservation can vary depending on the training data distribution and the specific implementation of the
dimensional reduction mechanism.

In practice, creating meaningful graph structures from embeddings requires careful consideration of similarity
thresholds and edge directionality. A common approach is to use cosine similarity with different thresholds at
each dimensional level - for example, requiring >0.8 similarity at 768 dimensions for broad category connections,
but >0.9 at 3072 dimensions for fine-grained relationships. To create a directed acyclic graph (DAG), we can:

1. Use dimensional asymmetry: connect nodes based on how their similarity changes across dimensions, with edges
   pointing from broader to more specific concepts
2. Apply information content: direct edges from concepts with lower to higher information density
3. Enforce hierarchical constraints: maintain strict level ordering based on embedding dimension depths
4. Employ temporal ordering: if concepts have associated timestamps, use these to ensure acyclicity

This approach naturally produces hierarchical knowledge graphs where edges represent both semantic similarity and
conceptual dependencies, while the acyclic nature ensures clear paths of reasoning from general to specific concepts.

The hierarchical nature of matryoshka embeddings provides a natural foundation for building semantic knowledge graphs.
By analyzing relationships at different dimensional depths, we can construct rich networks of conceptual connections
that capture both broad categorical relationships and fine-grained semantic details. This approach combines three key
components: (1) embedding similarity at various dimensional levels for initial relationship discovery, (2) cross-encoders
for precise semantic verification, and (3) graph-based reasoning to explore concept connections. The result is a more
nuanced understanding of conceptual hierarchies and relationships, particularly valuable for complex knowledge domains
where simple similarity matching might miss important contextual connections.

The implementation of this approach draws inspiration from GraphRAG[^9] while focusing on hierarchical matryoshka embeddings to build semantic concept graphs. The key components are:

1. Building a directed concept graph that preserves the dimensional hierarchy of matryoshka embeddings
2. Using cross-encoders for accurate relationship verification
3. Implementing hybrid retrieval that leverages both embedding similarity and cross-encoding
4. Supporting graph-based concept mining through traversal of related nodes

[^9]: Liu, S., Yu, T., Xiao, T., Peng, Z., & Hong, Y. (2023). GraphRAG: Unlocking LLM's Potential for Complex Question Answering over Knowledge Graphs. arXiv preprint arXiv:2310.05842.

The use of cross-encoders in this implementation deserves special attention. Unlike bi-encoders that encode texts
separately (as in traditional embedding models), cross-encoders process both texts simultaneously through a transformer
architecture. This allows them to perform more nuanced comparison by attending to interactions between the texts at all
levels. While computationally more intensive than simple embedding similarity, cross-encoders achieve significantly
higher accuracy in determining semantic relationships. In our implementation, they serve as a verification layer,
ensuring that the relationships suggested by embedding similarity actually represent meaningful conceptual connections.

For example, when comparing "Dolphins use echolocation" with "Bats navigate by sound", a bi-encoder might miss the
connection due to different vocabulary, but a cross-encoder can recognize the functional similarity by processing both
statements together through cross-attention mechanisms (Reimers & Gurevych, 2019)[^8]. This makes cross-encoders
particularly valuable for verifying complex semantic relationships in
knowledge graphs, even though their computational cost typically limits them to reranking a pre-filtered set of
candidates.

To illustrate how hierarchical embeddings capture concept relationships in graph form, let's examine our animal examples:

1. Direct Relationships (First-order connections):
    - Dolphins → Echolocation → Bats
    - Dolphins → Marine Mammals → Whales
      These connections are established through high similarity scores in both embedding space and cross-encoder
      verification.

2. Indirect Relationships (Higher-order connections):
    - Dolphins → Marine Mammals → Mammals → Bats
      GraphRAG can traverse these paths to discover non-obvious relationships, like understanding that dolphins and bats
      share mammalian traits despite living in different environments.

3. Hierarchical Relationships:
   ```mermaid
   graph TD
    A[Animals] --> B[Mammals]
    A --> C[Birds]
    B --> D[Marine Mammals]
    B --> E[Flying Mammals]
    D --> F[Dolphins]
    D --> G[Whales]
    E --> H[Bats]
    C --> I[Eagles]
    
    F -->|uses| J[Echolocation]
    H -->|uses| J
    G -->|uses| K[Sound Communication]
    I -->|uses| L[Visual Hunting]
    
    style J fill:#f9f,stroke:#333
    style K fill:#f9f,stroke:#333
    style L fill:#f9f,stroke:#333
   ```
   This hierarchy emerges naturally from the matryoshka embedding structure, where broader categories are captured in
   lower dimensions and specific traits in higher dimensions.

4. Cross-cutting Relationships:
    - {Dolphins, Bats} → Echolocation
    - {Dolphins, Whales} → Marine habitat
    - {Eagles, Bats} → Flight capability
      GraphRAG can maintain multiple valid categorizations simultaneously, allowing for flexible concept retrieval based
      on
      different aspects of knowledge.

This graph-based representation enables sophisticated queries like "Find animals that navigate without vision" or
"Identify shared traits between marine and flying mammals," where the system can traverse multiple relationship paths
to construct comprehensive answers.

The hierarchical structure of matryoshka embeddings naturally aligns with fundamental concepts from graph theory and
community detection. Drawing from Newman's seminal work on community structure in networks[^3], we can view the
different dimensional layers of matryoshka embeddings as representing hierarchical community structures:

1. Modularity and Dimensional Reduction:
    - Lower dimensions (e.g., 768) capture high-level community structure through Newman's modularity Q:
      Q = (1/2m)∑ᵢⱼ[Aᵢⱼ - (kᵢkⱼ/2m)]δ(cᵢ,cⱼ)
      where m is the number of edges, A is the adjacency matrix, k represents node degrees
    - Higher dimensions (3072) reveal fine-grained sub-communities through hierarchical clustering coefficients,
      with transitivity T = (3 × number of triangles) / (number of connected triples)
    - The dimensional reduction preserves the natural community structure, as demonstrated by Fortunato's resolution
      limit theory[^4]

2. Graph Theoretical Properties:
    - The nested structure of matryoshka embeddings creates natural "cut points" in the similarity graph
    - These correspond to different levels of Von Luxburg's spectral clustering theory[^5], where:
        * Lower dimensions ≈ first few eigenvectors (broad structure)
        * Higher dimensions ≈ finer spectral components (detailed relationships)

    ```mermaid
    graph LR
        subgraph "Spectral Clustering Levels"
            A[Raw Embeddings] --> B[Similarity Matrix]
            B --> C[Laplacian Matrix]
            C --> D[Eigenvectors]
            D --> E1[First Few <br> Broad Structure]
            D --> E2[Higher Order <br> Fine Details]
        end
        
        style A fill:#e1f5fe
        style B fill:#b3e5fc
        style C fill:#81d4fa
        style D fill:#4fc3f7
        style E1 fill:#29b6f6
        style E2 fill:#03a9f4
    ```

3. Information Flow and Centrality:
    - PageRank-like measures[^6] can be computed at each dimensional level
    - Concepts that maintain high centrality across dimensions often represent key bridging nodes
    - Example: "echolocation" maintains high centrality across dimensions as it bridges marine/flying mammals

The implementation uses the Hierarchical Leiden Algorithm, an improvement over the Louvain method that guarantees
well-connected communities. As shown by Traag et al.[^7], Leiden addresses resolution-limit and disconnected-communities
issues that can affect Louvain, making it particularly suitable for knowledge graphs where community coherence is
crucial.

This theoretical framework explains why GraphRAG's approach is particularly effective:

- The matryoshka structure naturally captures the hierarchical community structure of knowledge
- Cross-encoder verification aligns with spectral clustering's ability to identify genuine communities
- The multi-dimensional approach mirrors multi-resolution community detection methods

[^1]: Yu, W., Luo, F., Zhu, P., Peng, P., Zhou, J., Wen, X., ... & Zhou, J. (2022). Matryoshka representation learning.
Advances in Neural Information Processing Systems, 35, 12156-12168.


[^3]: Newman, M. E. J. (2006). Modularity and community structure in networks. Proceedings of the National Academy of
Sciences, 103(23), 8577-8582.

[^4]: Fortunato, S., & Barthélemy, M. (2007). Resolution limit in community detection. Proceedings of the National
Academy of Sciences, 104(1), 36-41.

[^5]: Von Luxburg, U. (2007). A tutorial on spectral clustering. Statistics and Computing, 17(4), 395-416.

[^6]: Page, L., Brin, S., Motwani, R., & Winograd, T. (1999). The PageRank citation ranking: Bringing order to the web.
Stanford InfoLab.

[^7]: Traag, V. A., Waltman, L., & van Eck, N. J. (2019). From Louvain to Leiden: guaranteeing well-connected
communities. Scientific Reports, 9(1), 1-12.

[^8]: Reimers, N., & Gurevych, I. (2019). Sentence-BERT: Sentence embeddings using Siamese BERT-networks. In Proceedings
of the 2019 Conference on Empirical Methods in Natural Language Processing. Association for Computational Linguistics.


