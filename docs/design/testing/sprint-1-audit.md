# Usability & Accessibility Testing Plan (Sprint 1 Audit)

> Status: Active | Focus: REV-47 (Testing & Usability Plan) | Surface: External Guest Portal & Admin Console System

---

## 1. Usability Testing Protocols

To validate that our frictionless onboarding target is met and that operator cognitive load is minimized, we will execute moderated usability testing against the HTML/React prototypes.

### Scenario A: Guest Onboarding (Zero-Install Verification)
* **Goal**: Validate that a traveler on a mobile device can complete lookup, reservation confirmation, and communication consent in under 60 seconds on a simulated poor network (3G throttling).
* **Participant Profile**: Frequent hotel guests (5+ stays/year) who utilize OTAs (Expedia, Booking.com, etc.).
* **Task Script**:
  > "You have just landed at the airport, you're carrying two bags, and you receive an email from the hotel with a link. Open the link, find your room status, and make sure the front desk can text you when your room is ready."
* **Success Metrics**:
  * **Task Completion Rate (TCR)**: Target >95%.
  * **Time on Task (ToT)**: Target <45 seconds.
  * **System Usability Scale (SUS) Score**: Target >85/100.
  * **Error Frequency**: Target <1 incorrect click/keypress per flow.

### Scenario B: Operator SLA Messaging Response
* **Goal**: Validate that front-desk operators can receive an urgent guest message, generate and approve an AI reply draft, and resolve the thread using keyboard hotkeys.
* **Participant Profile**: Front-desk agents and hotel duty managers.
* **Task Script**:
  > "You are managing a busy front-desk check-in line. An urgent guest text arrives. Without using your mouse, view the message, approve the AI's drafted response, and send it to the guest."
* **Success Metrics**:
  * **Task Completion Rate (TCR)**: Target 100%.
  * **Time on Task (ToT)**: Target <10 seconds.
  * **Keyboard-Only Path Compliance**: 100%.

---

## 2. Accessibility Verification Matrix (WCAG 2.2 AA)

Because GuestBridge is an enterprise and customer hospitality platform, accessibility is a core quality gate. The following checks are verified before production handoffs:

| ID | Accessibility Checklist Item | WCAG 2.2 Standard | Verification Method |
|---|---|---|---|
| **A11Y-1** | **Color Contrast (Body Copy)** | Success Criterion 1.4.3 (Contrast Minimum) | Verify all text in `concierge-warm` theme maintains a minimum of `7:1` against the `#fdfbf7` background. |
| **A11Y-2** | **Color Contrast (Interactive UI)** | Success Criterion 1.4.11 (Non-text Contrast) | Check that form input borders and inactive button states maintain at least `4.5:1` contrast ratio. |
| **A11Y-3** | **Touch Target Size** | Success Criterion 2.5.5 (Target Size - Enhanced) | Confirm all inputs, checkboxes, and buttons are a minimum of `48px` x `48px` physical size. |
| **A11Y-4** | **Focus Visibility** | Success Criterion 2.4.7 (Focus Visible) | All active input fields must show a `2px` focus ring offset using our semantic gold color `#aa7c11`. |
| **A11Y-5** | **Keyboard Navigation** | Success Criterion 2.1.1 (Keyboard) | The entire lookup flow must be fully navigate-ready using `Tab` and `Shift + Tab` without traps. |
| **A11Y-6** | **Screen Reader Semantics** | Success Criterion 1.3.1 (Info and Relationships) | Form controls must use native HTML tags with matching labels or `aria-labelledby` linkages. |

---

## 3. Experimentation (A/B Testing) Strategy

We will validate the progressive disclosure onboarding model through an in-production A/B test split once the first live beta properties launch.

* **Primary Objective**: Maximize the direct identity capture rate (phone number and email) and SMS opt-in consent from OTA guests.
* **Experiment Configuration**:
  * **Control (Static Verification)**: The SMS consent checkbox and phone inputs are displayed as mandatory fields directly on the initial `VerificationCard` load.
  * **Treatment (Progressive Verification)**: The initial card asks only for booking reference and last name. Upon successful validation, the card flips/animates to reveal the contact capture form and SMS consent checkbox.
* **Telemetry & Tracking Parameters**:
  * `gbridge_onboarding_started`: Fired on page land.
  * `gbridge_step1_success`: Fired on successful lookup.
  * `gbridge_consent_toggled`: Fired on checkbox click.
  * `gbridge_onboarding_completed`: Fired on final portal entry.
* **Primary Metric**: `Onboarding Success Rate` (Total Completed / Total Landed).
* **Secondary Metric**: `Contact Capture Rate` (Total Valid Phone Numbers Captured / Total Landed).

---

## 4. Heuristic Evaluation Criteria

Our design team conducts a heuristic audit of every component specification utilizing Jakob Nielsen's 10 Usability Heuristics:

1. **Visibility of System Status**: Verified via loading spinners on button press and clear verification results.
2. **Match Between System and Real World**: Verified via plain-language hospitality copy (no technical database errors shown to guests).
3. **User Control and Freedom**: Verified via clear "Back" buttons and options to skip or update contact details later.
4. **Consistency and Standards**: Verified by strict compliance with our central `tokens.json` values.
5. **Error Prevention**: Verified by disabling form submission until valid inputs are detected.
6. **Recognition Rather Than Recall**: Verified by pre-filling booking references from email URL parameters.
7. **Flexibility and Efficiency of Use**: Verified via operator keyboard shortcuts and automatic formatting input masks.
8. **Aesthetic and Minimalist Design**: Verified by removing international text-expansion tolerances and LTR constraints, keeping layouts clean and centered.
9. **Help Users Recognize, Diagnose, and Recover from Errors**: Verified by displaying plain-language helper texts underneath highlighted invalid inputs.
10. **Help and Documentation**: Verified by integrating real-time front desk chat shortcuts on failure locks.
