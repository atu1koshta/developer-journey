# Contribution Selection Criteria

Rules for deciding whether a task/ticket qualifies as a contribution entry.

---

## Identity & Privacy

- **No personal names.** Never mention colleagues, team members, or any individual by name. Use role-based references instead (e.g., "new team member" not "Rahul").
- **No external product names used only as references.** If an external product (e.g., a POS system) was studied for reference but the actual work was platform-agnostic, describe the work without naming the reference source.

## What to Include

- Contributions that demonstrate **architectural ownership** — designing systems, schemas, pipelines from scratch.
- Contributions that show **technical depth and domain expertise** — double-entry bookkeeping, event-driven architecture, multi-brand hierarchy.
- Contributions with **measurable or meaningful impact** — performance gains (e.g., 80% load time reduction, 50% API response improvement), security hardening, system decoupling.
- Work that shows **sole/full ownership** of a module, integration, or platform (e.g., "built complete Zapier integration as sole developer").
- Contributions that reflect **leadership and initiative** — designing roadmaps, standardizing processes, driving CI/CD and test coverage from 0 to 60%+.
- Work that **differentiates from other developers** — things that showcase unique problem-solving, cross-system thinking, or end-to-end delivery.
- Contributions involving **decision-making and trade-offs** — choosing between architectural approaches and being able to articulate why (e.g., migrating to double-entry bookkeeping over a simple ledger). Senior developers evaluate options, not just execute them.
- Work with **cross-system or cross-service impact** — contributions that span multiple services, domains, or teams carry more weight than isolated changes within a single module.
- **Business-outcome framing** — tie technical work to business value. "Designed wallet system enabling restaurants to manage digital credits for catering orders" over "Built wallet credit/debit APIs." The technology is the tool, the business outcome is the achievement.

## What to Exclude

- **Routine CRUD operations** — building a single API endpoint, implementing a retrieval/lookup API, adding a delete capability. These are expected duties.
- **Basic validations** — uniqueness checks, form field validations, input sanitization. Standard practice, not a contribution.
- **Config and setup tasks** — webhook configuration, cron job setup, IAM access definition, infrastructure deployment. Operational hygiene, not a differentiator.
- **Single-field or single-property changes** — adding a toggle, tracking an extra ID in schema, adding a date display. Too granular.
- **Items redundant with a broader entry** — if "Built complete receipt pipeline from scratch" exists, do not also list "Built receipt upload API endpoint" or "Designed receipt table migration" separately.
- **Documentation as standalone items** — API docs, flowcharts, README updates. Expected of any senior developer.
- **Vague or generic statements** — "Enhanced application features to meet business needs" says nothing specific. Either make it concrete or drop it.
- **Testing with dummy/mock data** — "Tested integration with dummy restaurant data" is process, not product.
- **Routine DevOps** — VPS management, staging reverts, selective deployments. Expected operational work.
- **Minor UI/UX tweaks** — adding a link in an email, showing an expiry date, small display changes.
- **Items that feel trivial to mention** — if listing it feels like padding rather than showcasing value, it does not belong. Apply the "would I proudly bring this up in an interview?" test.
- **Splitting one initiative into multiple entries** — if scraping decoupling happened in two iterations, it is one evolving architectural decision, not two separate line items. Consolidate related work into a single entry that shows the full arc.

## Accuracy

- **Category must be accurate.** If something is operational upkeep, tag it `maintenance`, not `feature` or `devops`. Miscategorizing inflates the wrong metrics.
- **Descriptions must reflect actual work done.** Do not overstate scope. Do not attribute work to a specific vendor/product if the contribution was designing a generalized solution inspired by multiple sources.

## Language & Framing

- **Use leadership verbs.** Prefer "Architected," "Designed," "Led," "Drove," "Owned," "Spearheaded." Avoid "Implemented," "Added," "Built," "Created" for standalone use — these read like executing tickets, not driving outcomes. Exception: "Built" is acceptable when paired with scope that shows ownership (e.g., "Built complete Zapier integration as sole developer").
- **Quantify wherever possible.** "Optimized dashboard load time by 80%" is strong. "Improved performance" is weak. Attach numbers, percentages, or concrete before/after states when available.
- **Frame mentorship around system impact, not the act.** "Established onboarding playbook and led code walkthroughs that reduced ramp-up time for new developers" over "Helped new team member learn the codebase." The value is the repeatable process, not the favor.
- Write from the perspective of a **senior developer adding strategic value**, not someone listing tasks completed.
- Every entry should answer: **"What capability or impact does this demonstrate?"**
