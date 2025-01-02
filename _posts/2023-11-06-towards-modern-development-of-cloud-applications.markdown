---
layout: post
link: "https://sigops.org/s/conferences/hotos/2023/papers/ghemawat.pdf"
title: "Towards Modern Development of Cloud Applications"
tags: [ "software architecture" ]
---

This is a great read on some of the considerations of microservices (and a software approach to
addressing).

I'm minimizing the point of the paper, which is the authors' approach to solving the problem, because the clarity of
the benefits and issues with microservices is so good!

From the paper:

1. "It improves performance. Separate binaries can be scaled independently, leading to better resource utilization."
2. "It improves fault tolerance. A crash in one microservice doesn’t bring down other microservices, limiting the blast
   radius of bugs."
3. "It improves abstraction boundaries. Microservices require clear and explicit APIs, and the chance of code
   entanglement is severely minimized."
4. "It allows for flexible rollouts. Different binaries can be released at different rates, leading to more agile code
   upgrades."

However, as the number of microservices increases, the costs increase and can even contradict the benefits.

1. "**It hurts performance**. The overhead of serializing data and sending it across the network is increasingly
   becoming a bottleneck. When developers over-split their applications, these overheads compound."
2. "**It hurts correctness**. It is extremely challenging to reason about the interactions between every deployed
   version of every microservice. In a case study of over 100 catastrophic failures of eight widely used systems,
   two-thirds of failures were caused by the interactions between multiple versions of a system."
3. "**It is hard to manage**. Rather than having a single binary to build, test, and deploy, developers have to manage
   𝑛 different binaries, each on their own release schedule. Running end-to-end tests with a local instance of the
   application becomes an engineering feat."
4. "**It freezes APIs**. Once a microservice establishes an API, it becomes hard to change without breaking the other
   services that consume the API. Legacy APIs linger around, and new APIs are patched on top."
5. "**It slows down application development**. When making changes that affect multiple microservices, developers cannot
   implement and deploy the changes atomically. They have to carefully plan how to introduce the change across 𝑛
   microservices with their own release schedules."

In summary:

> When writing a distributed application,
> conventional wisdom says to split your application into separate services that can be rolled out independently.
> This approach is well-intentioned, but a microservices-based architecture like this often backfires,
> introducing challenges that counteract the benefits the architecture tries to achieve.
> Fundamentally, this is because microservices conflate logical boundaries (how code is written)
> with physical boundaries (how code is deployed).

Terrific!

The authors then go on to describe an approach to programming these services that allows developers to develop their
services as a single monolith, but then deploy and defer the physical separation of these services to runtime.

This is great, but also not something that every team can easily adopt.

Often, an issue is that the teams designing these services are not considering the developer ergonomics.
Any approach to architecture needs to consider that software is written by people.
And people need to be able to reason about the services, make changes across multiple services,
write tests that span multiple services, and so on.

This requires the twin-approach of considering the customer _and_ the engineer.

