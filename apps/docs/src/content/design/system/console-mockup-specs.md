# Desktop Admin Console High-Fidelity Mockup Specifications

> Focus: Part 3 (Console Mockup Specs) | Surface: Internal Admin Console (Desktop-Dense Web) | Theme: Operator Slate

This specification documents the grid structures, alignment parameters, active countdown warnings, and control overlays required to generate the high-fidelity operator mockups.

---

## 1. Mockup C: Active SLA Inbox Dashboard View

This mockup focuses on the high-density workspace where front-desk agents triage incoming guest messages.

* **Grid & Structure Layout**: 
  * Full-viewport screen (`h-screen w-screen`) with header navigation fixed at `56px` height.
  * Main container divided into a split-pane layout: (1) Thread Queue Sidebar (`320px` width) on the left, and (2) Active Messaging Workspace (fluid width) on the right.
* **SLA Priority Queue Cards**:
  * **Critical Card State (<5m)**: Styled with a bold crimson border (`#ef4444`) and flashing red background, pushing the card to the absolute top of the sidebar queue list.
  * **Standard Card State (>15m)**: Styled with a subtle gray border (`#f1f5f9`), slate text headers (`#0f172a`), and low contrast timestamps.
* **Active Chat Header**: Fixed height of `64px` with a robust gray border (`border-b border-slate-200`) and the guest's active room number featured in high-contrast editorial bold.

---

## 2. Mockup D: AI Suggested Response & Input Panel

This mockup focuses on the interactive reply card and keyboard-shortcut configurations at the bottom of the active workspace.

* **AI Generated Response Card**:
  * Styled as an inset panel utilizing a soft sky-blue accent background (`#f0f9ff`) and standard rounded corners (`rounded-lg`).
  * Features a prominent inline CTA button: "Approve & Send" in brand blue (`#0284c7`), with white text.
  * **Keyboard Overlays**: Integrates elegant micro-badge overlays displaying the keyboard shortcuts (e.g. `Option + A` for approve, `Option + E` for edit) to guide the operator's mouse-free experience.
* **Typing Textarea Input**:
  * An expansive input form spanning the lower panel with a subtle border and direct help labels displaying helper instructions underneath.
* **Optimistic Bubble Feedback**:
  * Outgoing message bubbles are immediately appended to the scroll feed with a `50%` opacity filter and a light gray "Sending..." suffix label to signify instant visual feedback before API response completes.
