# Design Sprint 1 Plan — GuestBridge Foundation & Entryway

> Sprint Goal: Establish US-only design tokens and finalize the zero-install guest verification spec.
> Active Branch: `feature/design-sprint-1`

---

## 1. Command & Task Sequence

| # | Task / Target | Executing Agent | Deliverable |
|---|---|---|---|
| 1 | Compile core US-only token system | Systems Agent (`design-systems`) | `docs/design/system/tokens.json` |
| 2 | Specify guest verification journey | Strategy & Research Agents | `docs/design/research/verification-ux.md` |
| 3 | Create interactive `VerificationCard` spec | UI & Interaction Agents | `docs/design/system/verification-card.md` |
| 4 | Conduct usability & accessibility audit | Testing Agent (`prototyping-testing`) | `docs/design/testing/sprint-1-audit.md` |

---

## 2. Success Criteria

- [ ] Design token JSON contains both *Concierge Warm* and *Operator Slate* semantic themes.
- [ ] No international/RTL styling constraints or multi-language expansion margins exist.
- [ ] `VerificationCard` state machine handles form validation, loading, success, and cooldown states.
- [ ] Usability scenario defines a 60-second guest boarding protocol.
- [ ] Contrast ratio for all portal colors passes WCAG 2.2 AAA standard (7:1 for body, 4.5:1 for headings).
