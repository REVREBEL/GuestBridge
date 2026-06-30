# GuestBridge Project Hand-off Context & Roadmap

This file is created to preserve precise engineering, structural, and progress context across chat restarts. When resuming, read this file to immediately catch up on the current state and execute the next logical phases of the project.

---

## 📌 **Project Metadata**
*   **Project Name:** GuestBridge (Linear Team/Project Prefix: **`REV`**)
*   **Active Development Branch:** **`dev`**
*   **Engineering Stack:** React 19, Next.js, Vercel Stack, Tailwind CSS v4, Shadcn UI, Tabler Icons (`@tabler/icons-react`), and CSF3 Storybook.
*   **Architectural Blueprint:** Modeled closely after the **`REVREBEL/Metrics-Core`** repository structure (shared `@packages/ui` with colocated Storybook stories).

---

## 🚀 **Current State & Completed Progress (June 30, 2026)**

We transitioned from the finalized Design Sprints 1 & 2 (which established the layout blueprints, ASCII wireframes, accessibility requirements, and US-only validations) into active engineering. The following foundations have been fully developed and pushed to the `dev` branch:

### **1. Token Pipeline & Styling (Phase 1)**
*   **Shared UI Workspace:** Created `packages/ui/package.json` with base dependencies.
*   **Tailwind CSS v4 Setup:** Created `packages/ui/src/styles/global.css` using the direct `@theme` bindings.
*   **Themes Configured:**
    *   **Concierge Warm Theme Scope (`.theme-concierge`):** Tailored for guests, featuring `#fdfbf7` background, brand gold `#aa7c11`, and Playfair Display serif typography.
    *   **Operator Slate Theme Scope (`.theme-operator`):** Tailored for hotel operators, featuring `#f8fafc` canvas, highlight blue `#0284c7`, SLA alerts `#ef4444`, and Inter sans-serif typography.

### **2. `VerificationCard` Component (Phase 2)**
*   **Location:** `packages/ui/src/components/guest-verification/verification-card.tsx`
*   **Specs Implemented:**
    *   Frictionless guest lookup flow.
    *   Strict US-only input validation and formatting masks for 10-digit phone numbers `(XXX) XXX-XXXX` and 5/9-digit ZIP codes (`XXXXX` or `XXXXX-XXXX`).
    *   Screen-reader & keyboard accessible focus styles with explicit ARIA error declarations (`aria-invalid`, `aria-describedby`).

### **3. `SLAInboxThread` Component (Phase 3)**
*   **Location:** `packages/ui/src/components/operator-inbox/sla-inbox-thread.tsx`
*   **Specs Implemented:**
    *   Side-by-side dense conversation triage lists.
    *   Active countdown SLA urgency badges (including a blinking animate-pulse state when time remaining is `<5m`).
    *   AI Smart Draft Concierge suggested response panel with a one-click optimistic UI message injection.
    *   A11y-compliant key shortcuts (`Ctrl/Cmd + Enter` to send) with visual shortcut key badging.
    *   Screen reader compatibility with secret `aria-live="polite"` updates.

### **4. Storybook CSF3 Integration (Phase 4)**
*   **Location:** Colocated stories beside components:
    *   `packages/ui/src/components/guest-verification/verification-card.stories.tsx`
    *   `packages/ui/src/components/operator-inbox/sla-inbox-thread.stories.tsx`
*   **Specs Implemented:** Standardized around CSF3 `Meta` and `StoryObj` typing (no autodocs, explicit controls, padded and centered layouts) matching the `Metrics-Core` pattern.
*   **Exports Barrel:** `packages/ui/src/index.ts` fully configured to export all primitives/components.

---

## 🛠️ **Handoff Action Items & Recommended Next Steps**

When the chat session restarts, the agent should immediately proceed with these tasks:

### **Step 1: Attempt to log progress on Linear**
*   **Context:** The Linear API previously returned `TimeoutException` blocks, preventing the logging of completed specs.
*   **Action:** Try querying the Linear API again. Update the status of these related cards to **Completed** or log the commit references in comments:
    *   `REV-43` (Zero-Install Guest Onboarding UX)
    *   `REV-44` (US-only Multi-Surface Design Tokens)
    *   `REV-45` (VerificationCard Component Layout)
    *   `REV-46` (SLA Inbox Thread Layout)
    *   `REV-47` (Usability & Accessibility Plan)
    *   `REV-48` (DesignOps Operating Model & Review Gates)

### **Step 2: Bootstrap the App Portals**
Create the web portals inside the `apps/` directory and link the shared package:
*   **`apps/guest-portal`**: Bootstrap a React/Next.js workspace. Import the `@packages/ui` global styles and compile the main landing page using the `<VerificationCard />` component.
*   **`apps/admin-console`**: Bootstrap the React/Next.js operator workspace. Import the `<SLAInboxThread />` console as the primary message-triaging view.
*   **Workspace Linking:** Ensure `package.json` in the root and in the apps link the workspaces via pnpm and transpile the `@packages/ui` package (using `transpilePackages: ["@packages/ui"]` in `next.config.js`).

### **Step 3: Complete Storybook Application Setup**
*   Initialize `apps/storybook` using Vite and configure its story matching glob rules to load `*.stories.tsx` files from the monorepo's shared `packages/ui` workspace.

---

*Handoff created on Tuesday, June 30, 2026.*
