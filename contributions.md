# Atul Koshta — Developer Contributions

> Source of truth: `contributions.yaml`
> This file is a human-readable view derived from the YAML source.

---

## Technical Skills

| Category | Technologies |
|---|---|
| Cloud & DevOps | AWS S3, SQS, Lambda, ECS, Textract, IAM, Linux, Git, Terraform, CI/CD |
| Backend | Node.js, Express, Python, Flask, Ruby on Rails, Sequelize ORM |
| Frontend | React, Next.js, Vite, TypeScript |
| Auth & Security | Keycloak (IAM), OAuth2, JWT, OTP-based Auth, NGINX/Lua Proxy, API Key Encryption |
| Databases | MySQL, Elasticsearch |
| Caching & Queuing | Redis, Celery, AWS SQS, Event-Driven Architecture |
| Testing | Jest, Supertest, Mocha, Chai, Sinon, RSpec, Factory-Pattern Test Data |
| API Design | REST, OpenAPI (Swagger), Client ID/Secret Auth |
| Integrations | Stripe, GoHighLevel CRM, Zapier, Zoho, SendGrid, Google APIs, crawl4ai |
| AI & Processing | AWS Textract (OCR), AI-Powered Receipt Processing, crawl4ai Web Scraping |
| Architecture | Microservices, Double-Entry Bookkeeping, Multi-Brand Hierarchy, System Decoupling, Queue-Based Processing |

---

## HAR LLC — Software Engineer (Contract) | Sept 2024 – Present

**Project:** Catering Rewards Platform

---

### Sep – Nov 2024 | Authentication & User Management

- `[architecture]` Designed and owned the entire authentication module for the platform — **Tech:** Node.js, Express, Keycloak, NGINX, Lua — **Impact:** Single ownership of auth across all portals
- `[feature]` Built phone number and email-based login with OTP verification for user-facing and restaurant operator portals — **Tech:** Node.js, Express, Keycloak, JWT — **Impact:** Enabled multi-channel authentication for all user types
- `[feature]` Implemented complete user sign-up flow with first name, last name, work email, personal email, password, phone number, and email/phone verification — **Tech:** Node.js, Express, Sequelize, MySQL — **Impact:** Full self-service user registration
- `[architecture]` Architected NGINX proxy service layer integrating with Keycloak for secure API authentication — **Tech:** NGINX, Lua, Keycloak, OAuth2 — **Impact:** Centralized auth gateway for all API traffic
- `[feature]` Built proxy layer for customer-facing APIs — **Tech:** NGINX, Lua, Node.js — **Impact:** Secure API access for external clients
- `[feature]` Implemented core login API, customer creation endpoint with validation, and customer details retrieval endpoint — **Tech:** Node.js, Express, Sequelize, MySQL — **Impact:** Foundation customer management APIs
- `[bugfix]` Fixed auth issues — expired OTP acceptance, whitespace handling, resend code timing, verify button failures, navigation bugs — **Tech:** Node.js, Express — **Impact:** Stable and reliable authentication flow

---

### Nov – Dec 2024 | Customer APIs & Data Integrity

- `[feature]` Built customer GUID retrieval API — lookup by phone number or email — **Tech:** Node.js, Express, Sequelize, MySQL — **Impact:** Enabled flexible customer lookup for downstream services
- `[feature]` Implemented phone and email uniqueness validation during signup — **Tech:** Node.js, Sequelize, MySQL — **Impact:** Prevented duplicate account creation
- `[bugfix]` Fixed error handling — 409 for duplicate emails, proper codes for invalid phone numbers, empty last names, phone with spaces, incorrect error messages — **Tech:** Node.js, Express — **Impact:** Standardized API error responses across all customer endpoints
- `[improvement]` Standardized API response formats and validation across all customer endpoints — **Tech:** Node.js, Express — **Impact:** Consistent API contract for all consumers

---

### Jan 2025 | GoHighLevel CRM Integration — Phase 1

