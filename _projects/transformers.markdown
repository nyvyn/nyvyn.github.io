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

<script src="https://cdn.jsdelivr.net/npm/@xenova/transformers@2.6.0/dist/transformers.min.js"></script>
<script type="module">

  // Initialize the text generation pipeline
  let textGenerationPipeline;

  async function setupModel() {
    textGenerationPipeline = await window.transformers.pipeline('text-generation', 'gpt2');
  }

  setupModel();
  document.getElementById('chatForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const input = document.getElementById('chatInput');
    const message = input.value.trim();
    if (message) {
      if (textGenerationPipeline) {
        // Generate a response using the model
        textGenerationPipeline(message, { max_length: 50 }).then(response => {
          const chatMessages = document.getElementById('chatMessages');
          
          // Display the user's message in the chat
          const userMessageElement = document.createElement('div');
          userMessageElement.textContent = `User: ${message}`;
          chatMessages.appendChild(userMessageElement);

          // Display the bot's response in the chat
          const botMessageElement = document.createElement('div');
          botMessageElement.textContent = `Bot: ${response[0].generated_text}`;
          chatMessages.appendChild(botMessageElement);
        });
      }
    }
  });

  // Listen for messages from the worker
  window.addEventListener('message', function(event) {
    if (event.data && event.data.status === 'complete') {
      const chatMessages = document.getElementById('chatMessages');
      const botMessageElement = document.createElement('div');
      botMessageElement.textContent = `Bot: ${event.data.output}`;
      chatMessages.appendChild(botMessageElement);
    }
  });
</script>
