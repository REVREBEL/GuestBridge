# Mobile Guest Portal High-Fidelity Mockup Specifications

> Focus: Part 2 (Mobile Mockup Specs) | Surface: External Guest Portal (Mobile Web) | Scope: US-Only LTR

This document outlines the layout rules, border-radii, shadows, margins, and rendering requirements for generating the high-fidelity visual mockups of our Guest Portal.

---

## 1. Mockup A: Booking Lookup View (Step 1)

This screen represents the landing page where guests verify their reservation. It is optimized for standard iOS and Android mobile screens.

* **Layout Container Grid**: Centered layout with `24px` horizontal margins (`px-6`).
* **Visual Styling Details**:
  * **Brand Header Accent**: Standard white background container (`#ffffff`) at `64px` height with a subtle bottom divider line in cream-border color (`#f7f4eb`). Labeled with "Concierge Desk" in uppercase gold (`#aa7c11`) tracking.
  * **Welcome Card Elevation**: A solid white container wrapper (`bg-white`) utilizing a rounded layout corner scale of `16px` (`rounded-2xl`) and a soft box-shadow (`shadow-sm`: `0px 2px 8px rgba(15, 23, 42, 0.04)`).
  * **Input Fields**: Placed in a vertical stack with a `16px` gap. Fields styled with `8px` rounded-corners, soft borders, and an active focus outline of `2px` in gold (`#aa7c11`).
  * **Lookup Button**: Sized at `48px` tall (`h-12`) with a heavy brand gold background (`#aa7c11`), bold white text, and a slight scale-down animation on press.

---

## 2. Mockup B: Curated Welcome Console (Step 3)

This screen represents the landing dashboard shown immediately upon successful verification.

* **Layout Container Grid**: Scrollable single-column container with a `16px` inner grid gap.
* **Visual Styling Details**:
  * **Verified Greeting Banner**: A welcoming marquee section showcasing the guest's name in editorial serif typography.
  * **Room Readiness Badge**: A pill-shaped status indicator showing room availability. Styled with a soft green background (`#e6fcf5`) and deep forest green text (`#0ca678`) to show positive status.
  * **Grid Action Triggers**: A high-priority 2x2 grid containing critical guest shortcuts (Wi-Fi password, Text Desk chat, Parking instructions, Mobile Key). Each tile styled as a square-ish rounded-xl box (`12px` corners) with a white background and centered micro-icons.
  * **Curated Guide Card**: A horizontal layout element showcasing a high-quality picture of a local recommended restaurant. Uses an overlay dark gradient on the photo and elegant serif text descriptions on the right.
