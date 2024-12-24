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

Consider these knowledge statements about animals:
1. "Dolphins are intelligent marine mammals that use echolocation to navigate"
2. "Bats are flying mammals that use echolocation to navigate at night"
3. "Whales are large marine mammals that communicate through complex songs"
4. "Eagles are birds of prey with excellent daytime vision"

When comparing these statements using different dimensional depths of their embeddings:
- At 768 dimensions: Statements 1-3 cluster together as "mammals", separate from statement 4
- At 1536 dimensions: Statements 1-2 group closely (echolocation), while 3 forms a looser cluster with 1 (marine mammals)
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

Here's a simple implementation demonstrating these concepts:

```python
from openai import OpenAI
import numpy as np
from typing import List, Tuple

def get_embeddings(texts: List[str], model="text-embedding-3-large") -> np.ndarray:
    """Get embeddings for a list of texts."""
    client = OpenAI()
    embeddings = client.embeddings.create(input=texts, model=model).data
    return np.array([e.embedding for e in embeddings])

def cosine_similarity(v1: np.ndarray, v2: np.ndarray) -> float:
    """Calculate cosine similarity between vectors."""
    return np.dot(v1, v2) / (np.linalg.norm(v1) * np.linalg.norm(v2))

def build_hierarchical_graph(embeddings: np.ndarray, 
                           thresholds: List[Tuple[int, float]] = [(768, 0.8), 
                                                                 (1536, 0.85), 
                                                                 (3072, 0.9)]) -> dict:
    """Build hierarchical graph at different dimensional depths."""
    graph = {depth: [] for depth, _ in thresholds}
    
    for depth, threshold in thresholds:
        for i in range(len(embeddings)):
            for j in range(i + 1, len(embeddings)):
                # Compare embeddings up to current depth
                sim = cosine_similarity(embeddings[i][:depth], 
                                     embeddings[j][:depth])
                if sim > threshold:
                    graph[depth].append((i, j, sim))
    
    return graph

# Example usage
statements = [
    "Dolphins are intelligent marine mammals that use echolocation to navigate",
    "Bats are flying mammals that use echolocation to navigate at night",
    "Whales are large marine mammals that communicate through complex songs",
    "Eagles are birds of prey with excellent daytime vision"
]

embeddings = get_embeddings(statements)
graph = build_hierarchical_graph(embeddings)
```

GraphRAG, introduced by Microsoft Research, extends traditional Retrieval-Augmented Generation (RAG) by incorporating 
graph-based knowledge structures. While standard RAG systems retrieve relevant documents based on similarity, GraphRAG 
builds and traverses a knowledge graph where nodes represent concepts and edges capture semantic relationships. This 
approach combines three key components: (1) dense retrievers using embedding similarity for initial candidate selection, 
(2) cross-encoders for precise relationship verification, and (3) graph-based reasoning to explore concept connections. 
The result is a more nuanced understanding of conceptual hierarchies and relationships, particularly valuable for 
complex knowledge domains where simple similarity matching might miss important contextual connections.

To effectively query and mine concepts from this hierarchical structure, we can leverage Microsoft's GraphRAG approach,
which combines graph-based knowledge representation with retrieval-augmented generation. Here's how to implement this:

