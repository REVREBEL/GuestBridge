# GuestBridge Interface Wireframes & Box Model Blueprints

> Status: Final | Focus: REV-43, REV-45, REV-46 (Layout Blueprints) | Active Branch: `feature/design-sprint-2` | Scope: US-Only LTR

This document contains the visual ASCII wireframes, layout parameters, and HTML/DOM Box Model blueprints for both the mobile-first External Guest Portal and the desktop-dense Internal Admin Console SLA messaging center.

---

## 1. Mobile Guest Portal (External Guest Face)

### 1.1 Mobile Onboarding Lookup Wireframe
```
=====================================================
STEP 1: RESERVATION LOOKUP VIEW (MOBILE)
=====================================================
 [ 15:41 ] 📞 5G                                [X]
 ---------------------------------------------------
 |  [ Hotel Logo: The Luminary ]                   |  <-- Header Accent (64px h)
 ---------------------------------------------------
 |                                                 |
 |  Welcome to The Luminary                        |  <-- Editorial Serif Header (24px)
 |  Please look up your reservation.               |  <-- Sans-Serif Description text (14px)
 |                                                 |
 |  +-------------------------------------------+  |
 |  | Booking Reference                         |  |  <-- Custom Label (11px, bold, uppercase)
 |  | [  H X 8 9 W K 2 Y                     ]  |  |  <-- 8-char Alphanumeric Input (48px h)
 |  +-------------------------------------------+  |
 |  | Last Name                                 |  |
 |  | [  Stringham                           ]  |  |  <-- Standard Input (48px h)
 |  +-------------------------------------------+  |
 |                                                 |
 |  [ ] Keep me updated with SMS check-in alerts  |  <-- US (+1) Toggle Checkbox Target (>48px)
 |                                                 |
 |  +-------------------------------------------+  |
 |  |             [ Look Up My Stay ]           |  |  <-- Primary CTA Button (48px h)
 |  +-------------------------------------------+  |
 |                                                 |
 ---------------------------------------------------
```

### 1.2 Mobile Guest Portal Main Console Wireframe
```
=====================================================
STEP 3: GUEST WELCOME CONSOLE VIEW (MOBILE)
=====================================================
 [ 15:41 ] 📞 5G                                [X]
 ---------------------------------------------------
 |  [ Hotel Logo: The Luminary ]                   |  <-- Header Accent (64px h)
 ---------------------------------------------------
 |  Welcome, Gary Stringham!                       |  <-- Greeting (Editorial Serif, 22px)
 |  Room 402 is [ READY FOR YOU ]                  |  <-- Dynamic Status Badge (Pill style)
 |                                                 |
 |  +------------------+   +------------------+    |
 |  |   [ Wi-Fi ]      |   |   [ Text Desk ]  |    |  <-- 16px Spacing Grid Gaps
 |  |   Get Network    |   |   Front Desk SMS |    |  <-- Touch Targets: 64px h / rounded
 |  +------------------+   +------------------+    |
 |  |   [ Parking ]    |   |   [ Key Access ] |    |
 |  |   Instructions   |   |   Mobile Key     |    |
 |  +------------------+   +------------------+    |
 |                                                 |
 |  CURATED FOR YOUR ARRIVAL                       |  <-- Section Title (Avenir, 12px, bold)
 |  +-------------------------------------------+  |
 |  | [Photo]  Bistro Luminary                  |  |  <-- Curated Local Spot Card (rounded-lg)
 |  |          Elegant dining, 2 blocks away.   |  |  <-- 12px margin padding box
 |  +-------------------------------------------+  |
 ---------------------------------------------------
```

