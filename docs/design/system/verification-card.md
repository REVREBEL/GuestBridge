# VerificationCard Component Specification

> Focus: REV-45 (VerificationCard Component Spec) | Surface: External Guest Portal (Mobile-First Web) | Platform: React + TypeScript + Tailwind CSS

---

## 1. Overview & Anatomy

The `VerificationCard` is the first high-trust UI component a guest interacts with in the zero-install Guest Portal. This specification details the visual structure, layout parameters, state transitions, and component API, optimized for LTR and US-only inputs.

```
+-----------------------------------------------------------+
| [Hotel Logo / Brand Context Accent]                      |
|                                                           |
|  Welcome to GuestBridge                                   |
|  Please look up your reservation to access your portal.   |
|                                                           |
|  +-----------------------------------------------------+  |
|  | Booking Reference                                   |  |
|  | [ ABCD1234 ]                                        |  |
|  +-----------------------------------------------------+  |
|                                                           |
|  +-----------------------------------------------------+  |
|  | Last Name                                           |  |
|  | [ Stringham ]                                       |  |
|  +-----------------------------------------------------+  |
|                                                           |
|  [ ] Keep me updated with real-time text alerts (SMS)   |  |
|                                                           |
|  [ Look Up My Stay ]                                      |  |
+-----------------------------------------------------------+
```

---

## 2. Component Layout & Spacing (US-Only LTR)

All spacing values are derived from our 8px global spacing scale.

| Element | CSS / Tailwind Properties | Spacing Rules |
|---|---|---|
| **Outer Card Wrapper** | `bg-white p-6 rounded-2xl shadow-sm border border-neutral-100` | Padding: 24px (`p-6`). Borders: Solid 1px `#f7f4eb`. |
| **Header Accent** | `text-center mb-6` | Bottom margin: 24px (`mb-6`). |
| **Form Inputs** | `w-full h-12 px-4 rounded-lg border border-neutral-200 focus:ring-2 focus:ring-accent` | Height: 48px (`h-12`). Border radius: 8px (`rounded-lg`). |
| **Input Spacing** | `space-y-4` | Gap between inputs: 16px (`space-y-4`). |
| **CTA Button** | `w-full h-12 bg-accent text-white font-medium rounded-lg active:scale-95 transition-transform` | Height: 48px (`h-12`). Touch target: Minimum 48px. |

---

## 3. Finite State Machine (FSM) State Model

The component operates as a strict finite-state machine to ensure predictable, bug-free rendering:

| State | Triggers | Visual Characteristics | Allowed User Actions |
|---|---|---|---|
| **`IDLE_UNVERIFIED`** | Component mount. | Input fields empty; CTA button active but secondary styling. | Enter text, click checkboxes. |
| **`EDITING`** | User focuses on or modifies any input. | Standard active input borders, validation messages hidden. | Modify text, toggle states. |
| **`INVALID_FORM`** | Validation fails on blur or CTA submit. | Input fields show `#ef4444` borders and inline text warnings. | Edit text to resolve errors. |
| **`SUBMITTING_SERVER`** | Form is valid and CTA is pressed. | Fields disabled; CTA button shows gold spinner, cursor locked. | None (user input blocked). |
| **`VERIFIED_FLOW`** | Server returns 200 OK match. | Card fades out or triggers slide-out overlay; success checkmark. | Proceed into concierge gateway. |
| **`COOLDOWN_LOCK`** | PMS fails >5 times. | Fields disabled; alert banner shows locked icon and countdown timer. | Wait for countdown, click "Call Front Desk". |

---

## 4. Component API & TypeScript Interface

```typescript
import React from 'react';

export interface VerificationCardProps {
  /**
   * The source platform where the guest link was clicked (e.g., 'booking-email', 'sms').
   * Used for telemetry and custom greetings.
   */
  sourcePlatform?: 'email' | 'sms' | 'direct';

  /**
   * Pre-filled booking reference from the URL tokens.
   */
  defaultBookingReference?: string;

  /**
   * Callback triggered when reservation is successfully validated.
   * Passes captured contact and consent parameters.
   */
  onVerificationSuccess: (data: VerificationPayload) => void;

  /**
   * Callback triggered if brute-force threshold is breached, locking the user.
   */
  onBruteForceLockout?: (cooldownRemainingSeconds: number) => void;
}

export interface VerificationPayload {
  bookingReference: string;
  lastName: string;
  contactCapture: {
    phoneNumber?: string; // Standardized 10-digit US phone format
    zipCode?: string;     // US ZIP format (e.g., "90210" or "90210-1234")
    smsConsentGiven: boolean;
  };
}
```

---

## 5. Input Masking & Verification Logic (US-Only)

Since we are focused purely on the US market, inputs utilize rigid, high-performance regex validations:

* **Booking Reference Input**:
  * Capitalizes all letters automatically: `value.toUpperCase()`.
  * Regex validation: `/^[A-Z0-9]{8}$/` (Exactly 8 alphanumeric characters).
* **US Phone Input**:
  * Character mask: On keypress, dynamically format to `+1 (XXX) XXX-XXXX`.
  * Regex validation: `/^\+1 \(\d{3}\) \d{3}-\d{4}$/`.
* **US ZIP Input**:
  * Limit characters to numeric digits and dash: `/[^\d-]/g`.
  * Validation: `/^\d{5}(-\d{4})?$/` (Standard US ZIP or ZIP+4 formats).

---

## 6. Micro-Interactions & Motion States

* **Form Validation Error Shake**: If form submission is attempted while in `INVALID_FORM` state, the entire card performs a horizontal CSS translation shake (`translateX(-4px)` to `translateX(4px)`) over 300ms using a standard ease-in-out curve.
* **Button Hover & Active Scaling**:
  * Hover: background color shifts from `#aa7c11` (dark gold) to `#c59218` (lighter hover gold) over 150ms transition.
  * Active (press): scales down to `97%` scale size to simulate a physical push-button state.
* **Transitions**: State shifts from Look-up (Step 1) to Onboarding Captures (Step 2) utilize a CSS slide-up transition (`translateY(0)` to `translateY(-20px)`) with opacity fade (`opacity: 0` to `opacity: 1`) over 200ms.
