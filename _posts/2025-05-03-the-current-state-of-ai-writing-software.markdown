---
layout: post
title: The current state of AI writing software
tags: [ "artificial intelligence" ]
---

One of my favorite topics to write about is AI - especially AI writing software.

At this time, AI is a great co-collaborator for coding... with a pretty big caveat: it's not 
great working in large, complex codebases.

Let's talk benchmarks and real-world examples.

## The Benchmarks

Last year, the instances when AI was a great co-collaborator were admittedly rare.
I recall a time when I spent hours trying to find the source of a particularly tricky bug, 
to finally breakdown and ask AI for help—with immediate results.
But as I said, those happened less often than hoped.

Then, in late October, Anthropic released Sonnet 3.5 1022, and AI coding went from
"a sometimes right" partner to "right more often than it's wrong". 

Interestingly, the Aider Polyglot leaderboard corroborates this with percent correct of 51.6% for this model.

Since Sonnet 3.5 (October), we're seeing even better performance from a number of providers 
including Google, OpenAI, and Anthropic's following update.

- Gemini 2.5 Pro is 72.9%
- o4-mini (high) is 72%
- Claude Sonnet 3.7 is 64.9% or 60.4% depending on whether thinking is enabled or not

This is real progress in the span of 5 months, and there's no reason not to believe this will continue.

## Notes on real-world performance

These leaderboards are a great way for us to compare the relative base performance of these models.
But they fail to capture the complex, nuanced world of software engineering.

And that's okay.

Where current AI excels is in generating small, self-contained changes that are relatively isolated
from the larger codebase and which can be tested and verified to be accurate. 
It also tends to perform well in domains that are non-proprietary and that use modern languages and platforms.

This fits a number of my side projects: smaller codebases, written using Typescript,
and using a small set of well-known libraries as dependencies.

Where AI coding is challenged is:
- when changes span multiple technology stacks, 
- when changes span a large number of files,
- when the dependencies are proprietary in nature, 
- when dependent libraries have recent, major breaking updates.

In these cases, I don't use AI, but instead do the tedious work myself.

AI is also good at writing unit tests, decent at generating the first draft of documentation,
and good at proposing code in areas that are complex or tricky but "in the wild".

## Where is this all going?

I believe that we'll see two things over the next 12 to 18 months:

- AI will continue to improve, and it likely won't be long before we see these benchmarks saturated at 100%.
- We'll see increasingly effective methods at memorizing or learning proprietary systems knowledge.

As these two things improve: capability and memory, we'll see correspondingly complex changesets from AI.





