"use client";

import React from "react";
import { GuestJourneyFlow } from "@packages/ui";

export default function GuestPortalPage() {
  const handleJourneyComplete = (data: any) => {
    console.log("Full Guest Journey Completed:", data);
  };

  return (
    <main className="min-h-screen bg-[#fdfbf7] flex items-center justify-center p-4 py-12">
      <div className="w-full max-w-md">
        <GuestJourneyFlow onJourneyComplete={handleJourneyComplete} />
      </div>
    </main>
  );
}