- `[research]` Researched GoHighLevel APIs for customer and location/subaccount management — **Tech:** GoHighLevel API — **Impact:** Defined integration approach and scope
- `[architecture]` Designed DB schema changes for restaurant_store and customer tables to store API keys metadata and sync response data — **Tech:** MySQL, Sequelize — **Impact:** Data foundation for CRM integration
- `[feature]` Built backend API calls for GoHighLevel and integrated with customer flow — **Tech:** Node.js, Express, GoHighLevel API — **Impact:** Real-time customer data sync to CRM
- `[integration]` Configured GoHighLevel webhooks and account setup — **Tech:** GoHighLevel, Webhooks — **Impact:** Automated event-driven CRM updates
- `[devops]` Set up AWS cron jobs for periodic data synchronization — **Tech:** AWS Lambda, Cron — **Impact:** Automated recurring data sync
- `[testing]` Tested end-to-end integration with dummy restaurant and location data — **Tech:** GoHighLevel API, Node.js — **Impact:** Validated integration before production rollout

---

### Jan – Feb 2025 | Scraping Architecture & POS Integrations

- `[architecture]` Designed the scraping enhancement roadmap — **Tech:** Node.js — **Impact:** Clear technical direction for scraping improvements
- `[architecture]` Decoupled database dependency from scraping pipeline for scalability (first iteration) — **Tech:** Node.js, Sequelize, AWS SQS — **Impact:** Scraping no longer blocked by DB bottlenecks
- `[feature]` Built MonkeyMedia POS scraping processor — **Tech:** Node.js, Web Scraping — **Impact:** Automated order ingestion from MonkeyMedia POS
- `[feature]` Built marketplace order ingestion processor — **Tech:** Node.js, AWS SQS — **Impact:** Automated marketplace order collection
- `[feature]` Implemented order ingestion request queue consumer for async processing — **Tech:** Node.js, AWS SQS, Lambda — **Impact:** Non-blocking order processing pipeline
- `[bugfix]` Fixed marketplace scraping failures and data issues — **Tech:** Node.js — **Impact:** Reliable marketplace data collection

---

### Feb – Mar 2025 | GHL Event Tracking & Scraping Improvements

- `[feature]` Implemented event tracking system pushing customer activities, order events, and reward events to GoHighLevel in real-time — **Tech:** Node.js, GoHighLevel API, Event-Driven Architecture — **Impact:** Real-time CRM visibility into all platform events
- `[feature]` Built triggers for customer/contact, order, and reward events with unit tests — **Tech:** Node.js, Jest — **Impact:** Comprehensive event coverage for CRM
- `[feature]` Implemented marketplace report processor and Olo POS processor — **Tech:** Node.js, Web Scraping — **Impact:** Two additional data source integrations
- `[feature]` Built webhook triggers for scraping events — **Tech:** Node.js, Webhooks — **Impact:** Event-driven scraping notifications
- `[bugfix]` Fixed scraping stuck states, simultaneous conflicts, automation detection, and missing customer data — **Tech:** Node.js, Web Scraping — **Impact:** Stable and resilient scraping pipeline
- `[feature]` Engineered bulk import of old customers (including EzCater) into GoHighLevel — **Tech:** Node.js, GoHighLevel API, MySQL — **Impact:** Migrated historical customer base to CRM
- `[feature]` Implemented restaurant location deletion capability — **Tech:** Node.js, Express, Sequelize — **Impact:** Admin can manage restaurant lifecycle

---

### Mar – Apr 2025 | GHL Maturation & Security

- `[feature]` Created API endpoint to retrieve GHL-synced data — **Tech:** Node.js, Express — **Impact:** Admin visibility into GHL sync status
- `[feature]` Built admin UI enhancements for GHL configuration management — **Tech:** React, Node.js — **Impact:** Self-service GHL configuration for admins
- `[security]` Implemented encrypted storage for GHL API keys with masked key display in responses — **Tech:** Node.js, Encryption — **Impact:** Secured sensitive CRM credentials at rest and in transit
- `[architecture]` Completed second iteration of scraping database decoupling for enhanced scalability — **Tech:** Node.js, Sequelize, AWS SQS — **Impact:** Further reduced DB coupling in scraping pipeline
- `[bugfix]` Fixed duplicate GHL records for initial push and marketplace user sync issues — **Tech:** Node.js, GoHighLevel API — **Impact:** Clean CRM data without duplicates
- `[feature]` Integrated communication support from scraping flow — **Tech:** Node.js, AWS SQS — **Impact:** Scraping pipeline can trigger notifications

