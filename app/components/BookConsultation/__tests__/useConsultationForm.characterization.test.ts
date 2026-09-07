/**
 * CHARACTERIZATION TESTS — useConsultationForm
 *
 * Test logic validate/state isolate khỏi UI — đây là lợi ích chính
 * của việc tách custom hook.
 */

import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { useConsultationForm } from "../useConsultationForm";

describe("initial state", () => {
  it("starts with empty fields", () => {
    const { result } = renderHook(() => useConsultationForm());
    expect(result.current.formData).toEqual({
      fullName: "",
      phoneNumber: "",
      notes: "",
    });
  });

  it("starts with no errors", () => {
    const { result } = renderHook(() => useConsultationForm());
    expect(result.current.errors).toEqual({});
  });

  it("starts with isSubmitting=false", () => {
    const { result } = renderHook(() => useConsultationForm());
    expect(result.current.isSubmitting).toBe(false);
  });
});

describe("setField", () => {
  it("updates fullName field", () => {
    const { result } = renderHook(() => useConsultationForm());
    act(() => { result.current.setField("fullName", "Nguyen Van A"); });
    expect(result.current.formData.fullName).toBe("Nguyen Van A");
  });

  it("updates phoneNumber field", () => {
    const { result } = renderHook(() => useConsultationForm());
    act(() => { result.current.setField("phoneNumber", "912345678"); });
    expect(result.current.formData.phoneNumber).toBe("912345678");
  });

  it("updates notes field", () => {
    const { result } = renderHook(() => useConsultationForm());
    act(() => { result.current.setField("notes", "Ghi chú"); });
    expect(result.current.formData.notes).toBe("Ghi chú");
  });
});

describe("validate — fullName", () => {
  it("sets fullName error when fullName is empty string", async () => {
    const { result } = renderHook(() => useConsultationForm());
    await act(async () => { await result.current.handleSubmit(); });
    expect(result.current.errors.fullName).toBe("Full name is required");
  });

  it("sets fullName error when fullName is whitespace-only", async () => {
    const { result } = renderHook(() => useConsultationForm());
    act(() => { result.current.setField("fullName", "   "); });
    await act(async () => { await result.current.handleSubmit(); });
    expect(result.current.errors.fullName).toBe("Full name is required");
  });

  it("no fullName error when fullName has content", async () => {
    const { result } = renderHook(() => useConsultationForm());
    act(() => {
      result.current.setField("fullName", "An");
      result.current.setField("phoneNumber", "912345678");
    });
    await act(async () => { await result.current.handleSubmit(); });
    expect(result.current.errors.fullName).toBeUndefined();
  });
});

describe("validate — phoneNumber", () => {
  it("sets phoneNumber error when phoneNumber is empty", async () => {
    const { result } = renderHook(() => useConsultationForm());
    act(() => { result.current.setField("fullName", "An"); });
    await act(async () => { await result.current.handleSubmit(); });
    expect(result.current.errors.phoneNumber).toBe("Phone number is required");
  });

  it("sets invalid error for too-short number (7 digits)", async () => {
    const { result } = renderHook(() => useConsultationForm());
    act(() => {
      result.current.setField("fullName", "An");
      result.current.setField("phoneNumber", "1234567"); // 7 digits < 9
    });
    await act(async () => { await result.current.handleSubmit(); });
    expect(result.current.errors.phoneNumber).toBe("Please enter a valid phone number");
  });

  it("accepts 9-digit number (min valid)", async () => {
    const onSubmit = vi.fn();
    const { result } = renderHook(() => useConsultationForm({ onSubmit }));
    act(() => {
      result.current.setField("fullName", "An");
      result.current.setField("phoneNumber", "912345678"); // 9 digits
    });
    await act(async () => { await result.current.handleSubmit(); });
    expect(result.current.errors.phoneNumber).toBeUndefined();
  });

  it("accepts 11-digit number (max valid)", async () => {
    const onSubmit = vi.fn();
    const { result } = renderHook(() => useConsultationForm({ onSubmit }));
    act(() => {
      result.current.setField("fullName", "An");
      result.current.setField("phoneNumber", "01234567890"); // 11 digits
    });
    await act(async () => { await result.current.handleSubmit(); });
    expect(result.current.errors.phoneNumber).toBeUndefined();
  });

  it("rejects 12-digit number (too long)", async () => {
    const { result } = renderHook(() => useConsultationForm());
    act(() => {
      result.current.setField("fullName", "An");
      result.current.setField("phoneNumber", "012345678901"); // 12 digits > 11
    });
    await act(async () => { await result.current.handleSubmit(); });
    expect(result.current.errors.phoneNumber).toBe("Please enter a valid phone number");
  });

  it("ignores spaces when validating phone (912 345 678 → valid)", async () => {
    const onSubmit = vi.fn();
    const { result } = renderHook(() => useConsultationForm({ onSubmit }));
    act(() => {
      result.current.setField("fullName", "An");
      result.current.setField("phoneNumber", "912 345 678"); // 9 digits with spaces
    });
    await act(async () => { await result.current.handleSubmit(); });
    expect(result.current.errors.phoneNumber).toBeUndefined();
  });

  it("rejects non-numeric characters", async () => {
    const { result } = renderHook(() => useConsultationForm());
    act(() => {
      result.current.setField("fullName", "An");
      result.current.setField("phoneNumber", "abc123456");
    });
    await act(async () => { await result.current.handleSubmit(); });
    expect(result.current.errors.phoneNumber).toBe("Please enter a valid phone number");
  });
});

describe("handleSubmit — onSubmit callback", () => {
  it("calls onSubmit with correct formData when valid", async () => {
    const onSubmit = vi.fn();
    const { result } = renderHook(() => useConsultationForm({ onSubmit }));
    act(() => {
      result.current.setField("fullName", "Nguyen Van A");
      result.current.setField("phoneNumber", "912345678");
      result.current.setField("notes", "Ghi chú");
    });
    await act(async () => { await result.current.handleSubmit(); });
    expect(onSubmit).toHaveBeenCalledOnce();
    expect(onSubmit).toHaveBeenCalledWith({
      fullName: "Nguyen Van A",
      phoneNumber: "912345678",
      notes: "Ghi chú",
    });
  });

  it("does NOT call onSubmit when validation fails", async () => {
    const onSubmit = vi.fn();
    const { result } = renderHook(() => useConsultationForm({ onSubmit }));
    // fullName empty → validate fails
    await act(async () => { await result.current.handleSubmit(); });
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it("works without onSubmit callback (no crash)", async () => {
    const { result } = renderHook(() => useConsultationForm());
    act(() => {
      result.current.setField("fullName", "An");
      result.current.setField("phoneNumber", "912345678");
    });
    await expect(
      act(async () => { await result.current.handleSubmit(); })
    ).resolves.not.toThrow();
  });
});
