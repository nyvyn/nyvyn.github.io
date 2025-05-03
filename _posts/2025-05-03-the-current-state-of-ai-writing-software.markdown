layout: post
title: The current state of AI writing software
tags: [ "artificial intelligence" ]
---

One of my favorite topics to write about is AI - specially AI writing software.

And as of the time of this post, AI is a great co-collaborator for coding...
...with a pretty big caveat: it's not great working in large, complex codebases.

First, I'll talk about the benchmarks and then share some my thoughts on real-world performance.

## The Benchmarks

Last year, the times when AI was a great co-collaborator were admittedly fairly rare. 
I do specifically recall a time where I spent hours trying to find the source of a 
particularly tricky bug, to finally breakdown and ask AI for help—with immediate results.
But as I said, those happened less often than hoped for.

Then, late October of last year, Anthropic released Sonnet 3.5 1022, and AI coding went from
"a sometimes right" partner to "right more often than it's wrong". 

Interestingly, this is born out in the Aider Polyglot leaderboard with percent correct of 51.6%

As I'm sure you'll agree, when something moves into being right most of the time, it also is much more likely to be 
used.

Since Sonnet 3.5 (October), we're seeing even better performance from a number of providers 
including Google, OpenAI, and Anthropic's following update.

- Gemini 2.5 Pro is 72.9%
- o4-mini (high) is 72%
- Claude Sonnet 3.7 is 60.4% to 64.9% depending on whether thinking is enabled or not

This is real progress in the span of 5 months, and there's no reason to not believe this will continue.

## Notes on real-world performance

These leaderboards are a great way for us to compare the relative base performance of these models.
But they fail to capture the complex, nuanced world of software engineering.

And that's okay.

I believe that software engineering is as much art as science; not unlike writing a great novel.
(As an aside, this is born out in some recent research that shows the "language" part of the brain
is used more than the "math" part of the brain when writing software).

But, that's not to say that we can't use AI to facilitate this art/science activity.

Where current AI excels is in generating small, self-contained changes that are relatively isolated
from the larger codebase and which can be tested and verified to be accurate. 
It also tends to perform well in domains that are non-proprietary and that use modern languages and platforms.

This fits a number of my side projects: smaller codebases, written using Typescript,
and including a small set of well-known libraries as dependencies.

Where AI coding is challenged is:
- when the changeset spans multiple technology stacks, 
- when the changeset spans a large number of files,
- when the dependencies are proprietary in nature, 
- when dependent libraries have recent, major breaking changes.

In these cases, I don't use AI, but instead do the tedious work myself.

AI is also good at writing unit tests, decent at generating the first draft of documentation,
and good at proposing code in areas that are complex or tricky but "in the wild".

## Where is this all going?

I believe that we'll see two things over the next 12-18 months:

- AI will continue to improve, and it likely won't be long before we see our benchmarks saturated at 100%.
- We'll see increasingly effective methods at introducing or learning proprietary systems knowledge.

As these two things improve: capability and memory, we'll see correspondingly complex changesets from AI.