---

### Apr – May 2025 | Receipt Upload & OCR System

- `[architecture]` Built complete receipt upload and AI-powered processing pipeline from scratch — **Tech:** Node.js, Express, AWS Textract, AWS S3, MySQL — **Impact:** Fully automated receipt-to-rewards pipeline
- `[feature]` Designed and executed receipt table database migration — **Tech:** Sequelize, MySQL — **Impact:** Data layer for receipt storage and processing
- `[feature]` Built receipt upload API endpoint — **Tech:** Node.js, Express, AWS S3 — **Impact:** Customers can submit receipts for reward points
- `[feature]` Implemented OCR text extraction using AWS Textract with AI for automated receipt data parsing — **Tech:** AWS Textract, AI, Node.js — **Impact:** Automated extraction of order details from receipt images
- `[feature]` Built receipt approval workflow for restaurant operators — **Tech:** Node.js, Express, Sequelize — **Impact:** Operator review and approval of submitted receipts
- `[devops]` Configured and deployed receipt system infrastructure — **Tech:** AWS S3, AWS Lambda, Terraform — **Impact:** Production-ready receipt processing infra
- `[documentation]` Created API documentation and flowcharts — **Tech:** OpenAPI, Mermaid — **Impact:** Clear reference for team and stakeholders
- `[feature]` Built receipt submission approval notifications with conditional login requirement — **Tech:** Node.js, SendGrid — **Impact:** Automated notification to operators when receipts need review
- `[feature]` Extended receipt upload to restaurant operator (Rob) and customer (Sally) portals — **Tech:** Node.js, Express — **Impact:** Receipt upload available across all user roles
- `[bugfix]` Fixed subtotal parsing, duplicate uploads, reupload-after-rejection, expired links, email formatting — **Tech:** Node.js, AWS Textract — **Impact:** Reliable receipt processing end-to-end

---

### May 2025 | GHL Tag Tracking & Points Sync

- `[feature]` Implemented tag tracking across Loyal, Non-Loyal, and Marketplace customer segments — **Tech:** Node.js, GoHighLevel API — **Impact:** Segment-aware tagging in CRM for targeted campaigns
- `[feature]` Extended event tracking to non-signed-up and marketplace customer segments — **Tech:** Node.js, GoHighLevel API, Event-Driven Architecture — **Impact:** Full customer lifecycle visibility in CRM
- `[mentorship]` Conducted knowledge transfer on NSU and marketplace user points data sync — **Impact:** Team upskilled on points sync logic
- `[bugfix]` Fixed brand-specific POS login URLs, missing marketplace orders, simultaneous scraping conflicts — **Tech:** Node.js, Web Scraping — **Impact:** Stable multi-brand scraping
- `[bugfix]` Fixed Lambda production error during model initialization blocking order processing — **Tech:** AWS Lambda, Sequelize — **Impact:** Unblocked production order processing

---

### May – Jun 2025 | Zapier Integration

- `[architecture]` Built complete Zapier workflow automation integration as sole developer — **Tech:** Node.js, Zapier Platform, Webhooks — **Impact:** Platform connected to 5000+ apps via Zapier
- `[research]` Explored Zapier developer platform and designed integration architecture — **Tech:** Zapier Platform — **Impact:** Defined trigger/action model for platform events
- `[feature]` Developed 9 distinct trigger modules — 3 loyal customer, 1 marketplace orders, 1 non-signed-up users, 4 rewards — **Tech:** Node.js, Zapier Platform, Webhooks — **Impact:** Comprehensive event coverage for external automation
- `[testing]` Created and validated production Zaps — **Tech:** Zapier — **Impact:** Verified end-to-end automation workflows
- `[improvement]` Reviewed and standardized trigger types across all Zapier events — **Tech:** Node.js — **Impact:** Consistent trigger contract for Zapier consumers

---

### Jun 2025 | Secure APIs, Auth Fixes & Restaurant Settings

