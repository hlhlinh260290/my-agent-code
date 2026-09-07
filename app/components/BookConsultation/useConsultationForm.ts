"use client";

import { useState } from "react";

export interface ConsultationFormData {
  fullName: string;
  phoneNumber: string;
  notes: string;
}

export interface ConsultationFormErrors {
  fullName?: string;
  phoneNumber?: string;
}

interface UseConsultationFormOptions {
  onSubmit?: (data: ConsultationFormData) => void;
}

/**
 * Custom hook tách logic state + validate + submit
 * ra khỏi BookConsultationForm.
 *
 * Quy tắc validate (chốt từ characterization):
 *  - fullName: required (trim)
 *  - phoneNumber: required (trim) + /^\d{9,11}$/ sau khi bỏ spaces
 */
export function useConsultationForm({ onSubmit }: UseConsultationFormOptions = {}) {
  const [formData, setFormData] = useState<ConsultationFormData>({
    fullName: "",
    phoneNumber: "",
    notes: "",
  });
  const [errors, setErrors] = useState<ConsultationFormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const setField = <K extends keyof ConsultationFormData>(
    field: K,
    value: ConsultationFormData[K]
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const validate = (): boolean => {
    const newErrors: ConsultationFormErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }
    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = "Phone number is required";
    } else if (!/^\d{9,11}$/.test(formData.phoneNumber.replace(/\s/g, ""))) {
      newErrors.phoneNumber = "Please enter a valid phone number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    setIsSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSubmitting(false);

    onSubmit?.(formData);
  };

  return {
    formData,
    errors,
    isSubmitting,
    setField,
    handleSubmit,
  };
}
