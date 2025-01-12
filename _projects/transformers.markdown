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
  document.getElementById('chatForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const input = document.getElementById('chatInput');
    const message = input.value;
    input.value = '';

    // Append the user's message to the chat window
    const chatMessages = document.getElementById('chatMessages');
    const userMessageElement = document.createElement('div');
    userMessageElement.textContent = `User: ${message}`;
    chatMessages.appendChild(userMessageElement);

    // Dispatch the sendMessage event
    const sendMessageEvent = new CustomEvent('sendMessage', { detail: message });
    window.dispatchEvent(sendMessageEvent);
  });
</script>

<script type="module" src="/assets/js/listener.js"></script>
