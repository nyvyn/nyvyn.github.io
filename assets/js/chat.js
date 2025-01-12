function setupChat() {
  const containerElement = document.createElement('div');
  containerElement.id = 'chatInterface';
  containerElement.style.marginTop = '20px';
  document.body.appendChild(containerElement);
  const chatContainer = document.createElement('div');
  chatContainer.className = 'uk-container uk-margin-top';

  const chatBox = document.createElement('div');
  chatBox.className = 'uk-card uk-card-default uk-card-body uk-margin-bottom';
  chatBox.style.height = '400px';
  chatBox.style.overflowY = 'auto';

  const messageList = document.createElement('ul');
  messageList.className = 'uk-list';

  const inputContainer = document.createElement('div');
  inputContainer.className = 'uk-flex uk-flex-middle';

  const inputField = document.createElement('input');
  inputField.className = 'uk-input uk-margin-right';
  inputField.type = 'text';
  inputField.placeholder = 'Type your message...';

  const sendButton = document.createElement('button');
  sendButton.className = 'uk-button uk-button-primary';
  sendButton.textContent = 'Send';

  inputContainer.appendChild(inputField);
  inputContainer.appendChild(sendButton);

  chatBox.appendChild(messageList);
  chatContainer.appendChild(chatBox);
  chatContainer.appendChild(inputContainer);
  containerElement.appendChild(chatContainer);

  sendButton.addEventListener('click', function() {
    const messageText = inputField.value.trim();
    if (messageText) {
      const messageItem = document.createElement('li');
      messageItem.textContent = messageText;
      messageList.appendChild(messageItem);
      inputField.value = '';
      // Send the message to the listener
      window.dispatchEvent(new CustomEvent('sendMessage', { detail: messageText }));
    }
  });
}

document.addEventListener('DOMContentLoaded', setupChat);
});
