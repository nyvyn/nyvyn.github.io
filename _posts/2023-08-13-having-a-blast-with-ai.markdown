---
layout: post
title: "Having a blast with AI"
tags: [ "artificial intelligence" ]
---

I’ve been having an absolute blast with AI (GPT3.5/GPT4 from OpenAI) and wanted to share some of my enthusiasm.

Over and over, I’ve experienced situations where using AI has allowed me to do something that I might not have been able
to do otherwise. And I see this most often when writing software; applying AI lets me solve problems that would have
been difficult or impossible for me previously.

As an example, yesterday morning I was working on a learning project, and wrote an “Editor AI” to edit block-based
documents. Additionally, the Editor AI can direct a “Chat AI” to use tools on its behalf, such as web searches, reading
PDFs, and writing short sections of code.
(this is an example of two AIs cooperating to achieve an objective)

Note: the Chat AI is not new, I’ve had it working for some time.

What surprised me was how fast it was to write this Editor AI (using GPT4 as I needed the greater intelligence it
provides). In short, the prompt incorporates the desired objective, the contents of the block-based document, and
commands it can respond with: “add”, “delete”, “move”, “replace”. Each of these commands in turn correspond to some
function of the software to perform the appropriate operation(s).

And it works great!

Adding this new functionality now enables using natural language to direct the Editor AI to accomplish a request. For
example, “add a title on topic Y”, “swap these two sections”, “add an executive summary”, “add a table of contents”, and
so on.

To demonstrate this a little further, here’s what happens when the Editor AI is asked to “add five novel facts about
topic Z after the title”:

- The Editor AI is provided the document as context and the four commands it can respond with.
- Based on the block identifiers and the block contents of the document, and given a specific objective, the Editor AI
  determines that the best command is to add a new block at a specified insertion point (after the title). Note, to
  accomplish this, the AI has to know what a “title” is and the title’s relation to the other document sections.
- Additionally, the Editor AI provides direction to the Chat AI on what topic to research and how to format the
  response - in this case, researching topic Z and returning five novel facts. Note, this is the first AI telling the
  second AI what to do.
- Based on the direction provided by the Editor AI, the Chat AI might decide to perform a web search, which may then
  lead it to summarize one or more web pages from the web search, and then respond with the requested facts. Note, this
  is an AI agent that is using one or more tools to accomplish an objective.
- Finally, this response is inserted into the appropriate position in the document.

And what’s really astounding, is that we’re still early days with this new technology.