---
layout: note
title: Toward a more human-Like memory model
description: Exploring a concept-driven approach trading text-fidelity for flexibility
status: Sprouting
---

Imagine you have two complex, forward-looking concepts, each represented as an embedding vector:

* Concept A: “Quantum computing for accelerating drug discovery”
* Concept B: “Personalized medicine tailored to individual genetic profiles”

* In a traditional Retrieval-Augmented Generation (RAG) system, to combine these into a new vision—say, a concept of
  “quantum-accelerated, genetically-tailored drug design”—you’d typically have to:

1. Retrieve text describing each concept.
2. Use a language model (LLM) to merge and summarize the texts into a coherent narrative.
3. Re-embed the merged text to produce a final vector representation.

However, because of the research work by Jack Morris with [vec2text](https://github.com/vec2text/vec2text), we can
train a small model to invert embeddings back to text. This results in a close, but not exact match to the original
text.

The primary advantage is that this approach enables directly manipulating embeddings, vs round-tripping via an LLM.

Building on this approach, consider how we can now handle the initial example differently. Instead of pulling in
original texts, asking an LLM to read them, and producing a new blended text to embed again, we can stay entirely within
the embedding space until we need a human-readable output.

Here’s how the new workflow might look:

1. **Start with Embeddings:**
   We already have embeddings that represent “Quantum computing for accelerating drug discovery” and “Personalized
   medicine
   tailored to individual genetic profiles.” Instead of retrieving original texts, we simply operate directly on these
   vectors.
2. **Merge Embeddings Directly:**
   To form the new concept “quantum-accelerated, genetically-tailored drug design,” we can blend the two original
   vectors
   mathematically—say, by averaging or taking a weighted combination. This vector arithmetic is both efficient and
   straightforward, requiring no LLM calls at this step.
3. **Invert the Combined Embedding:**
   Now that we have a single embedding representing our merged concept, we use vec2text to invert the embedding back
   into text. The resulting text won’t be identical to any original document, but it
   will be semantically close enough to convey the intended idea: a fusion of quantum-accelerated drug discovery with
   personalized genetic medicine.

This direct embedding manipulation approach breaks the dependency on repeatedly round-tripping through an LLM. Instead
of always needing to fetch texts and re-embed them after an LLM-based summary, we treat embeddings as first-class
semantic concepts that can be merged, evolved, and refined at will.

## A More Human-Like Model of Memory Formation

Unlike a database of perfectly preserved documents, the human brain doesn’t maintain an exact, word-for-word record of
every conversation, book, or article it’s ever encountered. Instead, we store and blend meanings, impressions, and
concepts into richly interconnected networks of associations. Over time, these representations shift, merge, and evolve
as we learn new things or reevaluate old information. In essence, human memory is far more “lossy” than the neat textual
archives managed by traditional RAG systems.

By focusing on embeddings and only converting them back to text when needed, we move toward a more human-like approach
to knowledge management. Instead of treating text as the ultimate source of truth at every step, we treat embeddings as
the native language of our AI’s memory—abstract, conceptual, and open to continuous manipulation. This allows for the
rapid blending of ideas without requiring perfectly preserved textual data. It’s less about retaining exact sentences
and more about capturing the essential meaning, enabling the system to adapt, recombine, and reinterpret knowledge as
its understanding grows and matures.

## Lossless vs Lossy

Below, we’ll compare and contrast these two ways: the traditional lossless version (storing original
text) versus the lossy inversion-based approach (reconstructing text from embeddings).

<table class="uk-table uk-table-divider uk-table-justify">
    <thead>
        <tr>
            <th>Aspect</th>
            <th class="uk-width-2-5">Lossless<br>(Embedding + Text)</th>
            <th class="uk-width-2-5">Lossy<br>(Embedding Inversion)</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Data Storage</td>
            <td>Stores both embeddings and original text in the vector DB</td>
            <td>Stores embeddings only; original text reconstructed as needed</td>
        </tr>
        <tr>
            <td>Fidelity of Retrieved Text</td>
            <td>High: retrieved text is exactly as stored</td>
            <td>Lower: inverted text is approximate and may not perfectly match any original text</td>
        </tr>
        <tr>
            <td>Concept Merging & Refinement</td>
            <td>Requires retrieving original texts and using an LLM to merge and re-embed</td>
            <td>Embeddings are merged directly via arithmetic operations; no LLM required at merge time</td>
        </tr> 
        <tr>
            <td>Latency & Performance</td>
            <td>Fast retrieval of text, but merging concepts often involves LLM calls</td>
            <td>Vector arithmetic for merging is fast; inversion step adds overhead when text is needed</td>
        </tr>
    </tbody>
</table>

## Benefits of Embedding-Level Operations:

- **Efficiency:**
  Direct manipulation of embeddings is faster than invoking an LLM to merge texts, because vector arithmetic is
  computationally simple. By limiting LLM usage to when human-readable output is required, you can reduce latency and
  computational overhead.
- **Semantic Flexibility:**
  Instead of being constrained by specific source texts at the time of merging, you can explore and experiment with new
  conceptual territories quickly. You might weight one concept more heavily than another or combine multiple embeddings
  to
  form complex, nuanced ideas without ever needing to regenerate intermediate texts.
- **Reduced Dependence on Exact Source Text:**
  While the inversion from embedding to text is not perfectly faithful, in many scenarios—particularly those focused on
  brainstorming, conceptual exploration, or generating new ideas—highly accurate replication of the original text isn’t
  necessary. The approximate text reconstructed from the combined embedding can be good enough to communicate novel
  insights.

## Trade-offs and Considerations:

- **Fidelity to Original Sources:**
  If your application requires exact sourcing or word-for-word accuracy, then relying on embedding inversion will be
  less
  suitable. Traditional RAG, which references exact stored text, will remain the gold standard in those domains.
- **Model Quality:**
  The quality of the vec2text model matters. A well-trained inversion model can produce coherent and contextually
  relevant
  text that closely reflects the meaning embedded in the vectors. A less capable model could produce text that’s too
  vague
  or misses key details.
- **Evolving Tooling:**
  While vector databases and LLM-based pipelines for RAG are well established, the ecosystem for embedding inversion and
  manipulation is still maturing. This approach will benefit from ongoing research and improved tools, models, and best
  practices.

## Conclusion

Work such as vec2text is opening up exciting possibilities in how we handle
knowledge representation. By training a small model to invert embeddings back into text, we gain the freedom to
manipulate embeddings directly as semantic building blocks. This allows for a more flexible, efficient, and experimental
approach to concept generation and combination—one that relies less on repeated LLM-mediated transformations and more on
the inherent structure of the embedding space itself.
