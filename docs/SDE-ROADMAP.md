# SDE-1 → Senior Lead Developer: Practical Roadmap

> Problem-first, theory-minimal. Every section leads with what to build/solve, not what to read.

---

## PHASE 1: Foundations & Design Patterns (Weeks 1-6)

### References for Phase 1
- **"Design Patterns: Elements of Reusable Object-Oriented Software"** (Gang of Four — Gamma, Helm, Johnson, Vlissides) — the definitive source; read the pattern catalog chapters relevant to each week
- **"Head First Design Patterns"** (Freeman & Robson) — more approachable, Java-based examples with visual explanations
- **Refactoring.Guru** (https://refactoring.guru/design-patterns) — best free online reference with code in multiple languages
- **"Dive Into Design Patterns"** (Alexander Shvets) — companion book to Refactoring.Guru, pattern-by-pattern with real-world examples
- **Christopher Okhravi's Design Patterns playlist** (YouTube) — concise video walkthroughs of each GoF pattern

### Week 1-2: Creational Patterns — Build These

| Pattern | Practice Problem | What to Build |
|---------|-----------------|---------------|
| **Singleton** | Build a thread-safe config manager | Logger service that guarantees single instance across modules |
| **Factory Method** | Build a document parser (PDF, CSV, JSON) | Parser that auto-selects strategy based on file extension |
| **Abstract Factory** | Build a cross-platform UI toolkit | Component factory that produces Material/Ant Design elements |
| **Builder** | Build a query builder | SQL query builder: `Query.select('users').where({age: '>30'}).orderBy('name').build()` |
| **Prototype** | Build a game entity cloner | Deep-clone complex nested objects with circular references |

**Interview Questions (Actually Asked):**
1. Design a database connection pool manager. How do you ensure only N connections exist? *(Amazon SDE-2)*
2. You have 5 payment gateways (Stripe, PayPal, Razorpay, Square, Adyen). Design a system where adding a new gateway requires zero changes to existing code. *(Flipkart SDE-2)*
3. Build a notification factory that creates Email/SMS/Push/WhatsApp notifications. Each has different required fields. How do you validate at compile time? *(Google L4)*
4. Design a meal customization system (like Subway). Burger has bun, patty, toppings, sauces — each with variants. How do you avoid telescoping constructors? *(Uber SDE-2)*
5. How would you implement a prototype registry for a game where cloning an entity is 100x cheaper than creating from scratch? *(Microsoft SDE-2)*

### Week 3-4: Structural Patterns — Build These

| Pattern | Practice Problem | What to Build |
|---------|-----------------|---------------|
| **Adapter** | Wrap a legacy XML API to return JSON | Adapter for 3 different map APIs (Google, Mapbox, HERE) behind one interface |
| **Decorator** | Build middleware pipeline | Request pipeline: Auth → RateLimit → Logging → Cache → Handler |
| **Facade** | Simplify a complex subsystem | Single `OrderFacade.place(order)` that coordinates inventory, payment, shipping, notification |
| **Proxy** | Build a caching proxy | Image proxy that lazy-loads, caches, and resizes on demand |
| **Composite** | Build a file system tree | Nested menu system with items and sub-menus, uniform interface |
| **Bridge** | Decouple abstraction from implementation | Notification system: channels (Email/SMS) x urgency (Immediate/Batched/Digest) |

**Interview Questions (Actually Asked):**
6. You're integrating with 3 different SMS providers. Each has a different API contract. How do you make them interchangeable without changing business logic? *(Razorpay SDE-2)*
7. Design a logging system where you can dynamically add capabilities: timestamps, log levels, file output, remote shipping — in any combination. *(Amazon SDE-2)*
8. Build an access control proxy that checks permissions before allowing method calls on a service object. *(Google L4)*
9. Design a pricing engine where discounts can be stacked: percentage off, flat discount, buy-one-get-one, loyalty points — in any order. *(Walmart SDE-2)*
10. Design an e-commerce product category system where categories can nest infinitely and you need to calculate total price/weight for any subtree. *(Flipkart SDE-3)*

### Week 5-6: Behavioral Patterns — Build These

| Pattern | Practice Problem | What to Build |
|---------|-----------------|---------------|
| **Strategy** | Build a sorting visualizer with swappable algorithms | Compression service: gzip/brotli/lz4 chosen based on content type |
| **Observer** | Build an event emitter from scratch | Stock price tracker: multiple displays update when price changes |
| **Command** | Build undo/redo for a drawing app | Task queue where commands can be serialized, queued, retried |
| **State** | Build a vending machine | Order lifecycle: Draft → Confirmed → Preparing → Shipped → Delivered → Returned |
| **Template Method** | Build a data pipeline framework | ETL framework: extract/transform/load steps customizable per source |
| **Chain of Responsibility** | Build an expense approval workflow | Validation chain: format → business rules → fraud check → compliance |
| **Iterator** | Build a paginated API result iterator | Cursor-based pagination that lazily fetches next page |
| **Mediator** | Build a chat room | Air traffic control: planes communicate through tower, not directly |
| **Memento** | Build version history for a form | Auto-save with ability to restore any previous state |

**Interview Questions (Actually Asked):**
11. Design a ride pricing engine where the pricing strategy changes based on demand, time of day, surge, and user loyalty tier. *(Uber Staff)*
12. Design an event-driven system where placing an order triggers: inventory update, payment charge, email notification, analytics event — but any can fail independently. *(Amazon SDE-3)*
13. Implement undo/redo for a collaborative spreadsheet. Commands must be serializable for sync across clients. *(Google L5)*
14. Design the state machine for a food delivery order. Handle edge cases: restaurant cancels after rider is assigned, customer modifies mid-preparation. *(Swiggy SDE-3)*
15. Design a request validation pipeline for a banking API. Each validator can approve, reject, or escalate. Order matters. New validators added weekly. *(Goldman Sachs)*

---

## PHASE 2: Low-Level Design Mastery (Weeks 7-14)

### References for Phase 2
- **"Clean Code"** (Robert C. Martin) — principles for writing maintainable classes and methods that underpin good LLD
- **"Head First Object-Oriented Analysis and Design"** (McLaughlin, Pollice, West) — OO thinking, use cases to classes workflow
- **GitHub: ashishps1/awesome-low-level-design** (https://github.com/ashishps1/awesome-low-level-design) — curated LLD problems with full solutions in Java/Python/C++
- **"Object-Oriented Software Engineering"** (Bruegge & Dutoit) — rigorous treatment of UML, class diagrams, and design methodology
- **Educative: "Grokking the Low-Level Design Interview Using OOD Principles"** — interactive course with step-by-step LLD walkthroughs
- **YouTube: Concept && Coding (Shreyansh Jain)** — excellent Hindi/English LLD walkthroughs for each classic problem

### LLD Framework (Use This Every Time)

```
Step 1: Clarify Requirements (3 min)
  - Core use cases (list 4-5)
  - Users/actors
  - Scale hints (single machine? distributed?)

Step 2: Identify Core Objects (5 min)
  - Nouns → Classes
  - Verbs → Methods
  - Adjectives → Attributes/States

Step 3: Relationships & Interfaces (5 min)
  - is-a (inheritance), has-a (composition), uses-a (dependency)
  - Define interfaces/contracts FIRST

Step 4: Apply Patterns (5 min)
  - Which behavioral patterns fit?
  - Where do you need extensibility?

Step 5: Handle Edge Cases (5 min)
  - Concurrency, failure modes
  - State transitions, race conditions

Step 6: Write Key Code (15 min)
  - Core classes + interfaces
  - One complete flow end-to-end
```

### Problem Set — Solve in This Exact Order

#### Tier 1: Warm-Up (1 problem/day)

| # | Problem | Key Patterns | Time |
|---|---------|-------------|------|
| 1 | **Parking Lot** | Strategy (pricing), Factory (vehicle types), Observer (availability) | 45 min |
| 2 | **Library Management System** | Observer (due date alerts), State (book: available/checked-out/reserved), Facade | 45 min |
| 3 | **Tic-Tac-Toe** | Strategy (AI vs human), State (game states), Factory (board sizes) | 35 min |
| 4 | **Vending Machine** | State (idle/has-money/dispensing), Chain (coin validation) | 40 min |
| 5 | **Stack Overflow** | Observer (notifications), Strategy (ranking), Composite (comments) | 50 min |

**Interview Questions (Actually Asked) — Tier 1:**
16. Design a parking lot that supports multiple vehicle sizes, multiple floors, and real-time availability. Add entry/exit gate management. *(Amazon SDE-2 — asked 50+ times)*
17. Design a library system with book reservations, waitlists, and overdue fine calculation. *(Microsoft SDE-2)*
18. Design a tic-tac-toe game that supports NxN boards and K-in-a-row win condition. *(Meta E4)*
19. Design a vending machine. Handle: exact change only, out of stock, coin return, multiple products. *(Goldman Sachs SDE-2)*
20. Design a Q&A platform with voting, reputation system, and tag-based search. *(Atlassian Senior)*

#### Tier 2: Core LLD (2-3 days each)

| # | Problem | Key Patterns | Time |
|---|---------|-------------|------|
| 6 | **Elevator System** | State Machine, Strategy (scheduling: LOOK/SCAN/SSTF), Observer | 60 min |
| 7 | **Hotel Booking System** | Strategy (pricing), State (room lifecycle), Observer (booking events) | 60 min |
| 8 | **Food Delivery App** | State (order lifecycle), Strategy (assignment), Observer (tracking), Factory (restaurant types) | 75 min |
| 9 | **Splitwise / Expense Sharing** | Strategy (split types), Observer (balance updates), Mediator (group settlements) | 60 min |
| 10 | **Chess Game** | Strategy (piece movement), Command (moves for undo), State (check/checkmate), Factory (pieces) | 75 min |
| 11 | **Movie Ticket Booking** | State (seat: available/locked/booked), Strategy (pricing), Proxy (seat locking with TTL) | 60 min |
| 12 | **LRU Cache** | Custom data structure (DLL + HashMap), Proxy pattern | 45 min |

**Interview Questions (Actually Asked) — Tier 2:**
21. Design an elevator system for a 50-floor building with 6 elevators. Optimize for average wait time. *(Google L4, Amazon SDE-3)*
22. Design a hotel booking system with room types, seasonal pricing, overbooking strategy, and cancellation policies. *(Booking.com Senior)*
23. Design the order management system for Swiggy/DoorDash. Handle: multi-restaurant orders, rider assignment, real-time tracking, partial cancellations. *(Uber SDE-3, Swiggy SDE-3)*
24. Design Splitwise. Support: equal split, exact amounts, percentage split, group simplification of debts. *(Google L4 — very frequently asked)*
25. Design a chess game with move validation, check/checkmate detection, and game history. *(Microsoft SDE-3, Amazon SDE-2)*
26. Design BookMyShow seat booking. Handle: temporary seat locks, concurrent bookings, seat maps, dynamic pricing. *(Flipkart SDE-3, Paytm SDE-3)*
27. Design an LRU Cache with O(1) get/put. Extend it to support TTL and size-based eviction. *(Everyone asks this)*

#### Tier 3: Advanced LLD (3-4 days each)

| # | Problem | Key Patterns | Time |
|---|---------|-------------|------|
| 13 | **Rate Limiter** | Strategy (token bucket/sliding window/fixed window), Decorator | 60 min |
| 14 | **Pub/Sub Messaging System** | Observer, Mediator, Iterator (consumer groups) | 75 min |
| 15 | **Task Scheduler** | Command (tasks), Strategy (scheduling), State (task lifecycle), Priority Queue | 75 min |
| 16 | **Online Auction System** | State (auction lifecycle), Observer (bid events), Strategy (auction types: English/Dutch/sealed) | 60 min |
| 17 | **Ride-Sharing (Uber/Ola)** | Strategy (matching, pricing, routing), State (ride lifecycle), Observer (location updates) | 90 min |
| 18 | **Social Media Feed** | Strategy (ranking), Observer (new posts), Iterator (infinite scroll), Composite (nested comments) | 75 min |
| 19 | **File Storage System (Google Drive)** | Composite (folder tree), Proxy (access control), Observer (sharing), Strategy (storage tiers) | 75 min |
| 20 | **Payment Processing System** | State (payment lifecycle), Strategy (gateway selection), Command (refund), Chain (fraud checks) | 90 min |

**Interview Questions (Actually Asked) — Tier 3:**
28. Design a rate limiter that works across a distributed fleet of servers. Support per-user, per-IP, and per-endpoint limits. *(Stripe Staff, Cloudflare Senior)*
29. Design a message broker like Kafka. Support topics, partitions, consumer groups, and at-least-once delivery. *(LinkedIn Staff)*
30. Design a distributed task scheduler. Support: cron, one-time, delayed tasks. Handle: retries, dead letter queue, exactly-once execution. *(Uber Staff, Google L5)*
31. Design an auction platform. Handle: bid sniping protection, proxy bidding, reserve price, anti-fraud. *(eBay Senior)*
32. Design Uber's matching system. Consider: driver proximity, estimated pickup time, driver preferences, surge pricing. *(Uber SDE-3)*
33. Design Instagram's feed system. Consider: chronological vs ranked, story ordering, seen/unseen, content type mixing. *(Meta E5)*
34. Design Google Drive's sharing and permission system. Handle: nested folder permissions, link sharing, permission inheritance vs override. *(Google L5)*
35. Design a payment system that handles: idempotent charges, partial refunds, disputes, multi-currency, and webhook notifications. *(Stripe Staff, Razorpay SDE-3)*

---

## PHASE 3: System Design Building Blocks (Weeks 15-18)

### References for Phase 3
- **"Designing Data-Intensive Applications"** (Martin Kleppmann) — THE book for this phase; covers replication, partitioning, consistency, batch/stream processing in depth
- **"Database Internals"** (Alex Petrov) — deep dive into storage engines, B-trees, LSM trees, distributed database internals
- **"Web Scalability for Startup Engineers"** (Artur Ejsmont) — practical treatment of caching, load balancing, queues, and CDNs
- **MIT 6.824 Distributed Systems** (https://pdos.csail.mit.edu/6.824/) — free lecture videos + labs covering Raft, MapReduce, replicated KV stores
- **Redis University** (https://university.redis.io/) — free courses on building caches, rate limiters, and queues with Redis
- **"Understanding Distributed Systems"** (Roberto Vitillo) — concise, practitioner-focused intro to networking, consensus, and resilience patterns

### Learn by Building, Not Reading

| Block | Build This | What You'll Learn |
|-------|-----------|------------------|
| **Load Balancer** | Implement round-robin, weighted, least-connections, consistent hashing in code | When to use L4 vs L7, sticky sessions |
| **Cache** | Build an in-memory cache with LRU + TTL + write-through/write-back modes | Cache invalidation strategies, thundering herd |
| **Message Queue** | Build a simple queue with pub/sub, consumer groups, acknowledgment | At-least-once vs exactly-once, dead letter queues |
| **Rate Limiter** | Build token bucket + sliding window, both single-node and distributed (Redis) | Rate limiting at API gateway vs application level |
| **Consistent Hashing** | Implement with virtual nodes | Why consistent hashing for distributed caches/DBs |
| **Bloom Filter** | Build from scratch | Probabilistic data structures for membership testing |
| **DB Replication** | Set up MySQL primary-replica locally, observe replication lag | Read replicas, failover, split-brain |
| **Sharding** | Shard a users table by user_id hash, implement a routing layer | Range vs hash sharding, cross-shard queries |
| **Search Index** | Build an inverted index from scratch, then use Elasticsearch | Full-text search, tokenization, relevance scoring |
| **CDN Simulation** | Build a multi-tier cache: browser → edge → origin | Cache-Control headers, purging, edge computing |

### Key Concepts — Learn Through the Problems Above

- **CAP Theorem**: Understand through building the DB replication exercise
- **ACID vs BASE**: Compare MySQL transactions vs eventual consistency in your queue
- **Consistent Hashing**: Understand through the load balancer exercise
- **Event Sourcing**: Understand through the message queue exercise
- **CQRS**: Understand when read/write models diverge in the sharding exercise

---

## PHASE 4: High-Level System Design (Weeks 19-30)

### References for Phase 4
- **"System Design Interview — An Insider's Guide" Vol 1 & Vol 2** (Alex Xu) — step-by-step walkthroughs for URL shortener, chat, news feed, YouTube, and more; closest to real interview format
- **"Designing Data-Intensive Applications"** (Kleppmann) — revisit for deep dives on stream processing, event sourcing, and consistency models
- **GitHub: donnemartin/system-design-primer** (https://github.com/donnemartin/system-design-primer) — comprehensive diagrams, back-of-envelope calculations, and component overviews
- **Educative: "Grokking the System Design Interview"** + **"Grokking Modern System Design"** — interactive browser-based courses with diagrams and quizzes
- **ByteByteGo** (https://bytebytego.com / Alex Xu's newsletter) — visual explainers and weekly deep dives on real-world systems
- **YouTube: System Design Fight Club, Gaurav Sen, Jordan Has No Life** — video walkthroughs with whiteboard-style explanations
- **Real engineering blogs** — read these for each problem:
  - Uber Engineering Blog (matching, geospatial, pricing)
  - Netflix Tech Blog (streaming, CDN, recommendations)
  - Stripe Engineering Blog (payments, idempotency, webhooks)
  - Meta Engineering Blog (feed ranking, real-time messaging)
  - Cloudflare Blog (rate limiting, CDN, edge computing)

### HLD Interview Framework (Memorize This Flow)

```
1. REQUIREMENTS (5 min)
   Functional: "The system should..."
   Non-functional: Scale? Latency? Availability? Consistency?
   Back-of-envelope: DAU, QPS, storage, bandwidth

2. API DESIGN (5 min)
   Core endpoints, request/response shapes
   Pagination strategy, rate limiting

3. DATA MODEL (5 min)
   Entities, relationships
   SQL vs NoSQL decision with justification
   Access patterns → index design

4. HIGH-LEVEL ARCHITECTURE (10 min)
   Draw component diagram
   Write path + Read path (separately!)
   Justify every technology choice

5. DEEP DIVES (15 min)
   Interviewer picks 2-3 areas
   Scaling, failure modes, trade-offs
   "What happens when X fails?"

6. WRAP-UP (5 min)
   Monitoring/alerting strategy
   What would you do with more time?
```

### Problem Set — Solve in This Exact Order

#### Tier 1: Foundational Systems (1 per week)

| # | System | Core Challenges | Key Components |
|---|--------|----------------|----------------|
| 1 | **URL Shortener (TinyURL)** | Unique ID generation, read-heavy | Hash/counter, cache, 301 vs 302 |
| 2 | **Pastebin** | Object storage, TTL, abuse prevention | S3, CDN, metadata DB |
| 3 | **Rate Limiter (Distributed)** | Consistency across nodes, multi-strategy | Redis, sliding window, API gateway |
| 4 | **Key-Value Store** | Partitioning, replication, consistency | Consistent hashing, gossip protocol, quorum |
| 5 | **Unique ID Generator** | Ordering, uniqueness at scale | Snowflake, UUID, DB sequences, trade-offs |

**Interview Questions (Actually Asked) — Tier 1:**
36. Design TinyURL. Handle: custom aliases, analytics (click count by country/device), link expiration. What's your QPS estimate for 100M DAU? *(Amazon SDE-2, Microsoft SDE-2 — most common starter question)*
37. Design a rate limiter for an API gateway serving 10K microservices. Handle: per-user, per-IP, per-service limits. How do you handle distributed counting? *(Stripe Staff, Cloudflare Senior)*
38. Design a distributed key-value store like DynamoDB. Discuss: consistent hashing, vector clocks, read repair, anti-entropy. *(Amazon SDE-3, Google L5)*
39. Design a globally unique ID generation service for a distributed system generating 10K IDs/sec. Discuss trade-offs of different approaches. *(Twitter Staff, Meta E5)*

#### Tier 2: Data-Intensive Systems (1 per week)

| # | System | Core Challenges | Key Components |
|---|--------|----------------|----------------|
| 6 | **Twitter/X Timeline** | Fan-out on write vs read, celebrity problem | Cache, message queue, hybrid approach |
| 7 | **Instagram/Photo Sharing** | Media pipeline, CDN, feed ranking | S3, transcoding service, ML ranking |
| 8 | **Web Crawler** | Politeness, dedup, distributed scheduling | URL frontier, DNS cache, robots.txt |
| 9 | **Search Autocomplete** | Prefix matching at scale, personalization | Trie, Elasticsearch, query log analysis |
| 10 | **Notification System** | Multi-channel, prioritization, dedup | SQS/Kafka, priority queues, user preferences |
| 11 | **News Feed / Content Ranking** | ML ranking, real-time updates, content mixing | Feature store, A/B testing, engagement signals |

**Interview Questions (Actually Asked) — Tier 2:**
40. Design Twitter's home timeline. Handle: 500M users, celebrities with 50M followers, real-time updates. Fan-out on write or read? *(Meta E5, Twitter Staff — classic)*
41. Design Instagram. Handle: image upload pipeline, feed generation, stories, explore tab. How do you serve images to users in 200 countries? *(Meta E4)*
42. Design a web crawler for Google scale. Handle: 1B pages, politeness policies, duplicate detection, freshness. How do you prioritize what to crawl? *(Google L5, Amazon SDE-3)*
43. Design Google Search Autocomplete. Handle: 5B queries/day, personalized suggestions, trending queries, offensive content filtering. *(Google L4)*
44. Design a notification system for Uber. Handle: push/SMS/email, user preferences, rate limiting per user, template management, delivery tracking. *(Uber SDE-3, Amazon SDE-2)*

#### Tier 3: Real-Time & Communication Systems (1-2 weeks each)

| # | System | Core Challenges | Key Components |
|---|--------|----------------|----------------|
| 12 | **Chat System (WhatsApp)** | Message ordering, presence, E2E encryption | WebSocket, message queue, sequence numbers |
| 13 | **Video Streaming (YouTube/Netflix)** | Transcoding pipeline, adaptive bitrate, CDN | HLS/DASH, transcoding farm, recommendation |
| 14 | **Live Streaming (Twitch)** | Ultra-low latency, chat at scale, recording | RTMP ingest, WebRTC, edge distribution |
| 15 | **Collaborative Editing (Google Docs)** | Conflict resolution, real-time sync | OT/CRDT, WebSocket, operation log |
| 16 | **Video Conferencing (Zoom)** | Peer-to-peer vs SFU, quality adaptation | WebRTC, SFU server, SRTP |

**Interview Questions (Actually Asked) — Tier 3:**
45. Design WhatsApp. Handle: 1:1 chat, group chat (500 members), read receipts, online/offline status, message search. How do you guarantee message ordering? *(Meta E5, Amazon SDE-3)*
46. Design YouTube. Handle: video upload (4K, different formats), transcoding pipeline, recommendation, comments at scale. How does adaptive bitrate streaming work? *(Google L5)*
47. Design Google Docs. Two users edit the same paragraph simultaneously — how do you resolve conflicts? Discuss OT vs CRDT trade-offs. *(Google L5, Microsoft SDE-3)*
48. Design a live streaming platform. Handle: 100K concurrent viewers per stream, live chat, DVR (rewind), stream recording. Latency budget: < 5 seconds. *(Twitch Staff)*

#### Tier 4: Transaction & Infrastructure Systems (1-2 weeks each)

| # | System | Core Challenges | Key Components |
|---|--------|----------------|----------------|
| 17 | **Uber/Ride Sharing** | Geo-spatial matching, ETA, surge pricing | Geohash/S2, matching service, pricing engine |
| 18 | **Hotel/Flight Booking** | Inventory management, double-booking prevention | Distributed locks, eventual consistency |
| 19 | **E-Commerce (Amazon)** | Cart, inventory, checkout, payments | Saga pattern, inventory reservation |
| 20 | **Payment System (Stripe)** | Idempotency, reconciliation, multi-currency | Event sourcing, ledger, webhook delivery |
| 21 | **Ad Click Aggregation** | Real-time counting, dedup, fraud detection | Stream processing (Kafka + Flink), Lambda architecture |
| 22 | **Ticket Booking (Ticketmaster)** | Thundering herd, seat locking, queue management | Virtual waiting room, distributed locks |
| 23 | **Food Delivery (DoorDash)** | Real-time dispatch, multi-pickup optimization | Geo-indexing, route optimization, state machine |
| 24 | **Stock Exchange** | Order matching, sub-ms latency, audit trail | Order book, matching engine, event sourcing |

**Interview Questions (Actually Asked) — Tier 4:**
49. Design Uber. Handle: matching riders with drivers within 500m, surge pricing, ETA calculation, trip tracking. How do you handle geo-spatial queries at scale? *(Uber Staff, Google L5)*
50. Design an e-commerce checkout system. Handle: cart, inventory reservation (10-min lock), payment processing, order confirmation. What happens when payment fails after inventory is deducted? *(Amazon SDE-3)*
51. Design Stripe's payment processing system. Handle: idempotent charges, partial refunds, multi-currency, PCI compliance, webhook delivery with retry. *(Stripe Staff)*
52. Design a real-time ad click aggregation system. Handle: 10B clicks/day, deduplication, fraud detection, real-time dashboard. *(Meta E5, Google L5)*
53. Design Ticketmaster for a Taylor Swift concert. 10M people trying to buy 50K tickets. How do you prevent system collapse? *(Ticketmaster Senior, Amazon SDE-3)*
54. Design a stock exchange matching engine. Handle: limit orders, market orders, stop-loss, sub-millisecond matching. *(Jane Street, Goldman Sachs)*

#### Tier 5: Infrastructure & Platform Systems (Lead Level)

| # | System | Core Challenges | Key Components |
|---|--------|----------------|----------------|
| 25 | **Distributed Task Scheduler** | Consistency, exactly-once, priority | Consensus (Raft), sharded queues |
| 26 | **Monitoring System (Datadog)** | High-cardinality metrics, alerting | Time-series DB, anomaly detection |
| 27 | **Feature Flag System** | Low-latency evaluation, gradual rollout | SDK + server, targeting rules |
| 28 | **CI/CD Pipeline** | Parallel execution, artifact management | DAG scheduler, container orchestration |
| 29 | **Distributed File System (GFS)** | Replication, consistency, fault tolerance | Chunk servers, master, heartbeat |
| 30 | **Multi-Region Active-Active DB** | Conflict resolution, latency, compliance | CRDT, geo-routing, data sovereignty |

**Interview Questions (Actually Asked) — Tier 5:**
55. Design a distributed cron/task scheduler for 10K microservices. Handle: exactly-once execution, retries, dead letter queue, priority, monitoring. *(Google L5, Uber Staff)*
56. Design a monitoring and alerting system like Datadog. Handle: 1M metrics/sec, custom dashboards, anomaly detection, alert routing. *(Datadog Staff, Amazon SDE-3)*
57. Design a feature flag system for 500 microservices. Handle: percentage rollout, user targeting, A/B testing integration, kill switch with < 1s propagation. *(LaunchDarkly, Netflix Staff)*
58. Design a CI/CD pipeline for a monorepo with 5000 engineers. Handle: incremental builds, test parallelization, canary deployments, rollback. *(Google L5, Meta E6)*
59. You're migrating a monolith to microservices with zero downtime. Design the migration strategy. What's the sequence? How do you handle shared data? *(Everyone at Staff+ level)*
60. Design a multi-region active-active database system. How do you handle write conflicts? What's your consistency model? *(Google L6, Amazon Principal)*

---

## PHASE 5: Architecture & Lead-Level Patterns (Weeks 31-36)

### References for Phase 5
- **"Clean Architecture"** (Robert C. Martin) — dependency rule, component principles, boundary design; foundational for modular monolith thinking
- **"Building Microservices" 2nd Ed** (Sam Newman) — definitive guide on decomposition, communication patterns, sagas, and strangler fig migration
- **"Fundamentals of Software Architecture"** (Richards & Ford) — architecture styles comparison (event-driven, microservices, space-based), trade-off analysis, and the role of an architect
- **"Software Architecture: The Hard Parts"** (Richards, Ford, Dehghani, Sadalage) — practical guidance on decomposition decisions, data ownership, and distributed workflows
- **"Domain-Driven Design"** (Eric Evans) — bounded contexts, aggregates, ubiquitous language; the original DDD reference
- **"Implementing Domain-Driven Design"** (Vaughn Vernon) — more practical/hands-on companion to Evans' book
- **"Staff Engineer: Leadership Beyond the Management Track"** (Will Larson) — navigating technical leadership, writing strategy docs, building alignment
- **"An Elegant Puzzle: Systems of Engineering Management"** (Will Larson) — organizational design, team sizing, technical debt frameworks
- **"The Staff Engineer's Path"** (Tanya Reilly) — big-picture thinking, project leadership, and being a force multiplier
- **Martin Fowler's site** (https://martinfowler.com) — authoritative articles on CQRS, event sourcing, strangler fig, microservices patterns

### Architecture Patterns — Learn by Refactoring

| Pattern | Exercise | When to Use |
|---------|----------|-------------|
| **Modular Monolith** | Take a messy monolith, extract domain modules with clear boundaries | When microservices are premature |
| **Event-Driven Architecture** | Convert a synchronous order flow to async event-based | Decoupling services, eventual consistency |
| **CQRS** | Split a read-heavy service into separate read/write models | When read and write patterns diverge significantly |
| **Event Sourcing** | Build an audit-compliant transaction system | Financial systems, audit trails |
| **Saga Pattern** | Implement a distributed checkout: inventory → payment → shipping | Distributed transactions without 2PC |
| **Strangler Fig** | Incrementally replace a legacy service endpoint by endpoint | Safe migration from legacy systems |
| **Domain-Driven Design** | Identify bounded contexts in a real e-commerce system | Complex domains with multiple teams |

### Lead-Level Interview Questions (Actually Asked)

**Architecture & Trade-offs:**
61. Your monolith is hitting scaling limits. Walk me through how you'd decompose it into microservices. What's your sequencing? *(Amazon Principal, Google L6)*
62. You have a synchronous checkout flow that's causing cascading failures. Redesign it using event-driven architecture. What are the consistency trade-offs? *(Uber Staff)*
63. Your team owns a service that's both write-heavy (transaction processing) and read-heavy (reporting dashboard). How do you scale both without compromise? *(Stripe Staff)*
64. Design the data migration strategy for moving from a single MySQL database to a sharded architecture with zero downtime. *(Amazon SDE-3, Google L5)*
65. You're building a new platform from scratch for a team of 20 engineers. Monolith or microservices? Justify your answer. *(Meta E6)*

**Technical Leadership:**
66. How do you make build-vs-buy decisions? Walk me through a real example. *(Staff+ at every FAANG)*
67. You inherited a codebase with 30% test coverage, no CI/CD, and manual deployments. What's your 6-month plan? *(Amazon SDE-3, Microsoft Senior)*
68. Two senior engineers on your team disagree on the technical approach. How do you resolve it? *(Google L5 behavioral)*
69. How do you prioritize technical debt against feature work? Give a framework. *(Every Staff+ interview)*
70. Your service has a 99.9% SLA but you're only hitting 99.5%. Walk me through your investigation and remediation plan. *(Stripe Staff, Netflix Senior)*

**Real Scenario-Based:**
71. Black Friday is in 4 weeks. Your e-commerce platform currently handles 10K req/sec. You need 100K req/sec. What do you do? *(Amazon Principal)*
72. A critical microservice is consuming 10x more memory than expected after a deploy. Walk me through your debugging process. *(Google L5)*
73. Your distributed system is experiencing split-brain. How do you detect and resolve it? *(Amazon SDE-3)*
74. A database migration script failed halfway through on production. 50% of rows are migrated, 50% aren't. What do you do? *(Every company at Senior+)*
75. Your team's deployment frequency has dropped from 10/day to 2/week. Diagnose and fix the engineering culture problem. *(Meta E6, Engineering Manager)*

---

## PHASE 6: Mock Interview Practice (Weeks 37-40)

### References for Phase 6
- **Pramp** (https://www.pramp.com) — free peer-to-peer mock interviews with structured feedback
- **Interviewing.io** (https://interviewing.io) — anonymous mock interviews with engineers from FAANG; recordings available
- **Exponent** (https://www.tryexponent.com) — system design mock interview videos with ex-FAANG interviewers, structured courses
- **"System Design Interview — An Insider's Guide" Vol 1 & 2** (Alex Xu) — revisit as a checklist; solve each problem under timed conditions
- **"Cracking the Coding Interview"** (Gayle Laakmann McDowell) — Chapter on system design + behavioral interview frameworks
- **Real post-mortems for case studies:**
  - Google SRE Book (https://sre.google/sre-book/table-of-contents/) — free; chapters on incident response, postmortems, and reliability
  - Increment magazine (https://increment.com) by Stripe — deep articles on infrastructure, on-call, and deployments
  - Dan Luu's blog (https://danluu.com) — post-mortems, latency analysis, and systems thinking

### Weekly Schedule

| Day | Activity | Duration |
|-----|----------|----------|
| Mon | LLD problem (solve + self-review) | 90 min |
| Tue | HLD problem (solve with timer) | 60 min |
| Wed | Mock interview with peer (LLD) | 60 min |
| Thu | HLD deep-dive (review + improve previous) | 60 min |
| Fri | Mock interview with peer (HLD) | 60 min |
| Sat | Architecture case study (read a real post-mortem, redesign) | 90 min |
| Sun | Review + consolidate notes | 45 min |

### Top 25 Most-Asked Questions (Across All FAANG, 2024-2025)

**If you solve nothing else, solve these:**

| # | Question | Frequency |
|---|----------|-----------|
| 1 | Design a URL Shortener | Asked everywhere as warm-up |
| 2 | Design a Rate Limiter | Stripe, Cloudflare, Amazon, Google |
| 3 | Design Twitter Timeline/Feed | Meta, Twitter, LinkedIn |
| 4 | Design a Chat System | Meta, Amazon, Google |
| 5 | Design an E-Commerce System | Amazon (obviously), Walmart, Flipkart |
| 6 | Design a Notification System | Uber, Amazon, Google, Apple |
| 7 | Design a Parking Lot (LLD) | Amazon, Microsoft, Goldman |
| 8 | Design Splitwise (LLD) | Google, Amazon, Uber |
| 9 | Design a Payment System | Stripe, Razorpay, Amazon |
| 10 | Design YouTube/Netflix | Google, Netflix, Amazon |
| 11 | Design Uber/Ride Sharing | Uber, Google, Amazon |
| 12 | Design a Key-Value Store | Amazon, Google, Apple |
| 13 | Design a Task Scheduler | Google, Uber, LinkedIn |
| 14 | Design Google Docs | Google, Microsoft, Notion |
| 15 | Design a Web Crawler | Google, Amazon, Apple |
| 16 | Design Search Autocomplete | Google, Amazon, Microsoft |
| 17 | Design an Elevator System (LLD) | Google, Amazon, Microsoft |
| 18 | Design a Ticket Booking System | Flipkart, Amazon, Ticketmaster |
| 19 | Design a Monitoring/Alerting System | Datadog, Google, Amazon |
| 20 | Design an Ad Click Aggregator | Meta, Google, Amazon |
| 21 | Design a Food Delivery System | Uber, DoorDash, Swiggy |
| 22 | Design a Hotel Booking System | Booking.com, Airbnb, Amazon |
| 23 | Design an Auction System (LLD) | eBay, Amazon |
| 24 | Design a Chess/Board Game (LLD) | Microsoft, Amazon, Google |
| 25 | Design a Distributed File System | Google, Amazon, Microsoft |

---

## Complete Weekly Timeline (40 Weeks)

| Weeks | Phase | Focus | Deliverable |
|-------|-------|-------|-------------|
| 1-2 | 1 | Creational Patterns | 5 working implementations |
| 3-4 | 1 | Structural Patterns | 6 working implementations |
| 5-6 | 1 | Behavioral Patterns | 9 working implementations |
| 7-8 | 2 | LLD Tier 1 (warm-up) | 5 complete class designs |
| 9-11 | 2 | LLD Tier 2 (core) | 7 complete class designs |
| 12-14 | 2 | LLD Tier 3 (advanced) | 8 complete class designs |
| 15-18 | 3 | System Design building blocks | 10 working prototypes |
| 19-22 | 4 | HLD Tier 1-2 | 11 complete system designs |
| 23-26 | 4 | HLD Tier 3-4 | 13 complete system designs |
| 27-30 | 4 | HLD Tier 5 + revisit weak areas | 6 complete system designs |
| 31-36 | 5 | Architecture patterns + lead skills | 7 refactoring exercises |
| 37-40 | 6 | Mock interviews + consolidation | 20+ mock sessions |

---

## Resources (Prioritized)

### Books — Core Reading List

| Priority | Book | Author(s) | Use For |
|----------|------|-----------|---------|
| 1 | "Designing Data-Intensive Applications" | Martin Kleppmann | System design building blocks, distributed systems fundamentals (Phase 3-4) |
| 2 | "System Design Interview" Vol 1 & 2 | Alex Xu | HLD problem walkthroughs in interview format (Phase 4) |
| 3 | "Design Patterns: Elements of Reusable Object-Oriented Software" | Gamma, Helm, Johnson, Vlissides | The original GoF patterns catalog (Phase 1) |
| 4 | "Head First Design Patterns" | Freeman & Robson | Approachable design patterns with visual examples (Phase 1) |
| 5 | "Clean Architecture" | Robert C. Martin | Dependency rules, component design, boundary architecture (Phase 5) |
| 6 | "Building Microservices" 2nd Ed | Sam Newman | Service decomposition, sagas, migration strategies (Phase 5) |
| 7 | "Fundamentals of Software Architecture" | Richards & Ford | Architecture styles, trade-off analysis, architect's role (Phase 5) |
| 8 | "Software Architecture: The Hard Parts" | Richards, Ford, Dehghani, Sadalage | Decomposition decisions, distributed workflows (Phase 5) |
| 9 | "Domain-Driven Design" | Eric Evans | Bounded contexts, aggregates, ubiquitous language (Phase 5) |
| 10 | "Database Internals" | Alex Petrov | Storage engines, B-trees, LSM trees, distributed DB internals (Phase 3) |
| 11 | "Understanding Distributed Systems" | Roberto Vitillo | Concise intro to networking, consensus, resilience (Phase 3) |
| 12 | "Clean Code" | Robert C. Martin | Writing maintainable classes and methods (Phase 2) |
| 13 | "Staff Engineer" | Will Larson | Technical leadership, strategy docs, alignment (Phase 5) |
| 14 | "The Staff Engineer's Path" | Tanya Reilly | Big-picture thinking, project leadership (Phase 5) |
| 15 | "Web Scalability for Startup Engineers" | Artur Ejsmont | Practical caching, load balancing, queues, CDNs (Phase 3) |

### Online Resources & Courses

| Priority | Resource | URL | Use For |
|----------|----------|-----|---------|
| 1 | Refactoring.Guru | https://refactoring.guru/design-patterns | Design patterns with code in 10+ languages (Phase 1) |
| 2 | GitHub: donnemartin/system-design-primer | https://github.com/donnemartin/system-design-primer | Quick reference, diagrams, back-of-envelope math (Phase 3-4) |
| 3 | GitHub: ashishps1/awesome-low-level-design | https://github.com/ashishps1/awesome-low-level-design | LLD problems with full solutions (Phase 2) |
| 4 | ByteByteGo (Alex Xu) | https://bytebytego.com | Visual system design explainers, weekly newsletter (Phase 4) |
| 5 | MIT 6.824 Distributed Systems | https://pdos.csail.mit.edu/6.824/ | Free lectures + labs on Raft, MapReduce, KV stores (Phase 3) |
| 6 | Educative: Grokking the System Design Interview | https://www.educative.io | Interactive browser-based HLD course (Phase 4) |
| 7 | Educative: Grokking the Low-Level Design Interview | https://www.educative.io | Interactive LLD walkthroughs (Phase 2) |
| 8 | Redis University | https://university.redis.io | Free courses on caches, rate limiters, queues (Phase 3) |
| 9 | Google SRE Book | https://sre.google/sre-book/table-of-contents/ | Free; incident response, postmortems, reliability (Phase 6) |
| 10 | Martin Fowler's site | https://martinfowler.com | CQRS, event sourcing, microservices patterns (Phase 5) |

### YouTube Channels

| Channel | Best For |
|---------|----------|
| System Design Fight Club | Realistic mock system design interviews |
| Gaurav Sen | Visual HLD explanations with trade-off analysis |
| Jordan Has No Life | Deep dives on distributed systems papers and concepts |
| Concept && Coding (Shreyansh Jain) | LLD walkthroughs for each classic problem |
| Christopher Okhravi | GoF design patterns explained with examples |
| ByteByteGo | Animated system design concepts |

### Engineering Blogs (Read for Real-World Context)

| Company | URL | Best Topics |
|---------|-----|-------------|
| Uber Engineering | https://eng.uber.com | Matching, geospatial, pricing, microservices |
| Netflix Tech Blog | https://netflixtechblog.com | Streaming, CDN, recommendations, resilience |
| Stripe Engineering | https://stripe.com/blog/engineering | Payments, idempotency, webhooks, API design |
| Meta Engineering | https://engineering.fb.com | Feed ranking, real-time messaging, graph DBs |
| Cloudflare Blog | https://blog.cloudflare.com | Rate limiting, CDN, edge computing, DNS |
| LinkedIn Engineering | https://engineering.linkedin.com | Kafka, feed systems, search infrastructure |
| Airbnb Engineering | https://medium.com/airbnb-engineering | Search ranking, payments, service-oriented architecture |
| Dan Luu's Blog | https://danluu.com | Post-mortems, latency analysis, systems thinking |

### Mock Interview Platforms

| Priority | Platform | URL | Notes |
|----------|----------|-----|-------|
| 1 | Pramp | https://www.pramp.com | Free peer-to-peer mock interviews |
| 2 | Interviewing.io | https://interviewing.io | Anonymous mocks with FAANG engineers |
| 3 | Exponent | https://www.tryexponent.com | System design mock videos + structured courses |
