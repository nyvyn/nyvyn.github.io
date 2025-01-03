---
layout: note
title: Embedding inversion
description: Exploring a concept-driven approach using embedding inversions
status: Sprouting
---

What if AI memory could evolve like the human mind? Instead of static storage, the system would adapt, merge similar
concepts, and refine its knowledge over time, reducing redundancy and preserving meaning.

## Dynamic memory architecture

Traditional vector databases treat embeddings as fixed data points. While effective for search, they lack adaptability.

As an example, consider two complex concepts, each represented as an embedding vector:

- **Concept A**: “quantum computing for accelerating drug discovery”
- **Concept B**: “personalized medicine tailored to individual genetic profiles”

Assuming a need to combine them (this need is explored further below):

- **Merged C**: "quantum-accelerated, genetically-tailored drug design”

In a vector database, the embedding is only used as an identifier of associated text: both must be stored and retrieved.
And merging concepts requires a smart intemediary such as an LLM:

1. **Retrieve text** describing each concept.
2. **Use a language model (LLM)** to merge and summarize the texts into a coherent narrative.
3. **Re-embed the merged text** to produce a final vector representation.

## Inverting embeddings

In the research paper,
["Text Embeddings Reveal (Almost) As Much As Text"](https://arxiv.org/pdf/2310.06816),
it was demonstrated that a lightweight model could be trained to invert embeddings back to a close approximation of
the original text with a 97% accuracy up to 32 tokens.

Building on this approach, consider an alternative: instead of pulling in original texts, asking an LLM to read them,
and producing a new blended text to embed again, we can stay entirely within the embedding space until we need a
human-readable output.

1. **Start with embeddings:**  
   There are embeddings that represent “Quantum computing for accelerating drug discovery” and 
   “Personalized  medicine tailored to individual genetic profiles.” Instead of retrieving original texts, these 
   vectors are directly transformed.

2. **Merge embeddings directly:**  
   To form the new concept “quantum-accelerated, genetically-tailored drug design,” two original
   vectors are mathematically combined, by averaging or interpolating. This vector arithmetic is 
   both efficient and straightforward, requiring no external calls at this step.

3. **Invert the combined embedding:**  
   When the text is needed, a library such as `vec2text` is used to invert the embedding into text. The resulting 
   text won’t be identical to any original document, but it will be semantically close enough
   to convey the intended idea: a fusion of quantum-accelerated drug discovery with personalized genetic medicine.

This direct embedding manipulation approach moves the dependency on an LLM from merging in a vector database
to text reconstruction - though a smaller and more efficient mdoel is used. This will be examined more in tradeoffs
below.

## A more human-like model of memory formation

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

## Conclusion

Work such as vec2text is opening up new possibilities in how we handle knowledge representation. By training a small
model to invert embeddings back into text, we gain the freedom to manipulate embeddings directly as semantic
building blocks. This allows for a more flexible, efficient, and experimental approach to concept generation and
combination—one that relies less on repeated LLM-mediated transformations and more on
the inherent structure of the embedding space itself.
