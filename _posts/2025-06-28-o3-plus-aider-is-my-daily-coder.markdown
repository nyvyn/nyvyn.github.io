---
layout: post
title: “o3 plus Aider is my daily coder”
tags: ["artificial intelligence", "software engineering"]
---

A few weeks ago, OpenAI dropped the price of o3. Because of that, it’s now cheap enough to use as my daily coder.

I use Aider with o3 in Architect mode: which directs o3 to make a plan and then 4.1 to make the edits. It’s a great combination.

The o3 model uses fewer “thinking” tokens than Gemini, which means that even though Gemini is cheaper for total tokens, o3 is less expensive to use overall:

| Model                                    | Percent Correct | Cost   | Command                                                                   | Correct Edit Format |
|------------------------------------------|-----------------|--------|---------------------------------------------------------------------------|---------------------|
| gemini-2.5-pro-preview-06-05 (32k think) | 83.1%           | $49.88 | `aider --model gemini/gemini-2.5-pro-preview-06-05 --thinking-tokens 32k` | diff-fenced         |
| o3 (high)                                | 81.3%           | $21.23 | `aider --model o3 --reasoning-effort high`                                | diff                |
| gemini-2.5-pro-preview-06-05 (default)   | 79.1%           | $45.60 | `aider --model gemini/gemini-2.5-pro-preview-06-05`                       | diff-fenced         |
| o3 (high) + gpt-4.1                      | 78.2%           | $17.55 | `aider --model o3`                                                        | architect           |
| o3                                       | 76.9%           | $13.75 | `aider --model o3`                                                        | diff                |
| gemini-2.5-pro-preview-05-06             | 76.9%           | $37.41 | `aider --model gemini/gemini-2.5-pro-preview-05-06`                       | diff-fenced         |
| gemini-2.5-pro-preview-03-25             | 72.9%           | —      | `aider --model gemini/gemini-2.5-pro-preview-03-25`                       | diff-fenced         |


