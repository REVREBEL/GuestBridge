# DesignOps Governance & Operating Model

> Focus: REV-48 (DesignOps operating model) | Surface: Global GuestBridge System | Platform: Cross-Team Integration

---

## 1. Dual-Track Agile Workflow

GuestBridge uses a dual-track Agile framework to isolate discovery (research, UX validation) from delivery (component builds, front-end implementation). This prevents engineering teams from building unvalidated layouts.

```
       [ DISCOVERY TRACK ]
   User Interviews & Journey Maps (REV-43)
               │
               ▼
   Interactive Spec & Tokens (REV-44, 45) ──► [ DESIGN REVIEW GATES ]
                                                          │
                                                          ▼
                                                  [ DELIVERY TRACK ]
                                               React & Tailwind Builds
```

### Discovery Track
* **Focus**: Defining problems, mapping guest/operator visual flows, compiling UX constraints, and validating prototypes.
* **Cadence**: Bi-weekly sprint planning 1 sprint ahead of the delivery team.

### Delivery Track
* **Focus**: Writing React code, setting up build pipelines, integrating design token files, and building responsive front-ends.
* **Cadence**: standard 2-week agile sprints.

---

## 2. Collaboration Rituals & Cadence

| Ritual Ceremony | Frequency | Active Attendees | Structured Agenda Format |
|---|---|---|---|
| **Design Sync / Standup** | Mon/Wed/Fri (15m) | All Designers, PMs | Blockers, daily sprint task focus, and token update alerts. |
| **Design Critique** | Every Tuesday (45m) | Swarm Designers, Guests | Structured review using the **Notice/Wonder/What-if** framing to prevent biased opinions. |
| **Developer Handoff** | Prior to Sprint Start | Lead Designer, Tech Leads | Walkthrough of markdown component specs, TypeScript prop contracts, and token variables. |

---

## 3. Design Review Gates

Before any design specification or prototype can be handed off for delivery, it must clear 4 quality gates:

```
[ Problem Alignment ] ──► [ Component Compliance ] ──► [ Edge-Case Review ] ──► [ Visual QA ]
```

1. **Gate 1: Problem Alignment** (UX Strategy / Research)
   * *Audit Criterion*: Does this address a verified guest friction point? Has it been verified with standard US user persona guidelines?
2. **Gate 2: Component Compliance** (Design Systems)
   * *Audit Criterion*: Are all color and spacing styles mapped to semantic aliases in `tokens.json`? Has duplicate UI code been prevented?
3. **Gate 3: Edge-Case & State Audit** (Interaction Design)
   * *Audit Criterion*: Are empty states, validation failures, and maximum text boundaries accounted for?
4. **Gate 4: Visual & Accessibility QA** (Critique & Testing)
   * *Audit Criterion*: Has contrast been verified against WCAG 2.2 AAA? Are touch targets >48px?

---

## 4. Design System Governance

To prevent style fragmentation as GuestBridge scales to additional modules (such as CRM or guides), token and component changes are strictly governed.

### RFC (Request for Comments) Submission
1. Any designer or engineer proposing a new token or component modification must submit a structured markdown issue outlining the *why* and the *impact*.
2. The Design System Swarm reviews proposals during the Tuesday design critique.

### Semantic Versioning (SemVer) Rules for Tokens
All token release packages follow SemVer specifications:
* **Patch Release** (`1.0.x`): Modifying a raw value without changing variable names (e.g. tweaking `#aa7c11` luminance).
* **Minor Release** (`1.x.0`): Adding new semantic alias tokens or non-breaking component tokens.
* **Major Release** (`x.0.0`): Renaming core token properties or deleting legacy structures.

---

## 5. Design Release Checklist

Before marking any spec as ready for developer handoff, designers must sign off on the following checklist:

- [ ] Every color variable is successfully linked to global theme values in `tokens.json`.
- [ ] Responsive states (mobile, tablet, desktop) are specified.
- [ ] Form validations respect US-only parameters (no RTL, standard 10-digit phone models, 5-digit ZIPs).
- [ ] Contrast analysis runs return no "High Priority" visual hierarchy debt.
- [ ] Keyboard focus routing behaves predictably, ensuring 100% mouse-free workflow capabilities.
