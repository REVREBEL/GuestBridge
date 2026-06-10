# Design Brainstorm Session — GuestBridge Onboarding & Token Foundations

> Date: June 10, 2026 | Session 01 | Status: Completed

---

## 1. Ideation: Tactical Directions (Phase 1)

### Strategy Agent (`ux-strategy`)
* **Direction S1: The Immediate Capture Model**
  * Focus on immediate value capture. On land, the guest is presented with a high-trust verification form alongside an immediate SMS opt-in incentive (e.g., "Receive Wi-Fi & check-in alerts via text").
  * Streamlines the verification to just two fields: US phone number and ZIP code, matching booking records directly.
* **Direction S2: The Concierge-First Gateway**
  * Present a curated preview of the hotel's amenities (like the local guide or parking instructions) first, but blur the content until they complete a simple verification step.
  * Ensures high-value presentation before asking for personal data.

### Research Agent (`design-research`)
* **Direction R1: Progressive Capture Flow**
  * Minimize upfront cognitive load. Let the guest verify with booking reference and last name first. Once validated, slide out a progressive card asking for contact details (email/phone) and messaging consent.
  * Avoids drop-offs from "consent-scare" upon initial load.
* **Direction R2: Zero-Input "One-Click" Arrival**
  * Leverage tokenized URL parameters from the booking email. When a guest clicks the link, they are already pre-verified. The portal simply asks them to confirm their name and check a single box to opt-in.
  * Reduces onboarding time to under 15 seconds.

### Systems Agent (`design-systems`)
* **Direction SYS1: Multi-Surface Token Core**
  * Establish a centralized Style Dictionary configuration. Build a single, automated build pipeline that exports tokens as Tailwind configurations and CSS variables.
  * Restrict tokens to US-only standards: no RTL logic, no text-expansion offsets, standard LTR spacing steps.
* **Direction SYS2: Independent Surface Schemes**
  * Build separate color palettes and typography profiles directly in the separate project folders (`apps/guest-portal` and `apps/admin-console`) to avoid inter-project dependencies.
  * Fast-tracks individual development but risk style fragmentation over time.

### UI Agent (`ui-design`)
* **Direction UI1: "Concierge Warm" Editorial Canvas**
  * A warm, premium aesthetic for the Guest Portal featuring editorial serif headers (e.g., Playfair Display), soft warm cream backgrounds, and elegant tactile inputs that feel like a high-end physical hotel card.
* **Direction UI2: "Operator Slate" Interface**
  * A highly functional, high-density, low-latency interface for the Admin Console utilizing a robust 8px spacing grid, a modern sans-serif scale (e.g., Inter), and high-contrast color statuses.

---

## 2. Debate & Compromise (Phase 2)

* **Debate 1: Consent Capture vs. Drop-off Risk (Research vs. Strategy)**
  * *Strategy* pushed for a mandatory SMS opt-in checkbox directly on the main verification card to guarantee high contact capture rates.
  * *Research* argued this would alienate tired travelers who just want their room status and Wi-Fi, causing portal abandonment.
  * **Compromise**: We will use a progressive disclosure model. The initial `VerificationCard` handles basic booking match (booking ref + last name). Upon success, an elegant bottom-sheet/slide-out highlights the value of text notifications (SLA, room ready alerts) and requests phone/ZIP details with a distinct, optional opt-in.

* **Debate 2: Centralized Token Repo vs. Independent Styling (Systems vs. UI)**
  * *UI* wanted complete flexibility to style the Guest Portal with editorial, soft themes without being constrained by the Admin Console's dense component specifications.
  * *Systems* flagged that independent styling would lead to duplicate code and maintenance debt when changing core brand colors.
  * **Compromise**: We will build a unified global token system (Tier 1 & Tier 2) that supports two distinct semantic themes: *Concierge Warm* (Guest Portal) and *Operator Slate* (Admin Console). Both themes will use the same token naming conventions and build system, but will map semantic color aliases differently.

---

## 3. Finalized Design Directions (Phase 3)

We have finalized two complementary paths that will be executed in parallel during Sprint 1:

1. **Direction A: The Progressive US-Only Guest Verification Portal**
   * A mobile-first, LTR-only web landing page.
   * Utilizes a two-step progressive verification: (1) booking reference and last name validation, followed immediately by (2) an elegant US-standard phone and ZIP collection sheet with SMS consent.
2. **Direction B: Multi-Surface Semantic Token Architecture**
   * A centralized, single-source design token schema using Style Dictionary.
   * Includes *Concierge Warm* and *Operator Slate* themes. Stripped of all non-US layouts and text scaling factors to optimize for speed.
