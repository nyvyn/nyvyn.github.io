---
layout: post
title: "Thoughts on AGI - June 2023"
tags: [ "artificial intelligence" ]
---

Early versions of GPT-4 could “solve novel and difficult tasks that span mathematics, coding, vision, medicine, law,
psychology, and more, without needing any special prompting.” - [Sparks of Artificial General Intelligence][1] research
paper by Microsoft Research, April 13 2023.

In contrast to this statement, I suspect many people have been wondering, “if AI is so smart, why isn’t it helping me
with my work?” To which, a reasonable response is - good question.

---- 

Watson won Jeopardy in 2011. Jeopardy is interesting because it’s a contest that requires accuracy, speed, and a little
luck (the Final Jeopardy requires a wager). This [article in the NY Times][2] notes:

> “The danger is to buzz too early, in which case the contestant is penalized and “locked out” for roughly a quarter of
> a second. Watson, on the other hand, does not anticipate the light, but has a weighted scheme that allows it, when it is
> highly confident, to hit the buzzer in as little as 10 milliseconds, making it very hard for humans to beat.

Humans value a broad range of intellectual qualities - including speed and responsiveness.

---- 

To differentiate AI competency, we’ve come up with different names: Artificial Narrow Intelligence (ANI) to note
intelligences that can do one or two things as well or better than people; and Artificial General Intelligence (AGI) to
describe intelligences that can perform any intellectual task that a human being can do.

On a spectrum of competence, GPT-3.5 is maybe at a midpoint towards AGI and GPT-4 is much further along.

---- 

I asked GPT-4 to define the required characteristics of AGI:

> **Generalization**
> : AGI can learn and adapt to a wide range of tasks, not just specialized ones.
> **Reasoning and Problem Solving**
> : AGI can analyze complex situations, apply logic, and develop solutions to problems it has not encountered before.
> **Understanding Natural Language**
> : AGI can comprehend and fluently communicate in human languages, allowing for seamless interaction with humans.
> **Creativity**
> : AGI can generate novel ideas, insights, and approaches to problem-solving.
> **Intuition**
> : AGI can make decisions based on incomplete or ambiguous information by recognizing patterns and drawing on
> previously learned knowledge.
> **Autonomy**
> : AGI can operate independently without the need for constant human input or supervision.
> **Learning Ability**
> : AGI is capable of learning from data, experiences, and its environment, improving its performance over time.
> **Emotion Understanding**
> : AGI can recognize and respond appropriately to human emotions, allowing for more empathetic interactions.
> **Self-awareness**
> : AGI possesses self-awareness and an understanding of its own existence, capabilities, and limitations.
> **Ethics and Morality**
> : AGI can understand and adhere to ethical principles and moral values.

From my use of GPT-4, I believe it can reason and problem solve, that it’s creative, it can certainly understand natural
language, and it can generalize. But it can’t permanently learn new things without extensive time and cost (in-context
learning and fine-tuning), it’s not autonomous, it’s not self-aware, and it doesn’t have a moral compass.

---- 

In some ways, we should think of AI not as Artificial Intelligence, but as an Alien Intelligence. It can emulate some
abilities of humans to think, reason, plan and so forth, but it is not human.

An analogy is if a real alien learned all about humans by reading the internet the past 20 years. It may be able to
communicate and share memes and jokes, but those would all be reflections of humanity through a mirror of our own
devising - the alien would never be human.

---- 

I’ve spent much of my personal time over the past couple of months working on and learning about autonomous agents:
computer software or robots that can accomplish one or more tasks in pursuit of an objective or goal.

Much of this involves looping or recursively calling a large language model:

- AI requests the use of a tool to accomplish an action towards solving a goal or problem.
- Software uses that tool on behalf of the AI (generally API invocations or desktop interactions) and returns the
  results
- The AI then decides on the next action and tool to use
- And this repeats until the objective or goal is complete.

What’s incredible is that this works well - most of the time.

Yes, agents have a reputation for never-ending loops. But these problems can be mitigated with some clever approaches
such as feedback to provide guidance and limiting the length of loops and depth of recursions.

Based on this work, I believe that to achieve a near, if imperfect version of AGI, we need at least two things:

1. the ability for the AI to use one or more tools to interact with the world
2. a near real-time, persistent memory of previous interactions and their results

With very little code, we can provide tools for use by AI right now.

However, the best we can do for memory is to “fake it”: by feeding the results of all prior actions as part of the
looping request.

This is dependent on something called the “context window” which is how much content can be provided to the AI before it
exceeds some threshold of memory. And for now, we’re limited to a few thousand words; though recent advances in the past
week have increased that to ten thousand words or so.

The other approach to persistent memory is to fine-tune the model on the previous interactions and their results, which
is either not possible due to API restrictions or cost-prohibitive.

Bottom line: at this point in time, we need a better way to persist memory so that language models can learn through
interactions with the world.

---- 

Back to the original question of how AI can help you with your work: I use AI to help me with my work every day. And I’m
not talking about the classic versions of machine learning, but instead generative AI to help me accomplish my daily
tasks.

Recently, I used an autonomous agent to produce the first draft of a market research report. I had GPT-4 help me find a
bug in my software that I’d spent hours trying to find. I used it to write portions of this document you’re reading. And
I’m confident that I’ll continue to find more ways to use AI.

My advice (if you haven’t already) is to pay the \$20/mo subscription to ChatGPT Plus and immediately enable Plugins as
a beta feature in Settings. This is a super power - like NEO searching for Morpheus - you can have the computer search
for on your behalf and compile it into a coherent result.

If you need financial and data analysis, then just copy and paste it directly from Excel into ChatGPT and start asking
questions.

If you have a complex article to read, feed it into ChatGPT and ask it to summarize and highlight the key points. I do
this regularly as it helps me understand what the article is about ahead of the deeper dive; and I've found this
practice improves my understanding and recall.

BTW, soon we’ll have access to the Code Interpreter plugin and it will feel like we've been given another superpower:
the ability to create charts, graphs, and do data analysis just by asking.

If you’re a software engineer, I believe ChatGPT Plus is a must buy - and you should just pay for it yourself if your
company isn’t reimbursing you. GPT-4 is far superior to GPT-3 in writing code that works, and that will save you even
more time than relying on the free GPT-3 version.

Additionally, there will be more and more tools that let you use AI to do your work. It won’t be long before we can use
Microsoft Copilot or Google’s Duet to write emails, documents, spreadsheets, and more.

And ahead of that, you can find AI popping up all over: I’m writing this using [Type.ai][3] and I regularly
use [Beautiful.ai][4] to create slide decks. (I’m not affiliated with either; I just like using their products.)

---- 

**Important: please be aware of and adhere to your company’s acceptable use policy.** It’s very likely that sharing
company confidential or proprietary information with ChatGPT is prohibited. If so, you’ll need to sanitize and anonymize
the information. Or, you may not be able to use it at all if its not approved or if its use is prohibited.

But, don’t take my word for it, ask your manager or your head of security please.

---- 

Reach out to me if you’d like to talk about AI; and I’d love to discuss autonomous agents.

[1]:    https://arxiv.org/abs/2303.12712 "Sparks of Artificial General Intelligence: Early experiments with GPT-4"

[2]:    https://www.nytimes.com/2011/02/17/science/17jeopardy-watson.html "Computer Wins on ‘Jeopardy!’: Trivial, It’s Not"

[3]:    https://type.ai "Type.ai"

[4]:    https://beautiful.ai "Beautiful.ai"