- `[security]` Replaced legacy GUID-based customer identification with new secure customer IDs in API requests — **Tech:** Node.js, Express — **Impact:** Eliminated insecure customer ID exposure
- `[bugfix]` Removed expired access token validation from refresh token flow — **Tech:** Node.js, JWT, Keycloak — **Impact:** Fixed critical auth flow preventing token refresh
- `[bugfix]` Fixed Nginx proxy server build issues and Omnicart API 401 errors — **Tech:** NGINX, Lua — **Impact:** Restored proxy server builds and API access
- `[feature]` Built multi-restaurant settings — apply page details, payment method summary, shared payment method across restaurants — **Tech:** Node.js, Express, Sequelize, MySQL — **Impact:** Admins can manage settings at scale across restaurant groups
- `[devops]` Defined IAM access structure for the team — **Tech:** AWS IAM — **Impact:** Proper access controls for all team members

---

### Jun – Jul 2025 | Receipt Improvements & Payment Features

- `[improvement]` Added attachment links in action-required emails for receipt uploads — **Tech:** Node.js, SendGrid — **Impact:** Operators can access receipts directly from email
- `[bugfix]` Fixed receipt subtotal zero, duplicate uploads, reupload errors, expired links, edited receipt submission failures — **Tech:** Node.js, AWS Textract — **Impact:** Stable receipt processing pipeline
- `[feature]` Implemented card expiry date display in payment settings — **Tech:** Node.js, Stripe — **Impact:** Users can see card expiry before it lapses
- `[devops]` Enabled selective deployment from staging to pre-prod — **Tech:** CI/CD, Git — **Impact:** Smoother release process with reduced risk
- `[bugfix]` Fixed card deletion and duplicate card addition issues — **Tech:** Node.js, Stripe — **Impact:** Clean payment method management
- `[integration]` Integrated Zoho Help Desk with the platform — **Tech:** Node.js, Zoho API — **Impact:** Unified customer support workflow

---

### Jul – Aug 2025 | Payment Fixes & Financial Accuracy

- `[bugfix]` Fixed payment processing failures when cards added from All Store settings — **Tech:** Node.js, Stripe — **Impact:** Payments work regardless of card assignment scope
- `[feature]` Updated DB schema to track Stripe Customer ID in payment methods and business entities — **Tech:** MySQL, Sequelize, Stripe — **Impact:** Reliable Stripe customer tracking
- `[bugfix]` Resolved recurring expired card errors triggered by hourly cron jobs and webhooks — **Tech:** Node.js, Stripe, Cron — **Impact:** Eliminated noisy recurring payment errors in production
- `[bugfix]` Fixed card re-addition after deletion and empty restaurant details for new restaurants — **Tech:** Node.js, Stripe, Sequelize — **Impact:** Smooth payment onboarding for new restaurants

---

### Aug – Sep 2025 | Double-Entry Bookkeeping & Ledger Migration

- `[architecture]` Led research and implementation of migrating platform ledger to double-entry bookkeeping system — **Tech:** Node.js, Sequelize, MySQL — **Impact:** Accounting-grade financial record keeping
- `[research]` Designed migration strategy from single-entry to double-entry bookkeeping — **Tech:** MySQL, Sequelize — **Impact:** Clear migration path with minimal data loss risk
- `[feature]` Implemented data migration scripts for transitioning existing ledger entries — **Tech:** Node.js, Sequelize, MySQL — **Impact:** Historical data preserved in new format
- `[feature]` Inserted additional transaction entries into journal tables for double-entry compliance — **Tech:** Node.js, Sequelize, MySQL — **Impact:** Every transaction has matching debit/credit entries
- `[feature]` Built core double-entry bookkeeping logic with comprehensive unit tests — **Tech:** Node.js, Jest, Sequelize — **Impact:** Tested and reliable financial logic
- `[feature]` Added gohighlevelSyncEnabled property for per-restaurant GHL sync toggle — **Tech:** Node.js, Sequelize — **Impact:** Granular control over CRM sync per restaurant
- `[bugfix]` Fixed broken unit test cases across the codebase — **Tech:** Jest, Node.js — **Impact:** Green CI pipeline