### 1.3 HTML/DOM Box Model Blueprint (Onboarding Page)
```html
<!-- Outer mobile viewport shell (US LTR Only) -->
<div class="w-full max-w-md min-h-screen bg-[#fdfbf7] flex flex-col font-sans LTR text-slate-900 overflow-x-hidden antialiased">
  
  <!-- Header section (64px fixed) -->
  <header class="h-16 px-6 bg-white border-b border-[#f7f4eb] flex items-center justify-between shrink-0">
    <img class="h-8 w-auto object-contain" src="/assets/luminary-logo.svg" alt="The Luminary Hotel Logo" />
    <span class="text-xs tracking-wider uppercase text-[#aa7c11] font-semibold">Concierge Desk</span>
  </header>

  <!-- Main scrollable layout canvas -->
  <main class="flex-1 p-6 flex flex-col justify-center space-y-8">
    
    <!-- Title greeting block -->
    <div class="space-y-2">
      <h1 class="font-serif text-3xl font-medium text-slate-900 leading-tight">Welcome, Gary Stringham!</h1>
      <p class="text-sm text-slate-700 font-normal leading-relaxed">Please verify your booking reference and ZIP code to claim your room key and front-desk text support.</p>
    </div>

    <!-- Active interactive Lookup form -->
    <form class="space-y-4">
      
      <!-- Input 1: Booking Reference -->
      <div class="flex flex-col space-y-1">
        <label class="text-xs font-semibold text-slate-800 uppercase tracking-wider">Booking Reference</label>
        <input class="w-full h-12 px-4 rounded-lg border border-neutral-200 bg-white text-base text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#aa7c11] focus:ring-offset-2 uppercase font-mono tracking-widest placeholder:normal-case placeholder:font-sans placeholder:tracking-normal transition-shadow" type="text" maxlength="8" placeholder="e.g. ABCD1234" required />
      </div>

      <!-- Input 2: Last Name -->
      <div class="flex flex-col space-y-1">
        <label class="text-xs font-semibold text-slate-800 uppercase tracking-wider">Last Name</label>
        <input class="w-full h-12 px-4 rounded-lg border border-neutral-200 bg-white text-base text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#aa7c11] focus:ring-offset-2 transition-shadow" type="text" placeholder="e.g. Stringham" required />
      </div>

      <!-- SMS updates trigger checkbox box wrapper (>48px target) -->
      <div class="flex items-start space-x-3 py-2 cursor-pointer select-none">
        <input id="sms-opt-in" class="h-5 w-5 rounded border-neutral-300 text-[#aa7c11] focus:ring-[#aa7c11] mt-0.5" type="checkbox" checked />
        <label for="sms-opt-in" class="text-xs text-slate-700 leading-relaxed font-normal">
          Keep me updated with real-time text alerts (SMS). Opt-in to receive room ready details, parking directions, and front desk chat support directly to your phone.
        </label>
      </div>

      <!-- Action submission CTA -->
      <button class="w-full h-12 bg-[#aa7c11] text-white font-semibold text-base rounded-lg shadow-sm hover:bg-[#c59218] active:scale-[0.98] transition-all flex items-center justify-center cursor-pointer" type="submit">
        Look Up My Stay
      </button>

    </form>
  </main>
</div>
```

---

## 2. Desktop Admin Console (Hotel Operator Face)

### 2.1 Desktop Console UI Wireframe
```
========================================================================================================================
DESKTOP ADMIN CONSOLE WIREFRAME (HIGH-DENSITY SHIFT WORKSPACE)
========================================================================================================================
 [File] [Edit] [Settings]                                                                          Operator: G. Stringham
 ----------------------------------------------------------------------------------------------------------------------
 |  (•) GUESTBRIDGE  |  [💬 Inbox]  |  [👥 Guests]  |  [📊 Analytics]  |  [⚙️ Settings]              | <-- Navigation Bar (56px)
 ----------------------------------------------------------------------------------------------------------------------
 | SEARCH QUEUE (Ctrl+K)   | ACTIVE THREAD: ROOM 402                                                                  |
 | [ Search threads...  ]  | Guest: Gary Stringham  |  Arrival: June 10  |  SLA Remaining: [ 04:12 ] (CRITICAL)       |
 | ----------------------- | ---------------------------------------------------------------------------------------- |
 | [!] Room 402     04:12  | [System] 15:28 - OTA reservation verified via mobile guest portal link. (US Identity)    |
 |     Gary S. (SLA Alert) | [Guest]  15:30 - "Is there parking available on-site?"                                   |
 |                         | ---------------------------------------------------------------------------------------- |
 | [ ] Room 104     12:05  | [✨ AI REPLY ASSISTANT] (Auto-Generated Option)                                           |
 |     Sarah P.            | "On-site parking is available for $25/night. Would you like me to reserve a spot?"       |
 |                         |                                                                                          |
 | [ ] Room 218     18:55  | [Option+A] Approve & Send Draft   |   [Option+E] Copy & Edit   |   [Option+S] Skip         |
 |     John D.             | ---------------------------------------------------------------------------------------- |
 |                         | [Operator Message Input]                                                                 |
 |                         | [ Write custom response here...                                                        ] |
 |                         |                                                                                          |
 |                         | [Option+L] Archive Thread                      [ Press ENTER to send custom message ]    |
 ----------------------------------------------------------------------------------------------------------------------
```

