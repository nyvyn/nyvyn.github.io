---
layout: post
title: "An approach to managing memory for interactive AI agents"
tags: [ "artificial intelligence" ]
---

I recently improved how memory is managed in my work on interactive AI agents, and am pleased with the results.

Taking a step back - there are various types of "memory" for agents, but I prefer to reduce it to two: there is the
context of the current conversation between the AI and the person, and then there is supporting context from previous
conversations between the two.

In the first case, the current conversation, this is really a balancing act of how much text the agent can use (the
context window) and compressing or truncating the text that has been shared between the two to fit within that window.

But the case I'm more interested is providing supporting context from prior conversations. That's more difficult because
the breadth of information grows upon each interaction and conversation.

The approach is fairly straightforward for agents today: use a vector database to store memories, retrieve them using
similarity comparing prior memories to the current user request, then taking the most similar and stuffing them into the
current conversation.

The variation on this that I've found successful is to re-query the vector store as follows:

* using the provided statement from the user, find the most similar memories previously stored
* take the top-most similar of those, and then find the most similar memories previously stored (this is the re-query)
* then merge those memories into a coherent narrative, preserving timestamps, for return to the context, using an LLM
  such as GPT-4 for the summarization

This re-query step seems to be quite useful in finding knowledge that typically isn't found on the first step
(memories that are related, but perhaps a tangent that can spark a new way approach).

---- 

For those interested, here are the prompts for writing new memories and consolidating retrieved ones:

Writing memories:
> You are an AI assistant responsible for helping a future AI remember a conversation between an AI persona and a human.
>
> The conversation is represented as a series of actions taken by the AI and the results of those actions, as follows: (
> actions taken here)
>
> Based on these past actions and experiences, the AI responded with: (response here)
>
> Based on the provided history and AI response, state what the initial request likely was (use your best judgement).
>
> Include that in a synopsis of the provided actions and the resulting response, along with the observed user behavior,
> emotions, preferences, and AI reasoning.
>
> This will be used as a memory to be recalled in a future conversation.

Reading memories:
> You are a brilliant linguist with perfect memory and recall.
>
> You're listening to a conversation between a human and an AI persona.
>
> This is what the human just said: (user input)
>
> This statement then triggered these memories of the AI persona: (retrieved memories)
>
> Synthesize these memories into a single coherent narrative to guide the AI persona in responding to the human.
>
> When possible, preserve when the memory was created so that the AI persona can use that information to respond to the
> human.
>
> Very important! Never make up new memories or add your own details to the memories.