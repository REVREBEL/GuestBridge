import React, { useState } from "react";

const INTERESTS = [
  { id: "fashion", label: "The Fashion Insider", icon: "✨" },
  { id: "arts", label: "Arts & Culture Aficionado", icon: "🎨" },
  { id: "culinary", label: "The Culinary Connoisseur", icon: "🍽️" },
  { id: "outdoor", label: "The Outdoor Adventurer", icon: "🌲" },
  { id: "sports", label: "The Sports Enthusiast", icon: "⚽" },
  { id: "wellness", label: "The Wellness Seeker", icon: "🧘" },
  { id: "live", label: "Live Entertainment Buff", icon: "🎸" },
  { id: "urban", label: "The Urban Explorer", icon: "🏙️" }
];

export interface GuestJourneyFlowProps {
  onJourneyComplete?: (data: any) => void;
}

export function GuestJourneyFlow({ onJourneyComplete }: GuestJourneyFlowProps) {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  // Step 1: Verification Form
  const [bookingRef, setBookingRef] = useState("");
  const [lastName, setLastName] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isVerifying, setIsVerifying] = useState(false);

  // Step 2: Contact Capture
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [zip, setZip] = useState("");
  const [smsConsent, setSmsConsent] = useState(true);

  // Step 3: Trip Curation
  const [tripType, setTripType] = useState<"work" | "personal" | null>(null);
  const [companions, setCompanions] = useState<"solo" | "partner" | "friends" | "kids" | null>(null);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [additionalNotes, setAdditionalNotes] = useState("");

  // Input Formatters
  const handleBookingRefChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, "").substring(0, 8);
    setBookingRef(val);
    if (errors.bookingRef) setErrors((prev) => ({ ...prev, bookingRef: "" }));
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const digits = e.target.value.replace(/\D/g, "");
    let cleanDigits = digits;
    if (digits.startsWith("1") && digits.length > 1) {
      cleanDigits = digits.substring(1);
    }
    cleanDigits = cleanDigits.substring(0, 10);

    let formatted = "";
    if (cleanDigits.length === 0) {
      formatted = "";
    } else if (cleanDigits.length <= 3) {
      formatted = `+1 (${cleanDigits}`;
    } else if (cleanDigits.length <= 6) {
      formatted = `+1 (${cleanDigits.substring(0, 3)}) ${cleanDigits.substring(3)}`;
    } else {
      formatted = `+1 (${cleanDigits.substring(0, 3)}) ${cleanDigits.substring(3, 6)}-${cleanDigits.substring(6)}`;
    }
    setPhone(formatted);
    if (errors.phone) setErrors((prev) => ({ ...prev, phone: "" }));
  };

  const handleZipChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const clean = e.target.value.replace(/\D/g, "").substring(0, 5);
    setZip(clean);
    if (errors.zip) setErrors((prev) => ({ ...prev, zip: "" }));
  };

  // Step 1 Submit
  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { [key: string]: string } = {};

    if (bookingRef.length !== 8) {
      newErrors.bookingRef = "Expedia confirmation code must be exactly 8 characters.";
    }
    if (!lastName.trim()) {
      newErrors.lastName = "Last name is required.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsVerifying(true);
    // Simulate PMS API Match call
    setTimeout(() => {
      setIsVerifying(false);
      setStep(2);
    }, 1200);
  };

  // Step 2 Submit
  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { [key: string]: string } = {};

    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Please enter a valid email address.";
    }
    const cleanPhoneDigits = phone.replace(/\D/g, "");
    // +1 country code + 10 digits = 11 digits
    if (cleanPhoneDigits.length !== 11) {
      newErrors.phone = "Please enter a valid 10-digit US phone number.";
    }
    if (zip.length !== 5) {
      newErrors.zip = "Please enter a valid 5-digit US ZIP code.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setStep(3);
  };

  // Step 3 Interest Toggle
  const toggleInterest = (id: string) => {
    setSelectedInterests((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Step 3 Submit
  const handleCuratorSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const journeyData = {
      bookingRef,
      lastName,
      contact: {
        email,
        phone,
        zip,
        smsConsent
      },
      curation: {
        tripType,
        companions,
        selectedInterests,
        additionalNotes
      }
    };
    if (onJourneyComplete) {
      onJourneyComplete(journeyData);
    }
    setStep(4);
  };

  return (
    <div className="w-full max-w-md mx-auto bg-[#fdfbf7] p-1 font-sans LTR text-slate-900 antialiased selection:bg-[#aa7c11]/10">
      {/* Step 1: Verification Gateway */}
      {step === 1 && (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#f7f4eb] space-y-6 transition-all duration-300">
          <div className="text-center space-y-2">
            <h1 className="font-serif text-3xl font-medium tracking-tight text-slate-900 leading-tight">
              Welcome to GuestBridge
            </h1>
            <p className="text-sm text-slate-700 leading-relaxed">
              Please look up your reservation using your confirmation details to personalize your stay.
            </p>
          </div>

          <form onSubmit={handleVerify} className="space-y-4">
            <div className="flex flex-col space-y-1">
              <label className="text-[11px] font-semibold text-slate-800 uppercase tracking-wider">
                Expedia Booking Reference
              </label>
              <input
                type="text"
                value={bookingRef}
                onChange={handleBookingRefChange}
                placeholder="e.g. EXP12345"
                maxLength={8}
                className={`w-full h-12 px-4 rounded-lg border bg-white text-base text-slate-900 font-mono tracking-widest placeholder:font-sans placeholder:tracking-normal focus:outline-none focus:ring-2 focus:ring-[#aa7c11] focus:ring-offset-2 transition-shadow ${
                  errors.bookingRef ? "border-red-500" : "border-neutral-200"
                }`}
                disabled={isVerifying}
              />
              {errors.bookingRef && (
                <span className="text-xs text-red-500 font-medium mt-0.5">{errors.bookingRef}</span>
              )}
            </div>

            <div className="flex flex-col space-y-1">
              <label className="text-[11px] font-semibold text-slate-800 uppercase tracking-wider">
                Last Name
              </label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => {
                  setLastName(e.target.value);
                  if (errors.lastName) setErrors((prev) => ({ ...prev, lastName: "" }));
                }}
                placeholder="e.g. Stringham"
                className={`w-full h-12 px-4 rounded-lg border bg-white text-base text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#aa7c11] focus:ring-offset-2 transition-shadow ${
                  errors.lastName ? "border-red-500" : "border-neutral-200"
                }`}
                disabled={isVerifying}
              />
              {errors.lastName && (
                <span className="text-xs text-red-500 font-medium mt-0.5">{errors.lastName}</span>
              )}
            </div>

            <button
              type="submit"
              disabled={isVerifying}
              className="w-full h-12 mt-6 bg-[#aa7c11] text-white font-semibold rounded-lg hover:bg-[#93690d] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-[#aa7c11] focus:ring-offset-2 transition-all flex items-center justify-center cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed"
            >
              {isVerifying ? (
                <div className="flex items-center space-x-2">
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  <span>Searching Reservation...</span>
                </div>
              ) : (
                "Look Up My Stay"
              )}
            </button>
          </form>
        </div>
      )}

      {/* Step 2: Contact Handshake */}
      {step === 2 && (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#f7f4eb] space-y-6 transition-all duration-300">
          <div className="space-y-2">
            <div className="inline-flex items-center justify-center px-3 py-1 rounded-full bg-green-50 text-[#10b981] text-xs font-semibold tracking-wide uppercase border border-green-100 mb-1">
              ✨ Match Found
            </div>
            <h2 className="font-serif text-2xl font-medium text-slate-900 leading-tight">
              We found your reservation!
            </h2>
            <p className="text-sm text-slate-700 leading-relaxed">
              Hi <strong>{lastName}</strong>, let's unlock your direct guest companion guidebook and hotel updates.
            </p>
          </div>

          <form onSubmit={handleContactSubmit} className="space-y-4">
            <div className="flex flex-col space-y-1">
              <label className="text-[11px] font-semibold text-slate-800 uppercase tracking-wider">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errors.email) setErrors((prev) => ({ ...prev, email: "" }));
                }}
                placeholder="e.g. gary@example.com"
                className={`w-full h-12 px-4 rounded-lg border bg-white text-base text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#aa7c11] focus:ring-offset-2 transition-shadow ${
                  errors.email ? "border-red-500" : "border-neutral-200"
                }`}
              />
              {errors.email && (
                <span className="text-xs text-red-500 font-medium mt-0.5">{errors.email}</span>
              )}
            </div>

            <div className="flex flex-col space-y-1">
              <label className="text-[11px] font-semibold text-slate-800 uppercase tracking-wider">
                US Mobile Phone
              </label>
              <input
                type="tel"
                value={phone}
                onChange={handlePhoneChange}
                placeholder="+1 (555) 555-5555"
                className={`w-full h-12 px-4 rounded-lg border bg-white text-base text-slate-900 font-mono focus:outline-none focus:ring-2 focus:ring-[#aa7c11] focus:ring-offset-2 transition-shadow ${
                  errors.phone ? "border-red-500" : "border-neutral-200"
                }`}
              />
              {errors.phone && (
                <span className="text-xs text-red-500 font-medium mt-0.5">{errors.phone}</span>
              )}
            </div>

            <div className="flex flex-col space-y-1">
              <label className="text-[11px] font-semibold text-slate-800 uppercase tracking-wider">
                US ZIP Code
              </label>
              <input
                type="text"
                value={zip}
                onChange={handleZipChange}
                placeholder="e.g. 90210"
                maxLength={5}
                className={`w-full h-12 px-4 rounded-lg border bg-white text-base text-slate-900 font-mono tracking-widest placeholder:font-sans placeholder:tracking-normal focus:outline-none focus:ring-2 focus:ring-[#aa7c11] focus:ring-offset-2 transition-shadow ${
                  errors.zip ? "border-red-500" : "border-neutral-200"
                }`}
              />
              {errors.zip && (
                <span className="text-xs text-red-500 font-medium mt-0.5">{errors.zip}</span>
              )}
            </div>

            <div className="flex items-start space-x-3 py-2 cursor-pointer select-none">
              <input
                id="sms-consent"
                type="checkbox"
                checked={smsConsent}
                onChange={(e) => setSmsConsent(e.target.checked)}
                className="h-5 w-5 rounded border-neutral-300 text-[#aa7c11] focus:ring-[#aa7c11] focus:ring-offset-2 mt-0.5 cursor-pointer"
              />
              <label htmlFor="sms-consent" class="text-xs text-slate-700 leading-relaxed font-normal cursor-pointer">
                Keep me updated with real-time text alerts (SMS). Opt-in to receive room ready details, parking directions, and front desk chat support directly to your phone.
              </label>
            </div>

            <button
              type="submit"
              className="w-full h-12 mt-6 bg-[#aa7c11] text-white font-semibold rounded-lg hover:bg-[#93690d] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-[#aa7c11] focus:ring-offset-2 transition-all flex items-center justify-center cursor-pointer"
            >
              Continue to Preferences
            </button>
          </form>
        </div>
      )}

      {/* Step 3: Trip Curation */}
      {step === 3 && (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#f7f4eb] space-y-6 transition-all duration-300">
          <div className="space-y-1">
            <h2 className="font-serif text-2xl font-medium text-slate-900 leading-tight">
              Personalize Your Stay
            </h2>
            <p className="text-sm text-slate-700 leading-relaxed">
              We customize local guidebooks and hotel upgrades to align perfectly with your visit.
            </p>
          </div>

          <form onSubmit={handleCuratorSubmit} className="space-y-6">
            {/* Trip Type */}
            <div className="space-y-2">
              <label className="text-[11px] font-semibold text-slate-800 uppercase tracking-wider block">
                Is this trip for work or purely personal?
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setTripType("work")}
                  className={`h-11 rounded-lg font-medium text-sm border flex items-center justify-center transition-all cursor-pointer ${
                    tripType === "work"
                      ? "border-[#aa7c11] bg-[#fdfbf7] text-[#aa7c11] ring-2 ring-[#aa7c11]"
                      : "border-neutral-200 text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  💼 Work Trip
                </button>
                <button
                  type="button"
                  onClick={() => setTripType("personal")}
                  className={`h-11 rounded-lg font-medium text-sm border flex items-center justify-center transition-all cursor-pointer ${
                    tripType === "personal"
                      ? "border-[#aa7c11] bg-[#fdfbf7] text-[#aa7c11] ring-2 ring-[#aa7c11]"
                      : "border-neutral-200 text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  🌴 Purely Personal
                </button>
              </div>
            </div>

            {/* Companions */}
            <div className="space-y-2">
              <label className="text-[11px] font-semibold text-slate-800 uppercase tracking-wider block">
                Who are you traveling with?
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: "solo", label: "Solo Traveler", icon: "👤" },
                  { id: "partner", label: "Significant Other", icon: "❤️" },
                  { id: "friends", label: "With Friends", icon: "👥" },
                  { id: "kids", label: "Kids in Tow", icon: "👶" }
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setCompanions(item.id as any)}
                    className={`h-11 rounded-lg font-medium text-xs border flex items-center px-3 space-x-2 transition-all cursor-pointer ${
                      companions === item.id
                        ? "border-[#aa7c11] bg-[#fdfbf7] text-[#aa7c11] ring-2 ring-[#aa7c11]"
                        : "border-neutral-200 text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    <span>{item.icon}</span>
                    <span>{item.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Interests Preferences Grid */}
            <div className="space-y-2">
              <label className="text-[11px] font-semibold text-slate-800 uppercase tracking-wider block">
                Check the boxes that fit your interests:
              </label>
              <div className="grid grid-cols-2 gap-2 max-h-56 overflow-y-auto pr-1">
                {INTERESTS.map((interest) => {
                  const isSelected = selectedInterests.includes(interest.id);
                  return (
                    <button
                      key={interest.id}
                      type="button"
                      onClick={() => toggleInterest(interest.id)}
                      className={`p-3 rounded-lg border text-left flex flex-col justify-between h-20 transition-all cursor-pointer ${
                        isSelected
                          ? "border-[#aa7c11] bg-[#fdfbf7] ring-1 ring-[#aa7c11]"
                          : "border-neutral-200 text-slate-800 hover:bg-slate-50"
                      }`}
                    >
                      <div className="text-xl">{interest.icon}</div>
                      <span className="text-xs font-semibold leading-tight">{interest.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Notes */}
            <div className="flex flex-col space-y-1">
              <label className="text-[11px] font-semibold text-slate-800 uppercase tracking-wider">
                Anything else we should know?
              </label>
              <textarea
                value={additionalNotes}
                onChange={(e) => setAdditionalNotes(e.target.value)}
                placeholder="e.g. Dietary restrictions, high floor, early arrival, allergen free room..."
                className="w-full h-20 p-3 rounded-lg border border-neutral-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#aa7c11] focus:ring-offset-2 resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full h-12 mt-6 bg-[#aa7c11] text-white font-semibold rounded-lg hover:bg-[#93690d] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-[#aa7c11] focus:ring-offset-2 transition-all flex items-center justify-center cursor-pointer"
            >
              Complete My Curation
            </button>
          </form>
        </div>
      )}

      {/* Step 4: Final Confirmation */}
      {step === 4 && (
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-[#f7f4eb] text-center space-y-6 transition-all duration-300">
          <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-green-50 text-[#10b981] border border-green-100">
            <svg
              className="h-8 w-8 animate-[bounce_1.5s_infinite]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>

          <div className="space-y-3">
            <h2 className="font-serif text-3xl font-medium text-slate-900 leading-tight">
              We're Customizing Your Stay!
            </h2>
            <p className="text-sm text-slate-700 leading-relaxed max-w-sm mx-auto">
              We are now personalizing an experience just for you. Your curated guest companion guidebook and room ready
              alerts will be on their way shortly via SMS and email.
            </p>
          </div>

          <div className="bg-[#fdfbf7] p-4 rounded-xl border border-[#f7f4eb] space-y-2 max-w-xs mx-auto text-left text-xs text-slate-700">
            <div className="font-semibold text-slate-900 uppercase tracking-wider text-[10px] mb-1">
              Your Details
            </div>
            <div>
              <strong>Last Name:</strong> {lastName}
            </div>
            <div>
              <strong>Email:</strong> {email}
            </div>
            <div>
              <strong>Updates Enabled:</strong> {smsConsent ? "Yes (SMS + Email)" : "Email Only"}
            </div>
            <div>
              <strong>Selected Vibes:</strong>{" "}
              {selectedInterests.length > 0
                ? selectedInterests.map((id) => INTERESTS.find((i) => i.id === id)?.label).join(", ")
                : "Standard Curation"}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
