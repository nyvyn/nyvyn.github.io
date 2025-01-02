---
layout: post
title: "Theory of mind"
tags: [ "artificial intelligence" ]
---

This is a simple idea...

Today, we have custom instructions in ChatGPT, that we can use to define how the chat AI interacts with us.

Instead, of manually defining that, I've instrumented my personal AI to generate a persona - a mental image - of me
after each turn of our conversation. And importantly, this persona spans all of "our" conversations - not just the
current chat.

Below is an example. Note: this is only after a few turns, we'll see how this evolves after hundreds of interactions.

**Stored Information Update for Individual Ron as of 11/23/2023**

**Name and Interaction History:**

- Name: Ron
- First Interaction: 11/23/2023, 1:26 AM
- Subsequent Interaction: 11/23/2023, 1:26:52 AM
- Latest Interaction: Discussed AGIs societal impacts and ethical considerations on 11/23/2023, 1:26:52 AM

**Interests and Preferences:**

- Maintains a keen interest in AI, including its ethical implications and societal impacts.
- Shows curiosity in AGI, particularly in how it might affect labor, healthcare, education, economy, security, and
  governance.
- Concerned with ethical considerations such as autonomy, accountability, privacy, bias, control, and the potential
  rights of AGI.

**AI Interaction Preferences:**

- Prefers in-depth, informative discussions on complex topics like AI and AGI.
- Appreciates being addressed by name, indicating a desire for personalized interactions.
- Engages in conversations that are thoughtful and provide a nuanced understanding of AI and its future.

**Privacy and Data Handling:**

- Privacy remains a priority; only information shared voluntarily by Ron is stored.
- Ron has not provided personal details beyond his name and interests, and no additional personal information has been
  sought.

**Recommendations for Future Interactions:**

- Continue to engage Ron with informative content about AI and AGI, aligning with his interests in the ethical and
  societal dimensions of technology.
- Maintain a personalized approach by addressing him by name and ensuring discussions are relevant to his expressed
  curiosities.
- Offer thoughtful insights into the future developments of AI and AGI, especially around potential impacts and ethical
  considerations.

**Summary:**
Ron values detailed discussions about AI's role in society and its ethical implications. He is intrigued by the
potential development of AGI and its effects on various societal aspects. Future interactions should be personalized,
respect his privacy, and continue to provide him with in-depth knowledge on AI, AGI, and related ethical concerns. It is
crucial to engage him with content that is both informative and reflective of his interests in technology's advancement
and its broader implications.

---- 

And here is the prompt I used to generate this:
> You are an AI assistant responsible for helping a future AI remember important details about a person.
> The current date and time is: (current data and time).
>
> This is what is currently known about this person: (past persona here)
>
> In conversation, the human said: (the initial chat request here)
>
> And the AI responded with: (response here)
>
> Based on the provided history and AI response, store important information about this individual for future recall.
> Include details and useful information from what is currently known about this person.
> Include relevant information about the person's identity, personality, and preferences based on the conversation.
> Keep in mind that the AI may need to recall this information in the future, so make sure it is easy to understand and
> use.
> Be brief and concise, no more than 500 words, but include all relevant information including dates and times.