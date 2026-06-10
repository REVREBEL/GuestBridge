# DESIGN_BRIEF.md — GuestBridge

> Last updated: June 10, 2026 | Design Sprint 1 | Status: Complete

---

## 1. Product & Design Vision
GuestBridge is a premium, quietly editorial hotel guest engagement platform designed to establish a direct relationship between boutique hotel operators and their guests. It bridges the gap created by masked OTA emails by providing a zero-install, mobile-first Guest Portal for curated arrival/concierge experiences, and a high-density, desktop Admin Console for rapid SLA operator messaging.

---

## 2. Design Principles
* **Tactile Editorial Simplicity** (Guest Portal) - Sophisticated, warm, low cognitive load. Feels like picking up a physical, elegant hotel room key.
* **Operator Slate Efficiency** (Admin Console) - High-density, high-speed, keyboard-friendly. Built for high-volume front desk shifts.
* **US-Only Standard Focus** - Stripped of internationalization. Designed exclusively for US telephone masking, ZIP formats, and LTR CSS architectures.

---

## 3. Tooling & Target Platforms
* **Design Workspace:** Handled via code-based blueprints, interactive React sandbox prototypes, and markdown component specs.
* **Target Platforms:** Mobile iOS/Android Web (Guest Portal), Desktop Web (Admin Console).
* **Design Tokens Format:** Centralized JSON design tokens compiled to Tailwind configuration and CSS variables.

---

## 4. Key Artifacts Map

| Asset Layer | Path / Location | Contents |
|---|---|---|
| Strategy & Research | `docs/design/research/` | User personas, entry-point specifications, verification journey maps |
| Design System | `docs/design/system/` | Design token JSONs, component blueprints, states |
| Sprints & Trackers | `docs/design/sprints/sprint-1/` | Sprint plans, active progress logs, audit check-offs |

---

## 5. Design Sprint Status

| Sprint | Name | Status | Covered Scope |
|---|---|---|---|
| 1 | Token & Verification Foundation | ✅ Done | Core US tokens, Zero-Install Onboarding, VerificationCard component |
| 2 | Operator Workflows | ⬜ Not Started | SLA Inbox Thread (REV-46), DesignOps contribution governance (REV-48) |

---

## 6. Cross-Chat Handoff Protocol
Before completing a design cycle:
1. Write a `done.md` inside the active sprint directory outlining changes, outputs, and deferred items.
2. Update the `DESIGN_BRIEF.md` statuses (Section 5 & 7).
3. Commit all assets under `design-sprint-1: <summary>`.

---

## 7. Current Design State
* **What is finalized:**
  * Global design token system (global spacing, serif editorial typography scale, operator status palettes)
  * Two-step progressive verification journey map
  * Mobile interaction and FSM specifications for the `VerificationCard` React component
  * Usability scenarios, WCAG 2.2 AA checklists, and SMS opt-in A/B test parameters
* **What is undergoing critique/testing:** None.
* **What's next:**
  * Component layout and AI quick-reply flow for the `AdminConsole/SLAInboxThread` (REV-46)
  * Dual-track Agile contribution and release gates (REV-48)