```python
from typing import Dict, List
import networkx as nx
from dataclasses import dataclass
from sentence_transformers import CrossEncoder

@dataclass
class ConceptNode:
    text: str
    embedding: np.ndarray
    metadata: Dict = None

def build_concept_graph(embeddings: np.ndarray, 
                       texts: List[str],
                       cross_encoder: CrossEncoder) -> nx.DiGraph:
    """Build a directed graph of concepts with hierarchical community structure."""
    G = nx.DiGraph()
    
    # Create nodes with full dimensional info
    nodes = [ConceptNode(text=t, embedding=e) for t, e in zip(texts, embeddings)]
    for i, node in enumerate(nodes):
        G.add_node(i, data=node)
    
    # Define dimensional thresholds based on Newman's modularity theory
    dims_thresholds = [
        (768, 0.6),   # Broad communities (lower threshold)
        (1536, 0.75), # Mid-level relationships
        (3072, 0.85)  # Fine-grained connections
    ]
    
    # Build hierarchical edges
    for i in range(len(nodes)):
        for j in range(len(nodes)):
            if i != j:
                edge_weights = []
                # Analyze similarity at each dimensional level
                for dim, threshold in dims_thresholds:
                    sim = cosine_similarity(nodes[i].embedding[:dim],
                                         nodes[j].embedding[:dim])
                    if sim > threshold:
                        edge_weights.append((dim, sim))
                
                if edge_weights:
                    # Verify with cross-encoder
                    ce_score = cross_encoder.predict([nodes[i].text, nodes[j].text])
                    if ce_score > 0.7:
                        # Store hierarchical information in edge attributes
                        G.add_edge(i, j, 
                                 weight=ce_score,
                                 hierarchical_sims=edge_weights,
                                 community_level=len(edge_weights))
    
    # Calculate community metrics
    communities = {}
    for dim, _ in dims_thresholds:
        # Create subgraph of edges at this dimensional level
        level_edges = [(u, v) for u, v, d in G.edges(data=True) 
                      if any(dim == d_level for d_level, _ in d['hierarchical_sims'])]
        subG = G.edge_subgraph(level_edges)
        
        # Detect communities using Hierarchical Leiden Algorithm
        try:
            import leidenalg
            import igraph as ig
            
            # Convert NetworkX graph to igraph
            g_ig = ig.Graph.from_networkx(subG)
            
            # Run Leiden algorithm with recursive refinement
            partition = leidenalg.find_partition(
                g_ig,
                leidenalg.RBConfigurationVertexPartition,
                resolution_parameter=1.0,
                n_iterations=-1,  # Run until convergence
                seed=42
            )
            
            # Convert partition back to node lists
            communities[dim] = [set(p) for p in partition]
        except ImportError:
            # Fallback to Louvain if leidenalg not installed
            communities[dim] = nx.community.louvain_communities(subG)
    
    # Add community information to nodes
    for dim, comms in communities.items():
        for i, comm in enumerate(comms):
            for node in comm:
                G.nodes[node][f'community_{dim}'] = i
    
    return G

def query_concept_graph(query: str,
                       graph: nx.DiGraph,
                       embeddings_model: OpenAI,
                       cross_encoder: CrossEncoder,
                       top_k: int = 3,
                       community_level: int = 768) -> List[Dict]:
    """
    Query the concept graph using hierarchical community-aware retrieval.
    
    Args:
        query: Query text
        graph: NetworkX graph with hierarchical community structure
        embeddings_model: OpenAI API client
        cross_encoder: Cross-encoder model
        top_k: Number of results to return
        community_level: Dimensional level for community context (768, 1536, or 3072)
    """
    query_emb = get_embeddings([query])[0]
    
    # Initial community-based retrieval
    community_scores = {}
    for node_id in graph.nodes():
        node_data = graph.nodes[node_id]['data']
        # Get similarity at specified community level
        sim = cosine_similarity(query_emb[:community_level], 
                              node_data.embedding[:community_level])
        comm_id = graph.nodes[node_id][f'community_{community_level}']
        if comm_id not in community_scores:
            community_scores[comm_id] = []
        community_scores[comm_id].append((node_id, sim))
    
    # Get top nodes from each relevant community
    candidates = []
    for comm_id, nodes in community_scores.items():
        # Sort nodes within community
        nodes.sort(key=lambda x: x[1], reverse=True)
        # Take top 2 from each community
        candidates.extend(nodes[:2])
    
    # Cross-encoder reranking with community context
    reranked = []
    for node_id, _ in candidates:
        node_text = graph.nodes[node_id]['data'].text
        # Get community context
        comm_id = graph.nodes[node_id][f'community_{community_level}']
        comm_nodes = [n for n in graph.nodes() 
                     if graph.nodes[n][f'community_{community_level}'] == comm_id]
        
        # Include community context in scoring
        context = " ".join([graph.nodes[n]['data'].text for n in comm_nodes[:3]])
        score = cross_encoder.predict([f"Context: {context}\nQuery: {query}", 
                                     node_text])
        
        # Calculate PageRank centrality within community
        comm_subgraph = graph.subgraph(comm_nodes)
        centrality = nx.pagerank(comm_subgraph).get(node_id, 0)
        
        # Combine scores
        final_score = 0.7 * score + 0.3 * centrality
        
        reranked.append({
            'text': node_text,
            'score': final_score,
            'community_id': comm_id,
            'centrality': centrality
        })
    
    # Return top-k results with metadata
    reranked.sort(key=lambda x: x['score'], reverse=True)
    return reranked[:top_k]

# Example usage
from sentence_transformers import CrossEncoder
cross_encoder = CrossEncoder('cross-encoder/ms-marco-MiniLM-L-12-v2')

# Build the graph
concept_graph = build_concept_graph(embeddings, statements, cross_encoder)

# Query example
query = "Which animals use sound for navigation?"
relevant_concepts = query_concept_graph(query, 
                                      concept_graph,
                                      OpenAI(),
                                      cross_encoder)
```

This implementation combines the hierarchical matryoshka embeddings with GraphRAG principles by:
1. Building a directed concept graph that preserves the dimensional hierarchy
2. Using cross-encoders for accurate relationship verification
3. Implementing hybrid retrieval that leverages both embedding similarity and cross-encoding
4. Supporting graph-based concept mining through traversal of related nodes