### 2.2 HTML/DOM Box Model Blueprint
```html
<!-- Outer high-density full-screen viewport -->
<div class="w-screen h-screen flex flex-col bg-[#f8fafc] text-slate-900 font-sans antialiased overflow-hidden LTR">

  <!-- Main Navigation Bar (56px h) -->
  <nav class="h-14 bg-[#0f172a] text-white px-6 flex items-center justify-between shadow-sm z-50 shrink-0">
    <div class="flex items-center space-x-8">
      <div class="flex items-center space-x-2">
        <div class="h-6 w-6 rounded bg-[#0284c7] flex items-center justify-center text-xs font-bold">GB</div>
        <span class="font-bold text-lg tracking-tight uppercase">GuestBridge</span>
      </div>
      <!-- Nav Tabs -->
      <div class="flex items-center space-x-1">
        <a href="#inbox" class="h-14 px-4 flex items-center text-sm font-semibold border-b-2 border-[#0284c7] text-white">Inbox</a>
        <a href="#guests" class="h-14 px-4 flex items-center text-sm font-medium text-slate-400 hover:text-white transition-colors">Guests</a>
        <a href="#analytics" class="h-14 px-4 flex items-center text-sm font-medium text-slate-400 hover:text-white transition-colors">Analytics</a>
      </div>
    </div>
    <div class="flex items-center space-x-4 text-xs font-medium text-slate-300">
      <span>Operator: <strong class="text-white font-semibold">G. Stringham</strong></span>
      <div class="h-8 w-8 rounded-full bg-slate-700 flex items-center justify-center font-bold text-white border border-slate-600">GS</div>
    </div>
  </nav>

  <!-- Split Panel Interface Container -->
  <div class="flex-1 flex overflow-hidden">
    
    <!-- Sidebar Queue Container (320px fixed) -->
    <aside class="w-80 border-r border-slate-200 bg-white flex flex-col shrink-0">
      <div class="p-4 border-b border-slate-100 shrink-0">
        <input class="w-full h-9 px-3 bg-slate-100 rounded-md border border-transparent text-sm focus:bg-white focus:border-blue-500 focus:outline-none transition-all placeholder:text-slate-400 font-medium" type="text" placeholder="Search threads... (Ctrl+K)" />
      </div>
      <!-- Scrollable Queue List -->
      <div class="flex-1 overflow-y-auto space-y-1 p-2 bg-slate-50/50">
        <!-- SLA Warning Card 1 -->
        <div class="p-4 rounded-lg bg-red-50/70 border border-red-100 flex flex-col space-y-2 cursor-pointer select-none">
          <div class="flex items-center justify-between">
            <span class="text-xs font-bold text-red-600 tracking-wider uppercase animate-pulse">Room 402</span>
            <span class="text-xs font-mono font-bold text-red-700 bg-red-100 px-2 py-0.5 rounded-full">04:12 SLA</span>
          </div>
          <span class="text-sm font-bold text-slate-950 truncate">Gary Stringham</span>
          <span class="text-xs text-slate-600 truncate">"Is there parking available on-site?"</span>
        </div>
        <!-- Card 2 -->
        <div class="p-4 rounded-lg bg-white border border-slate-100 flex flex-col space-y-2 cursor-pointer hover:bg-slate-50 transition-colors">
          <div class="flex items-center justify-between">
            <span class="text-xs font-bold text-slate-800 uppercase">Room 104</span>
            <span class="text-xs font-mono font-medium text-slate-500">12:05 SLA</span>
          </div>
          <span class="text-sm font-semibold text-slate-900 truncate">Sarah Parker</span>
          <span class="text-xs text-slate-500 truncate">"When can I request a late checkout?"</span>
        </div>
      </div>
    </aside>

    <!-- Chat Active Window Workspace -->
    <section class="flex-1 flex flex-col bg-slate-50 overflow-hidden">
      
      <!-- Thread Header Info Bar (64px fixed) -->
      <header class="h-16 px-6 bg-white border-b border-slate-200 flex items-center justify-between shrink-0">
        <div class="flex items-center space-x-3">
          <span class="text-lg font-bold text-slate-950">Room 402</span>
          <span class="h-2 w-2 rounded-full bg-red-500"></span>
          <span class="text-sm text-slate-600 font-medium">Gary Stringham (VIP Traveler)</span>
        </div>
        <div class="flex items-center space-x-3">
          <span class="text-xs font-medium text-slate-500">Arrival: June 10</span>
          <div class="h-8 px-3 bg-red-50 border border-red-100 rounded flex items-center text-xs font-mono font-bold text-red-600">
            SLA TIME: 04:12 remaining
          </div>
        </div>
      </header>

      <!-- Message Bubbles Scroll Area -->
      <div class="flex-1 overflow-y-auto p-6 space-y-4">
        <!-- Guest Bubble -->
        <div class="flex flex-col space-y-1 max-w-lg">
          <span class="text-xs font-bold text-slate-600 pl-3">Guest (15:30)</span>
          <div class="bg-white border border-slate-200 px-4 py-3 rounded-2xl rounded-tl-none shadow-sm text-sm text-slate-900 leading-relaxed">
            Hi, is there parking available on-site? What are the standard rates for parking?
          </div>
        </div>
      </div>

      <!-- Operator Reply Section Controls (Input Area) -->
      <footer class="bg-white border-t border-slate-200 p-4 shrink-0 space-y-4">
        
        <!-- AI Response Suggestion Panel -->
        <div class="bg-blue-50/50 border border-blue-100 rounded-lg p-4 flex flex-col space-y-3">
          <div class="flex items-center justify-between">
            <span class="text-xs font-bold text-blue-700 tracking-wider uppercase">✨ AI Suggested Response</span>
            <span class="text-[10px] bg-blue-100 text-blue-800 px-2 py-0.5 rounded font-semibold">Ready to draft</span>
          </div>
          <p class="text-sm text-slate-800 leading-relaxed font-normal">
            Yes, on-site parking is available for $25/night. Would you like me to reserve a spot for your stay?
          </p>
          <div class="flex items-center space-x-4 text-xs font-semibold pt-1">
            <button class="bg-[#0284c7] hover:bg-[#0369a1] text-white px-4 py-1.5 rounded shadow-sm cursor-pointer transition-colors flex items-center space-x-1">
              <span>Approve & Send</span>
              <kbd class="ml-2 font-mono text-[10px] bg-sky-900/40 text-sky-100 px-1.5 py-0.5 rounded">Option + A</kbd>
            </button>
            <button class="text-slate-700 hover:text-slate-950 flex items-center space-x-1 cursor-pointer">
              <span>Edit Draft</span>
              <kbd class="ml-1.5 font-mono text-[10px] bg-slate-100 border border-slate-200 px-1 py-0.5 rounded text-slate-500">Option + E</kbd>
            </button>
          </div>
        </div>

        <!-- Custom operator typing input -->
        <div class="flex flex-col space-y-3">
          <textarea class="w-full h-20 p-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0284c7] focus:ring-offset-1 resize-none text-sm text-slate-900 placeholder:text-slate-400" placeholder="Type a custom message to send (Enter)..."></textarea>
          <div class="flex items-center justify-between text-xs text-slate-400">
            <span>Press <kbd class="font-mono bg-slate-100 border px-1 py-0.5 rounded">Enter</kbd> to send | <kbd class="font-mono bg-slate-100 border px-1 py-0.5 rounded">Option + L</kbd> to archive thread</span>
            <button class="h-9 px-4 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold rounded-md cursor-pointer transition-colors">Send Message</button>
          </div>
        </div>

      </footer>
    </section>

  </div>
</div>
```
