let worker = null;
let status = "loading";
let error = null;
let loadingMessage = "";
let progressItems = [];
let isRunning = false;
let messages = [];
let tps = null;
let numTokens = null;

document.addEventListener('DOMContentLoaded', (event) => {
  setupWorker();
});

export function setupWorker() {

  if (!worker) {
    worker = new Worker('/assets/js/worker.js', { type: "module" });
    worker.postMessage({ type: "check" });
  }

  worker.addEventListener("message", onMessageReceived);
  worker.addEventListener("error", onErrorReceived);

  // Load the model when the worker is set up
  worker.postMessage({ type: "load" });

  // Listen for messages from chat.js
  window.addEventListener('sendMessage', function(event) {
    const messageText = event.detail;
    if (worker && status === "ready") {
      worker.postMessage({ type: "generate", data: [{ role: "user", content: messageText }] });
      isRunning = true;
    }
  });
}

function onMessageReceived(e) {
  switch (e.data.status) {
    case "loading":
      status = "loading";
      loadingMessage = e.data.data;
      status = "complete";
      // Dispatch a custom event with the assistant's response
      const botResponseEvent = new CustomEvent('botResponse', {
        detail: messages[messages.length - 1].content
      });
      window.dispatchEvent(botResponseEvent);
      break;
    case "initiate":
      progressItems.push(e.data);
      break;
    case "progress":
      progressItems = progressItems.map(item => item.file === e.data.file ? { ...item, ...e.data } : item);
      break;
    case "done":
      progressItems = progressItems.filter(item => item.file !== e.data.file);
      break;
    case "ready":
      status = "ready";
      break;
    case "start":
      messages.push({ role: "assistant", content: "" });
      break;
    case "update":
      const { output, tps: newTps, numTokens: newNumTokens } = e.data;
      tps = newTps;
      numTokens = newNumTokens;
      const lastMessage = messages[messages.length - 1];
      lastMessage.content += output;
      break;
    case "complete":
      isRunning = false;
      break;
    case "error":
      error = e.data.data;
      break;
  }
}

function onErrorReceived(e) {
  console.error("Worker error:", e);
}
