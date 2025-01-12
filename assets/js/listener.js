let worker = null;
let status = null;
let error = null;
let loadingMessage = "";
let progressItems = [];
let isRunning = false;
let input = "";
let messages = [];
let tps = null;
let numTokens = null;

function setupWorker() {
  if (!worker) {
    worker = new Worker('./worker.js', { type: "module" });
    worker.postMessage({ type: "check" });
  }

  worker.addEventListener("message", onMessageReceived);
  worker.addEventListener("error", onErrorReceived);
  // Listen for messages from chat.js
  window.addEventListener('sendMessage', function(event) {
    const messageText = event.detail;
    if (worker && status === "ready") {
      worker.postMessage({ type: "generate", data: [{ role: "user", content: messageText }] });
      isRunning = true;
    }
  });

function onMessageReceived(e) {
  switch (e.data.status) {
    case "loading":
      status = "loading";
      loadingMessage = e.data.data;
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

function initialize() {
  setupWorker();
}

document.addEventListener('DOMContentLoaded', initialize);
