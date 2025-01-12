---
layout: project
title: Transformers.js Test
description: Test of loading ai models in browser
date: 2025-01-12
---

This is a test for loading an ai model directly in the browser. 

<div class="uk-container">
  <div class="uk-card uk-card-default uk-card-body uk-width-1-2@m">
    <h3 class="uk-card-title">Chat</h3>
    <div id="chatMessages" class="uk-height-medium uk-overflow-auto"></div>
    <form id="chatForm" class="uk-margin">
      <label for="chatInput"></label>
      <input class="uk-input" type="text" id="chatInput" placeholder="Type your message here...">
      <button class="uk-button uk-button-primary uk-margin-top" type="submit">Send</button>
    </form>
  </div>
</div>

<script type="module">
  const checkpoint = "onnx-community/Llama-3.2-1B-Instruct-q4f16";
  import { AutoTokenizer, AutoModelForCausalLM, env } from "https://cdn.jsdelivr.net/npm/@huggingface/transformers@3.2.4/dist/transformers.min.js";

  env.allowLocalModels = false;

  const device = "webgpu";
  const tokenizer = AutoTokenizer.from_pretrained(checkpoint);
  const model = AutoModelForCausalLM.from_pretrained(checkpoint).to(device);

  const inputs = tokenizer("a");
  await model.generate({ ...inputs, max_new_tokens: 1 });
</script>
