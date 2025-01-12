---
layout: project
title: Transformers.js Test
description: Test of loading ai models in browser
date: 2025-01-12
---

This is a test for loading an ai model directly in the browser. 

<div id="chatInterface" style="margin-top: 20px;">
    
</div>

<script type="module">
  
  import { setupChat } from "/assets/js/chat.js";
  import { setupWorker } from "/assets/js/listener.js";
  setupChat();
  setupWorker();
</script>
