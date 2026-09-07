"use client";

import HotlineButton from "./HotlineButton";
import FormInput from "./FormInput";
import FormTextarea from "./FormTextarea";
import VietnamFlag from "./VietnamFlag";
import { useConsultationForm, ConsultationFormData } from "./useConsultationForm";

interface BookConsultationFormProps {
  onCancel?: () => void;
  onSubmit?: (data: ConsultationFormData) => void;
}

export default function BookConsultationForm({
  onCancel,
  onSubmit,
}: BookConsultationFormProps) {
  const { formData, errors, isSubmitting, setField, handleSubmit } =
    useConsultationForm({ onSubmit });

  return (
    <div className="flex flex-col gap-5 w-full">
      {/* Hotline CTA */}
      <div className="flex flex-col gap-2">
        <p className="text-center text-sm text-gray-500">
          Please call our hotline should you have any questions
          <br />
          or require assistance:
        </p>
        <HotlineButton phone="02877778989" />
      </div>

      {/* Full Name */}
      <FormInput
        label="Full Name"
        required
        type="text"
        placeholder="Type your full name"
        value={formData.fullName}
        error={errors.fullName}
        onChange={(e) => setField("fullName", e.target.value)}
      />

      {/* Phone Number */}
      <FormInput
        label="Phone Number"
        required
        type="tel"
        placeholder="Enter your phone number"
        value={formData.phoneNumber}
        error={errors.phoneNumber}
        prefix={
          <div className="flex items-center gap-1.5">
            <VietnamFlag />
            <span className="text-sm text-gray-600 font-medium">+84</span>
          </div>
        }
        onChange={(e) => setField("phoneNumber", e.target.value)}
      />

      {/* Notes */}
      <FormTextarea
        label="Notes"
        placeholder="Type here"
        value={formData.notes}
        onChange={(e) => setField("notes", e.target.value)}
      />

      {/* Action Buttons */}
      <div className="flex gap-3 pt-1">
        <button
          onClick={onCancel}
          className="flex-1 py-3 px-6 rounded-full border-2 border-gray-200 text-gray-600 font-semibold text-sm transition-all hover:border-gray-300 hover:bg-gray-50 active:scale-[0.98]"
        >
          Cancel
        </button>
        <button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="flex-1 py-3 px-6 rounded-full font-semibold text-sm text-white transition-all hover:opacity-90 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed"
          style={{ backgroundColor: "#1a1a5e" }}
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Sending...
            </span>
          ) : (
            "Send"
          )}
        </button>
      </div>
    </div>
  );
}
