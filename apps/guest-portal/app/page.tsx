"use client";

import React from "react";
import { VerificationCard } from "@packages/ui";

export default function GuestPortalPage() {
  const handleVerificationSuccess = (payload: any) => {
    console.log("Verification Success:", payload);
    alert("Verification Successful!");
  };

  return (
    <main className="min-h-screen bg-[#fdfbf7] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <VerificationCard 
          sourcePlatform="direct"
          onVerificationSuccess={handleVerificationSuccess}
        />
      </div>
    </main>
  );
}
