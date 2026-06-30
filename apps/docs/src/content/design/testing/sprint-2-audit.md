# Operator Keyboard-Only Usability Audit (Sprint 2 Testing Spec)

> Focus: REV-47 & REV-46 Integration | Surface: Admin Console SLA Messaging Center | Platform: Desktop Web

---

## 1. Keyboard-Only Navigation & Focus Flow Model

For hotel operators managing front desk queues, mouse interactions represent latency. The `SLAInboxThread` is engineered for a 100% keyboard-driven workflow. This audit specification maps the sequential focus routing and tab-stops.

### Sequential Focus Order (Tab-Routing Layout)

```
[ Sidebar Queue: Thread 1 ] ──► [ Sidebar Queue: Thread 2 ] ──► [ Collapsed History Trigger ]
                                                                             │
                                                                             ▼
[ Send Button ] ◄── [ Custom Text Area Input ] ◄── [ AI Suggested Panel ] ◄──┘
```

1. **Tab Stop 1: Active Thread Sidebar Card**
   * *Aria-Role*: `tab` (nested inside role `tablist` representing the inbox thread queue).
   * *Keyboard Action*: `ArrowUp`/`ArrowDown` shifts focus through the list. `Enter` opens the thread.
2. **Tab Stop 2: Collapsed Message History Trigger**
   * *Aria-Role*: `button` (discloses older message bubbles).
   * *Keyboard Action*: `Space` or `Enter` expands history.
3. **Tab Stop 3: AI Suggested Reply Panel**
   * *Aria-Role*: `region` (labeled "AI Response Assistant").
   * *Keyboard Action*: `Option + A` (Approve & Send), `Option + E` (Edit), `Option + S` (Skip).
4. **Tab Stop 4: Custom Message Area Input**
   * *Aria-Role*: `textbox` (multiline).
   * *Keyboard Action*: Standard text entering; `Enter` triggers validation and send.
5. **Tab Stop 5: Custom Send Button**
   * *Aria-Role*: `button`.
   * *Keyboard Action*: `Enter` or `Space` triggers send.

---

## 2. Dynamic Live Region Assertions (Assistive Technology Tests)

To ensure blind or visually impaired hotel operators can safely navigate the dense message dashboard during peak check-in windows, we specify strict assertions for screen readers using standard ARIA live boundaries.

### Test Case A: Incoming Urgent Guest Message
* **Component Context**: Operator has focus inside the custom text input area typing a message. A new message arrives in an active queue.
* **Expected Markup Behavior**:
  ```html
  <div id="incoming-bubble" role="log" aria-live="polite">
    New message from Gary Stringham (Room 402): "Do you have parking?"
  </div>
  ```
* **Screen Reader Intercept Rule**: Reader must announce the incoming message *politely* (waiting for the current sentence block or typing pause to complete) to prevent interrupting active text inputs.

### Test Case B: Critical SLA Countdown Warning
* **Component Context**: Guest message is close to breaching the 5-minute response SLA.
* **Expected Markup Behavior**:
  ```html
  <div id="sla-assertive-container" class="sr-only" aria-live="assertive">
    Urgent: Room 402 is under 5 minutes SLA response limit. Press Option A to approve draft.
  </div>
  ```
* **Screen Reader Intercept Rule**: Reader must immediately interrupt any ongoing speaking queue and announce the critical message (assertive broadcast priority).

---

## 3. Usability Verification Script & Metrics

To audit compliance, internal developers and testers must run through the following execution-ready protocol:

### Test Scenario: Peak-Shift Response Run
1. Start with focus cleared.
2. Press `Option + DownArrow` to scroll to the first thread containing an active SLA countdown.
3. Verify that focus is visually indicated by a thick slate blue outline (`outline: 2px solid #0284c7`).
4. Read the incoming guest message.
5. Press `Option + A` to approve and send the automatically generated AI draft reply.
6. Verify that:
   * The message is immediately appended optimistically at `50%` opacity.
   * Focus returns automatically to the Thread Queue sidebar.

### Audit Checklist Pass Criteria
* **Mouse-Free Navigation**: 100% of tasks must be executable without touching a trackpad or mouse.
* **Focus Trap Audit**: Pressing `Tab` from the send button must cycle focus cleanly back to the Thread list, preventing focus entrapment.
* **Interactive Hotkey Latency**: Keyboard shortcut registrations must invoke callbacks within <50ms of physical keystroke release.
