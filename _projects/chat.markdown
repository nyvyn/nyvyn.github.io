---
layout: project
title: In-browser Chat
description: Demonstration of local browser model chat
date: 2025-01-16
---

<div class="uk-container uk-margin-top">
    <h2 class="uk-heading-line"><span>Chat Interface</span></h2>
    <div id="chat-display" class="uk-card uk-card-default uk-card-body uk-margin"></div>
    <form id="chat-form" class="uk-form-stacked">
        <div class="uk-margin">
            <input class="uk-input" type="text" id="user-input" placeholder="Type your message here...">
        </div>
        <button class="uk-button uk-button-primary" type="submit">Send</button>
    </form>
</div>

<script type="module">
import { pipeline } from "https://cdn.jsdelivr.net/npm/@huggingface/transformers@3.0.0";

// Create a text generation pipeline
const generator = await pipeline(
  "text-generation",
  "onnx-community/Qwen2.5-0.5B-Instruct",
  { dtype: "q4", device: "webgpu" },
);

// Define the list of messages
const messages = [
  { role: "system", content: "You are a helpful assistant." },
  { role: "user", content: "Tell me a funny joke." },
];

// Generate a response
const output = await generator(messages, { max_new_tokens: 128 });
document.getElementById('chat-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    const userInput = document.getElementById('user-input').value;
    if (userInput.trim() === '') return;

    // Display user message
    const chatDisplay = document.getElementById('chat-display');
    chatDisplay.innerHTML += `<div class="uk-alert-primary" uk-alert>${userInput}</div>`;

    // Add user message to messages
    messages.push({ role: "user", content: userInput });

    // Generate a response
    const output = await generator(messages, { max_new_tokens: 128 });
    const response = output[0].generated_text.at(-1).content;

    // Display assistant response
    chatDisplay.innerHTML += `<div class="uk-alert-success" uk-alert>${response}</div>`;

    // Clear input field
    document.getElementById('user-input').value = '';
});
</script>

