# Hotel Guest Engagement Platform — Design Brief & Shared Memory

This document serves as the shared memory for the design and engineering teams. It establishes the unified design context, product requirements, sprint planning, and task status for the **Hotel Guest Engagement Platform**.

---

## 1. Product Overview & Strategic Goals

The **Hotel Guest Engagement Platform** connects OTA guest communication, review management, pre-arrival guest capture, curated experience delivery, and owned guest profile creation into a single, cohesive operational application.

### Key Objectives
1. **Unify guest messaging** from Expedia, Booking.com, and future channels.
2. **Automate routine guest replies** while escalating exceptions.
3. **Manage and respond to public reviews** with AI-assisted workflows.
4. **Send pre-arrival invitations** to a hotel-branded guest portal.
5. **Verify reservations** using confirmation data and capture direct contact details.
6. **Match guest interests** to curated hotel experiences, local recommendations, and partner offers.
7. **Build reusable guest profiles** for future marketing and CRM enrichment.
8. **Track operational and commercial performance** through an Analytics Dashboard.

---

## 2. Platform Surfaces & User Journeys

### 2.1 Internal Admin Console
*Used by hotel teams, management companies, and REVREBEL operators to manage operational and commercial activities.*

* **Dashboard:** At-a-glance status of inbox, reviews, conversions, and metrics.
* **Guest Messaging Center:** Unified inbox across Expedia, Booking.com, and website chat.
* **Review Response Engine:** Review ingestion, sentiment analysis, topic tagging, and AI-assisted responses.
* **Guest Profiles / CRM:** Owned guest identity records, consents, stay history, and preference tags.
* **Curator Journey Management:** Drag-and-drop question builder and rule manager.
* **Experience Library:** Content CMS for hotel add-ons, recommendations, and pricing options.
* **Personalized Guide Management:** Automated rule matching and manual staff curation.
* **Automation Rules:** Direct auto-send rules, draft-only rules, safety blocks, and escalation queues.
* **Integrations:** API connections for OTAs, PMS systems, email/SMS gateways, and CRM platforms.

### 2.2 External Guest Portal
*Mobile-responsive, property-branded post-booking destination for guests.*

* **Portal Landing Page:** Property welcome screen.
* **Reservation Verification:** Self-service verification (last name + confirmation number).
* **Contact Capture:** Form fields for first/last name, email, zip/postal, and optional phone.
* **Consent Capture:** Separate granular opt-ins for operational communications and marketing.
* **Curator Journey:** Intake questionnaire collecting trip types, stay vibes, and interests.
* **Recommendation Results:** Display matching experiences, hotel add-ons, and local guides.
* **Personalized Guide Page:** Standalone mobile-friendly guide URL.
* **Guide Delivery Confirmation:** Option to receive the guide link via email or SMS.
* **Add-on Request Flow:** Upsell checkouts for breakfast, late checkout, wellness, etc.

---

## 3. Recommended Logical Services

To ensure clean service boundaries, the application will follow a modular monolith architecture separated into the following domains:

* `messaging-service`
* `review-service`
* `guest-portal-service`
* `reservation-verification-service`
* `curator-service`
* `experience-service`
* `guide-generation-service`
* `guest-profile-service`
* `automation-service`
* `integration-service`
* `analytics-service`
* `audit-service`
* `notification-service`

---

## 4. Design Sprint Tracker

### 📅 Current Phase: Phase 1 — Multi-Agent Design Brainstorm

We are currently running a collaborative multi-agent design sprint to define the visual language, information architecture, component specifications, and user flows.

| Task ID | Task Summary | Assigned Agent | Status | Notes |
|---|---|---|---|---|
| **TASK-001** | Define Guest & Hotelier Personas and Journey Mapping | `design_research` | ⏳ Pending | Awaiting persona mapping |
| **TASK-002** | Establish Admin & Portal Site Maps and IA | `ux_strategy` | ⏳ Pending | Site architecture drafting |
| **TASK-003** | Create Visual Identity, Grid, & Color Scales | `ui_design` | ⏳ Pending | Light/Dark theme variables |
| **TASK-004** | Draft Component Specs & Design Tokens | `design_systems` | ⏳ Pending | Tables, inputs, and tokens |
| **TASK-005** | Define Inbox & Curator Journey Micro-Interactions | `interaction_design` | ⏳ Pending | Transition and state machines |
| **TASK-006** | Design PortalEntry Verification Heuristics & Test Scenarios | `prototyping_testing` | ⏳ Pending | Form error & usability tests |
| **TASK-007** | Draft Consent COPY & Default Curator Questions | `designer_toolkit` | ⏳ Pending | Granular consent guidelines |
| **TASK-008** | Outline Admin Handoff Specs & Review Processes | `design_ops` | ⏳ Pending | Quality gate preparation |
| **TASK-009** | Establish Dashboard Data Hierarchy & Typography Audit | `visual_critique` | ⏳ Pending | Analytics density check |
