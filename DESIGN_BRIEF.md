# DESIGN_BRIEF.md — GuestBridge

> Last updated: June 10, 2026 | Design Sprint 2 | Status: Complete

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
| Design System | `docs/design/system/` | Design token JSONs, component blueprints, states, messaging specs |
| Design Operations | `docs/design/ops/` | Dual-track operating model, critique and governance workflows |
| Sprints & Trackers | `docs/design/sprints/sprint-N/` | Sprint plans, active progress logs, handoff logs |

---

## 5. Design Sprint Status

| Sprint | Name | Status | Covered Scope |
|---|---|---|---|
| 1 | Token & Verification Foundation | ✅ Done | Core US tokens (REV-44), Zero-Install Onboarding (REV-43), VerificationCard component (REV-45) |
| 2 | Operator Workflows & Governance | ✅ Done | SLA Inbox Thread (REV-46), DesignOps governance (REV-48), Keyboard testing (REV-47) |

---

## 6. Cross-Chat Handoff Protocol
Before completing a design cycle:
1. Write a `done.md` inside the active sprint directory outlining changes, outputs, and deferred items.
2. Update the `DESIGN_BRIEF.md` statuses (Section 5 & 7).
3. Commit all assets under `design-sprint-N: <summary>`.

---

## 7. Current Design State
* **What is finalized:**
  * Global design token system (colors, serif typography scales, responsive sizing, LTR architecture)
  * Guest Portal Zero-Install verification journey map, inputs validations, and component specifications (`VerificationCard`)
  * Admin Console SLA inbox layout, hotkeys mapping, visual alert triggers, and optimistic UI transitions
  * Usability scenarios, WCAG 2.2 AA testing parameters, screen-reader alert assertions, and live A/B experiment telemetry
  * Dual-track agile governance, Design Review gates, SemVer rules, and release checklists
* **What is undergoing critique/testing:** None.
* **What's next:** Design system handoff package release for production engineering buildout.
