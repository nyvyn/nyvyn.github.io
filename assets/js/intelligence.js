const IS_WEBGPU_AVAILABLE = !!navigator.gpu;
const STICKY_SCROLL_THRESHOLD = 120;
const EXAMPLES = [
  "Give me some tips to improve my time management skills.",
  "What is the difference between AI and ML?",
  "Write python code to compute the nth fibonacci number.",
];

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

const textareaRef = document.getElementById('textarea');
const chatContainerRef = document.getElementById('chatContainer');

function onEnter(message) {
  messages.push({ role: "user", content: message });
  tps = null;
  isRunning = true;
  input = "";
  updateUI();
}

function onInterrupt() {
  if (worker) {
    worker.postMessage({ type: "interrupt" });
  }
}

function resizeInput() {
  if (!textareaRef) return;

  textareaRef.style.height = "auto";
  const newHeight = Math.min(Math.max(textareaRef.scrollHeight, 24), 200);
  textareaRef.style.height = `${newHeight}px`;
}

function setupWorker() {
  if (!worker) {
    worker = new Worker('./worker.js', { type: "module" });
    worker.postMessage({ type: "check" });
  }

  worker.addEventListener("message", onMessageReceived);
  worker.addEventListener("error", onErrorReceived);
}

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
  updateUI();
}

function onErrorReceived(e) {
  console.error("Worker error:", e);
}

function updateUI() {
  // Update the UI based on the current state
  // This function should manipulate the DOM to reflect the current state
  // For example, updating the chat messages, enabling/disabling buttons, etc.
}

function initialize() {
  setupWorker();
  textareaRef.addEventListener('input', (e) => {
    input = e.target.value;
    resizeInput();
  });

  textareaRef.addEventListener('keydown', (e) => {
    if (input.length > 0 && !isRunning && e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onEnter(input);
    }
  });

  // Initialize other UI elements and event listeners
}

document.addEventListener('DOMContentLoaded', initialize);