---

### Sep – Oct 2025 | Ledger Finalization & Wallet Planning

- `[devops]` Managed staging environment reverts for safe ledger iteration across multiple sprint cycles — **Tech:** Git, Node.js — **Impact:** Safe iterative development without production risk
- `[feature]` Introduced Amazon gift card account into ledger and updated expired cashback points handling — **Tech:** Node.js, Sequelize, MySQL — **Impact:** Gift card transactions tracked in financial system
- `[research]` Conducted research and planning for Wallet feature — **Tech:** Node.js, MySQL — **Impact:** Defined wallet architecture and data model
- `[bugfix]` Resolved recurring Stripe subscription payment errors and card re-addition issues — **Tech:** Node.js, Stripe — **Impact:** Stable subscription billing

---

### Oct – Nov 2025 | Wallet System & Reporting Overhaul

- `[architecture]` Designed wallet schema and data modeling — **Tech:** MySQL, Sequelize — **Impact:** Scalable wallet data layer
- `[feature]` Implemented core wallet functionality — credit, debit, and balance management — **Tech:** Node.js, Express, Sequelize, MySQL — **Impact:** Restaurants can manage credits digitally
- `[feature]` Integrated wallet with existing ledger for payment processing — **Tech:** Node.js, Sequelize, MySQL — **Impact:** Wallet transactions reflected in financial ledger
- `[feature]` Built brand-level wallet and configuration settings — **Tech:** Node.js, Express, Sequelize — **Impact:** Wallet configurable at brand level
- `[bugfix]` Fixed missing, duplicate, and extra records across Restaurant Payments, Restaurant Rewards, GC Redemption, Cashback Transaction, and Software Billing reports — **Tech:** Node.js, Sequelize, MySQL — **Impact:** Accurate financial reporting across all admin dashboards
- `[improvement]` Added old Stripe Transaction IDs to new reports for traceability — **Tech:** Node.js, Stripe — **Impact:** Audit trail between old and new report formats
- `[bugfix]` Fixed record mismatches between old and new report formats in production — **Tech:** Node.js, MySQL — **Impact:** Data consistency between legacy and new systems

---

### Nov – Dec 2025 | Wallet Maturation & Production Hardening

- `[feature]` Built shared wallet restrictions for individual wallet operations — **Tech:** Node.js, Express, Sequelize — **Impact:** Proper fund isolation between shared and individual wallets
- `[feature]` Implemented auto-recharge toggle functionality — **Tech:** Node.js, Stripe, Sequelize — **Impact:** Automatic wallet top-up when balance is low
- `[feature]` Implemented low-balance wallet backup notification strategy — **Tech:** Node.js, SendGrid — **Impact:** Proactive alerts before wallet runs dry
- `[feature]` Extended points expiry dates in production for year-end accounting compliance — **Tech:** Node.js, Sequelize, MySQL — **Impact:** Revenue correctly recognized in fiscal year
- `[bugfix]` Fixed 12+ wallet bugs — processing fees, report downloads, approval failures, filter errors, transaction history leaks, add funds errors, zero-amount bugs, auto-recharge issues, date display gaps — **Tech:** Node.js, Stripe, Sequelize — **Impact:** Production-stable wallet system
- `[devops]` Managed production wallet release preserving existing card payment methods — **Tech:** Node.js, Stripe, MySQL — **Impact:** Zero-downtime wallet feature rollout
- `[bugfix]` Fixed financial reports to show receivable transactions instead of payment-method transactions — **Tech:** Node.js, Sequelize — **Impact:** Accurate receivable accounting
- `[mentorship]` Led backend code walkthroughs for new team member Rahul — **Impact:** Accelerated onboarding of new developer

---

### Dec 2025 | Marketplace Data Platform — New Initiative

