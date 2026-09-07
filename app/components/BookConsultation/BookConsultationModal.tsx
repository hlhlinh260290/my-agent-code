"use client";

import BookConsultationForm from "./BookConsultationForm";

interface BookConsultationModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  onSubmit?: (data: { fullName: string; phoneNumber: string; notes: string }) => void;
}

export default function BookConsultationModal({
  isOpen = true,
  onClose,
  onSubmit,
}: BookConsultationModalProps) {
  if (!isOpen) return null;

  return (
    /* Backdrop */
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: "rgba(0,0,0,0.45)" }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose?.();
      }}
    >
      {/* Modal card */}
      <div
        className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden"
        style={{ border: "2px solid #f97316" }}
      >
        {/* Close button */}
        {onClose && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        )}

        {/* Content */}
        <div className="p-6 pt-8">
          {/* Title */}
          <h2
            className="text-2xl font-extrabold text-center mb-6"
            style={{ color: "#1a1a5e" }}
          >
            Book Free Consultation
          </h2>

          <BookConsultationForm
            onCancel={onClose}
            onSubmit={onSubmit}
          />
        </div>
      </div>
    </div>
  );
}
