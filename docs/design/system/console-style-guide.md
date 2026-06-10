# Admin Console Style Tokens ("Operator Slate" Theme)

> Focus: Part 1B (Console Style Guide) | Surface: Internal Admin Console (Desktop-Dense Web) | Scope: US-Only LTR

This guide documents the core aesthetic choices, colors, and typography scales for our high-density desktop operator dashboard.

---

## 1. Core Color Swatches

* **Canvas Background**: `Slate-50` — `#f8fafc`
  * *A crisp, subtle light-gray that serves as an excellent low-contrast backdrop for multi-window layouts.*
* **Container Cards**: `White` — `#ffffff`
  * *Standard white paneling for crisp data boundaries and distinct visual sections.*
* **Interactive Highlights**: `Brand Blue-500` — `#0284c7`
  * *The primary action color used for keyboard focus rings, active sidebars, and operator navigation highlights.*
* **Primary Text**: `Slate-900` — `#0f172a`
  * *Provides a high-contrast dark-slate to guarantee readable text inside dense grids and messaging feeds.*
* **Secondary Text**: `Slate-800` — `#1e293b`
  * *Used for operator metadata, timestamps, and column headers.*
* **SLA Alerts**: `Error Red-500` — `#ef4444`
  * *A vibrant crimson red used for active critical timers and flashing warnings.*

---

## 2. Typography Scale

* **Page Titles & Headers (Interface Sans)**: *Inter* (or system-ui fallback)
  * *Scale*: `18px` | *Weight*: `Semibold (600)` | *Line Height*: `1.3`
* **Data Grid Text & Chat Logs**: *Inter* (sans-serif fallback)
  * *Scale*: `13px` | *Weight*: `Regular (400)`
* **Timers & SLA Badges**: *Monospace* (e.g. SFMono-Regular, Consolas, monospace fallback)
  * *Scale*: `12px` | *Weight*: `Bold (700)`
  * *Feel*: Highly precise, technical, and urgent.