- `[architecture]` Architected new Marketplace scraping and data ingestion platform from scratch — **Tech:** Python, crawl4ai, AWS S3 — **Impact:** Foundation for scalable marketplace data collection
- `[architecture]` Created architecture and flow plan for marketplace data ingestion — **Tech:** Mermaid, Draw.io — **Impact:** Clear technical blueprint for team
- `[research]` Conducted spike on crawl4ai for intelligent web scraping with demo implementation — **Tech:** Python, crawl4ai — **Impact:** Validated crawl4ai as scraping solution
- `[architecture]` Defined standard JSON schema for Toast restaurant and menu data ingestion — **Tech:** JSON Schema — **Impact:** Standardized data contract for all scraped data
- `[feature]` Created persistent restaurant registry with metadata and state management — **Tech:** Python, MySQL — **Impact:** Track scraping state per restaurant
- `[architecture]` Designed modular project structure for marketplace services (Scraper + AI modules) — **Tech:** Python — **Impact:** Clean separation of concerns for maintainability
- `[feature]` Implemented restaurant list scraping with upsert logic (platform-aware) — **Tech:** Python, crawl4ai — **Impact:** Automated restaurant discovery across platforms
- `[feature]` Configured Crawl4AI for full end-to-end restaurant scraping including modifiers — **Tech:** Python, crawl4ai — **Impact:** Complete menu data capture with customizations
- `[architecture]` Defined S3 folder naming conventions for scraped data — **Tech:** AWS S3 — **Impact:** Organized and retrievable data storage
- `[feature]` Implemented data normalization and S3 storage for scraped ezCater data — **Tech:** Python, AWS S3 — **Impact:** Clean normalized data ready for downstream processing

---

### Jan 2026 | Reward Refactoring, Brand Architecture & Parallel Scraping

- `[feature]` Configured Crawl4AI to run scraping in parallel for improved performance — **Tech:** Python, crawl4ai, Async — **Impact:** Significant reduction in total scrape time
- `[architecture]` Designing image processing pipeline for localizing menu images — **Tech:** Python, AWS S3 — **Impact:** Local image hosting for faster menu rendering
- `[architecture]` Refactoring reward calculation logic into single testable domain module — process transaction, cashback calculation, order calculation, cashback recalculation — **Tech:** Node.js, Jest — **Impact:** Maintainable and testable reward logic
- `[feature]` Implemented Lambda-to-backend API calls for reward calculation of new orders — **Tech:** AWS Lambda, Node.js, Express — **Impact:** Decoupled reward calculation from Lambda runtime
- `[architecture]` Designing Brand-Group-Store architecture — leading Brand Hierarchy epic, schema migration for Points Tracking Config and Franchise Groups, Brand Mapper facade pattern — **Tech:** Node.js, Sequelize, MySQL — **Impact:** Foundation for multi-brand restaurant management

---

---

## TRGT Digital — Software Development Engineer | Jun 2023 – Jan 2024

- `[feature]` Developed user activity tracker using MySQL and Flask to monitor engagement in a digital marketing tool — **Tech:** Python, Flask, MySQL — **Impact:** Improved campaign performance measurement
- `[devops]` Managed VPS operations and implemented encryption techniques for application security — **Tech:** Linux, VPS, Encryption — **Impact:** Hardened production environment and protected sensitive data
- `[performance]` Optimized dashboard load time by 80% through Redis caching — **Tech:** Redis, Python, Flask — **Impact:** 80% reduction in dashboard load time
- `[bugfix]` Debugged and stabilized Python application issues for reliable production operation — **Tech:** Python, Flask — **Impact:** Stable production application
- `[feature]` Implemented Celery scheduler to optimize Facebook Graph API usage — **Tech:** Celery, Python, Facebook Graph API — **Impact:** Improved task execution efficiency and rate limit compliance

---

## Bluesapling Technologies — Software Development Engineer | May 2022 – May 2023

- `[performance]` Engineered algorithm to update user progress across multiple groups — **Tech:** Node.js, MongoDB — **Impact:** ~50% reduction in API response time
- `[feature]` Enhanced application features to meet evolving business and end-user needs — **Tech:** Node.js, React — **Impact:** Delivered new features aligned with product roadmap

---

## Wipro — Solution Quality Assurance Engineer | Jul 2021 – May 2022

- `[testing]` Collaborated with cross-functional teams on quality assurance for enterprise software products — **Tech:** QA, Manual Testing — **Impact:** Ensured product quality and feature validation
