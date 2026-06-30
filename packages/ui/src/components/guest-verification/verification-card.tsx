import * as React from "react";
import { IconChevronRight, IconShieldCheck, IconPhone, IconMapPin } from "@tabler/icons-react";
import { clsx } from "clsx";

interface VerificationCardProps {
  onVerify: (phone: string, zip: string) => void;
  className?: string;
}

export function VerificationCard({ onVerify, className }: VerificationCardProps) {
  const [phone, setPhone] = React.useState("");
  const [zip, setZip] = React.useState("");
  const [errors, setErrors] = React.useState<{ phone?: string; zip?: string }>({});

  // Strict US-only 10-digit phone masking: (XXX) XXX-XXXX
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let input = e.target.value.replace(/\D/g, "");
    if (input.length > 10) {
      input = input.substring(0, 10);
    }
    
    // Apply masking
    let formatted = "";
    if (input.length > 0) {
      formatted = "(" + input.substring(0, 3);
      if (input.length > 3) {
        formatted += ") " + input.substring(3, 6);
      }
      if (input.length > 6) {
        formatted += "-" + input.substring(6, 10);
      }
    }
    setPhone(formatted);
    
    // Clear errors as user types
    if (errors.phone) {
      setErrors((prev) => ({ ...prev, phone: undefined }));
    }
  };

  // US-only ZIP validation: 5-digit or 9-digit (XXXXX or XXXXX-XXXX)
  const handleZipChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let input = e.target.value.replace(/[^0-9-]/g, ""); // Allow only digits and hyphen
    // Strip double hyphens or bad formatting
    if (input.includes("-")) {
      const parts = input.split("-");
      input = parts[0].substring(0, 5) + (parts[1] ? "-" + parts[1].substring(0, 4) : "-");
    } else if (input.length > 5) {
      // Auto-insert hyphen for 9-digit zip
      input = input.substring(0, 5) + "-" + input.substring(5, 9);
    } else {
      input = input.substring(0, 5);
    }
    setZip(input);

    if (errors.zip) {
      setErrors((prev) => ({ ...prev, zip: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { phone?: string; zip?: string } = {};

    // Validate 10-digit phone
    const cleanPhone = phone.replace(/\D/g, "");
    if (cleanPhone.length !== 10) {
      newErrors.phone = "Please enter a valid 10-digit US phone number.";
    }

    // Validate 5 or 9-digit ZIP code
    const cleanZip = zip.replace(/-/g, "");
    if (cleanZip.length !== 5 && cleanZip.length !== 9) {
      newErrors.zip = "Please enter a valid 5 or 9-digit US ZIP code.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onVerify(phone, zip);
  };

  return (
    <div
      className={clsx(
        "theme-concierge w-full max-w-md p-6 bg-[#fdfbf7] rounded-[16px] shadow-[0_8px_30px_rgb(170,124,17,0.06)] border border-[#aa7c11]/10 text-slate-800",
        className
      )}
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2.5 bg-[#aa7c11]/10 rounded-full text-[#aa7c11]">
          <IconShieldCheck className="w-6 h-6" aria-hidden="true" />
        </div>
        <div>
          <h2 className="text-xl font-bold tracking-tight text-slate-900 font-serif">
            Guest Verification
          </h2>
          <p className="text-xs text-slate-600 mt-0.5">
            Retrieve your curated arrival journey
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5" noValidate>
        {/* Phone Input Field */}
        <div className="space-y-1.5">
          <label
            htmlFor="phone-input"
            className="block text-xs font-semibold text-slate-700 uppercase tracking-wider"
          >
            US Mobile Number
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
              <IconPhone className="w-4 h-4" aria-hidden="true" />
            </div>
            <input
              type="tel"
              id="phone-input"
              value={phone}
              onChange={handlePhoneChange}
              placeholder="(555) 555-5555"
              aria-invalid={!!errors.phone}
              aria-describedby={errors.phone ? "phone-error" : undefined}
              className={clsx(
                "block w-full pl-9 pr-3 py-3 text-sm bg-white rounded-lg border focus:ring-2 transition-all outline-none",
                errors.phone
                  ? "border-red-500 focus:ring-red-200"
                  : "border-slate-200 focus:border-[#aa7c11] focus:ring-[#aa7c11]/20"
              )}
            />
          </div>
          {errors.phone && (
            <p id="phone-error" role="alert" className="text-xs text-red-600 font-semibold mt-1">
              {errors.phone}
            </p>
          )}
        </div>

        {/* ZIP Input Field */}
        <div className="space-y-1.5">
          <label
            htmlFor="zip-input"
            className="block text-xs font-semibold text-slate-700 uppercase tracking-wider"
          >
            US ZIP Code
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
              <IconMapPin className="w-4 h-4" aria-hidden="true" />
            </div>
            <input
              type="text"
              id="zip-input"
              value={zip}
              onChange={handleZipChange}
              placeholder="12345 or 12345-6789"
              aria-invalid={!!errors.zip}
              aria-describedby={errors.zip ? "zip-error" : undefined}
              className={clsx(
                "block w-full pl-9 pr-3 py-3 text-sm bg-white rounded-lg border focus:ring-2 transition-all outline-none",
                errors.zip
                  ? "border-red-500 focus:ring-red-200"
                  : "border-slate-200 focus:border-[#aa7c11] focus:ring-[#aa7c11]/20"
              )}
            />
          </div>
          {errors.zip && (
            <p id="zip-error" role="alert" className="text-xs text-red-600 font-semibold mt-1">
              {errors.zip}
            </p>
          )}
        </div>

        {/* Verification Button */}
        <button
          type="submit"
          className="w-full mt-2 flex items-center justify-center gap-2 px-5 py-3 text-sm font-bold text-white bg-[#aa7c11] hover:bg-[#91650d] focus:ring-4 focus:ring-[#aa7c11]/30 rounded-lg transition-colors cursor-pointer outline-none shadow-md"
        >
          <span>Verify Reservation</span>
          <IconChevronRight className="w-4 h-4" aria-hidden="true" />
        </button>
      </form>
    </div>
  );
}
