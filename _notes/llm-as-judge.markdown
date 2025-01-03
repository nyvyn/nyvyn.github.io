---
layout: note
title: LLM as judge
description: Best practices when using LLMs as evaluators
date: 2025-1-3
status: Sprouting
references:
  - >-
    [Li, H., Dong, Q., Chen, J., Ai, Q., Zhou, Y., Liu, Y. (2024)](LLMs-as-Judges: A Comprehensive Survey on LLM-based Evaluation Methods. arXiv:2412.05579v1)
---

# Introduction

Large Language Models (LLMs) can serve as effective evaluators or "judges" for various tasks, from assessing writing
quality to reviewing code. When using LLMs as judges, they analyze inputs against specific criteria and provide
structured feedback or scores.

This approach offers several advantages:

- Consistency in evaluation across multiple submissions
- Scalability for large-scale assessment tasks
- Ability to provide detailed, multi-faceted feedback
- Quick turnaround compared to human evaluation

However, it's important to recognize their limitations and establish clear evaluation frameworks to ensure reliable
results.

# Limitations and Biases

When using LLMs as judges, several critical limitations and biases need to be considered:

## Presentation Biases
- Position bias: Tendency to favor responses based on their sequence position
- Verbosity bias: Tendency to favor longer responses regardless of content quality

## Social Biases
- Authority bias: Undue influence of authoritative source citations
- Diversity bias: Variations in judgment based on identity-related markers
- Bandwagon effect: Tendency to align with majority opinions

## Content and Cognitive Biases
- Sentiment bias: Favoring specific emotional tones
- Context bias: Influence of cultural contexts and examples
- Overconfidence: Inflated confidence in evaluation judgments
- Fallacy-oversight: Potential to miss logical fallacies

## Mitigation Strategies
- Implement multiple evaluation passes
- Use diverse sets of prompts
- Maintain human oversight for critical evaluations
- Regular bias testing and calibration
- Cross-validation with different model versions

These limitations underscore the importance of using LLMs as part of a broader evaluation framework rather than as sole arbiters.