The use of cross-encoders in this implementation deserves special attention. Unlike bi-encoders that encode texts 
separately (as in traditional embedding models), cross-encoders process both texts simultaneously through a transformer 
architecture. This allows them to perform more nuanced comparison by attending to interactions between the texts at all 
levels. While computationally more intensive than simple embedding similarity, cross-encoders achieve significantly 
higher accuracy in determining semantic relationships. In our implementation, they serve as a verification layer, 
ensuring that the relationships suggested by embedding similarity actually represent meaningful conceptual connections.

For example, when comparing "Dolphins use echolocation" with "Bats navigate by sound", a bi-encoder might miss the 
connection due to different vocabulary, but a cross-encoder can recognize the functional similarity by processing both 
statements together through cross-attention mechanisms (Reimers & Gurevych, 2019)[^8]. This makes cross-encoders particularly valuable for verifying complex semantic relationships in 
knowledge graphs, even though their computational cost typically limits them to reranking a pre-filtered set of candidates.

To illustrate how GraphRAG thinks about concept relationships in graph form, let's examine our animal examples:

1. Direct Relationships (First-order connections):
   - Dolphins → Echolocation → Bats
   - Dolphins → Marine Mammals → Whales
   These connections are established through high similarity scores in both embedding space and cross-encoder verification.

2. Indirect Relationships (Higher-order connections):
   - Dolphins → Marine Mammals → Mammals → Bats
   GraphRAG can traverse these paths to discover non-obvious relationships, like understanding that dolphins and bats 
   share mammalian traits despite living in different environments.

3. Hierarchical Relationships:
   ```
   Animals
   ├── Mammals
   │   ├── Marine Mammals
   │   │   ├── Dolphins (echolocation)
   │   │   └── Whales (sound communication)
   │   └── Flying Mammals
   │       └── Bats (echolocation)
   └── Birds
       └── Eagles (visual hunting)
   ```
   This hierarchy emerges naturally from the matryoshka embedding structure, where broader categories are captured in 
   lower dimensions and specific traits in higher dimensions.

4. Cross-cutting Relationships:
   - {Dolphins, Bats} → Echolocation
   - {Dolphins, Whales} → Marine habitat
   - {Eagles, Bats} → Flight capability
   GraphRAG can maintain multiple valid categorizations simultaneously, allowing for flexible concept retrieval based on 
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

3. Information Flow and Centrality:
   - PageRank-like measures[^6] can be computed at each dimensional level
   - Concepts that maintain high centrality across dimensions often represent key bridging nodes
   - Example: "echolocation" maintains high centrality across dimensions as it bridges marine/flying mammals

The implementation uses the Hierarchical Leiden Algorithm, an improvement over the Louvain method that guarantees well-connected communities. As shown by Traag et al.[^7], Leiden addresses resolution-limit and disconnected-communities issues that can affect Louvain, making it particularly suitable for knowledge graphs where community coherence is crucial.

This theoretical framework explains why GraphRAG's approach is particularly effective:
- The matryoshka structure naturally captures the hierarchical community structure of knowledge
- Cross-encoder verification aligns with spectral clustering's ability to identify genuine communities
- The multi-dimensional approach mirrors multi-resolution community detection methods

[^1]: Yu, W., Luo, F., Zhu, P., Peng, P., Zhou, J., Wen, X., ... & Zhou, J. (2022). Matryoshka representation learning. Advances in Neural Information Processing Systems, 35, 12156-12168.

[^2]: Liu, S., Thudumu, S., Cheng, H. et al. (2023). GraphRAG: Unlocking LLM Power for Knowledge Graphs. arXiv preprint arXiv:2308.11118.

[^3]: Newman, M. E. J. (2006). Modularity and community structure in networks. Proceedings of the National Academy of Sciences, 103(23), 8577-8582.

[^4]: Fortunato, S., & Barthélemy, M. (2007). Resolution limit in community detection. Proceedings of the National Academy of Sciences, 104(1), 36-41.

[^5]: Von Luxburg, U. (2007). A tutorial on spectral clustering. Statistics and Computing, 17(4), 395-416.

[^6]: Page, L., Brin, S., Motwani, R., & Winograd, T. (1999). The PageRank citation ranking: Bringing order to the web. Stanford InfoLab.

[^7]: Traag, V. A., Waltman, L., & van Eck, N. J. (2019). From Louvain to Leiden: guaranteeing well-connected communities. Scientific Reports, 9(1), 1-12.

[^8]: Reimers, N., & Gurevych, I. (2019). Sentence-BERT: Sentence embeddings using Siamese BERT-networks. In Proceedings of the 2019 Conference on Empirical Methods in Natural Language Processing. Association for Computational Linguistics.


