/**
 * CHARACTERIZATION TESTS — FormInput
 *
 * Mục đích: chốt lại hành vi ĐANG CHẠY THẬT của component trước bất kỳ
 * refactor nào. Mỗi test describe lý do tồn tại của nó trong comment.
 *
 * Quy tắc:
 *  - KHÔNG sửa test để pass; nếu test fail sau refactor → refactor bị sai.
 *  - Thêm test mới để mô tả hành vi bổ sung, không xóa test cũ.
 */

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import FormInput from "../FormInput";

// ─── helpers ────────────────────────────────────────────────────────────────

function renderInput(overrides: Parameters<typeof FormInput>[0] = { label: "Field" }) {
  return render(<FormInput {...overrides} />);
}

// ─── 1. LABEL ────────────────────────────────────────────────────────────────

describe("label", () => {
  it("renders the label text", () => {
    // Đây là hành vi tối thiểu: label luôn xuất hiện.
    renderInput({ label: "Full Name" });
    expect(screen.getByText("Full Name")).toBeInTheDocument();
  });

  it("does NOT render asterisk when required is omitted (default false)", () => {
    // required default là false → dấu * không xuất hiện.
    renderInput({ label: "Field" });
    expect(screen.queryByText("*")).not.toBeInTheDocument();
  });

  it("renders asterisk when required=true", () => {
    // Nhánh A: required=true → <span>*</span> màu đỏ xuất hiện.
    renderInput({ label: "Field", required: true });
    expect(screen.getByText("*")).toBeInTheDocument();
  });

  it("asterisk is visually red (has text-red-500 class)", () => {
    // Chốt màu sắc: class Tailwind cụ thể đang được dùng.
    renderInput({ label: "Field", required: true });
    expect(screen.getByText("*")).toHaveClass("text-red-500");
  });
});

// ─── 2. INPUT ELEMENT ────────────────────────────────────────────────────────

describe("input element", () => {
  it("renders an <input> element", () => {
    // Component luôn render input.
    renderInput({ label: "Field" });
    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  it("forwards placeholder prop to native input", () => {
    renderInput({ label: "Field", placeholder: "Type your full name" });
    expect(screen.getByPlaceholderText("Type your full name")).toBeInTheDocument();
  });

  it("forwards type prop (tel) to native input", () => {
    renderInput({ label: "Field", type: "tel" });
    // type=tel không có role=textbox, dùng querySelector
    const { container } = render(<FormInput label="Field" type="tel" />);
    expect(container.querySelector('input[type="tel"]')).toBeInTheDocument();
  });

  it("forwards value and onChange to native input (controlled)", async () => {
    const onChange = vi.fn();
    renderInput({ label: "Field", value: "hello", onChange, readOnly: true });
    const input = screen.getByRole("textbox") as HTMLInputElement;
    expect(input.value).toBe("hello");
  });

  it("calls onChange when user types", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    renderInput({ label: "Field", defaultValue: "", onChange });
    await user.type(screen.getByRole("textbox"), "A");
    expect(onChange).toHaveBeenCalled();
  });

  it("appends extra className to input element", () => {
    const { container } = render(
      <FormInput label="Field" className="my-custom-class" />
    );
    expect(container.querySelector("input")).toHaveClass("my-custom-class");
  });
});

// ─── 3. PREFIX SLOT ──────────────────────────────────────────────────────────

describe("prefix slot", () => {
  it("renders prefix node when prefix prop is provided", () => {
    // Nhánh C: prefix truthy → slot xuất hiện.
    render(<FormInput label="Phone" prefix={<span>+84</span>} />);
    expect(screen.getByText("+84")).toBeInTheDocument();
  });

  it("does NOT render prefix container when prefix is undefined", () => {
    // Nhánh C: prefix falsy → wrapper div không render.
    const { container } = render(<FormInput label="Field" />);
    // Wrapper prefix có class bg-gray-50 border-r
    expect(container.querySelector(".bg-gray-50.border-r")).not.toBeInTheDocument();
  });

  it("prefix container has border-r to visually separate from input", () => {
    // Chốt styling của prefix wrapper.
    const { container } = render(
      <FormInput label="Phone" prefix={<span>+84</span>} />
    );
    const prefixWrapper = container.querySelector(".border-r");
    expect(prefixWrapper).toBeInTheDocument();
    expect(prefixWrapper).toHaveClass("bg-gray-50");
  });
});

// ─── 4. ERROR STATE ──────────────────────────────────────────────────────────

describe("error state", () => {
  it("renders error message paragraph when error prop is provided", () => {
    // Nhánh D: error truthy → <p> xuất hiện.
    renderInput({ label: "Field", error: "Full name is required" });
    expect(screen.getByText("Full name is required")).toBeInTheDocument();
  });

  it("does NOT render error paragraph when error is undefined", () => {
    // Nhánh D: error falsy → không có text lỗi.
    renderInput({ label: "Field" });
    expect(screen.queryByText(/required/i)).not.toBeInTheDocument();
  });

  it("input wrapper has border-red-400 when error is present (nhánh B1)", () => {
    // Nhánh B1: error → border đỏ trên wrapper.
    const { container } = render(
      <FormInput label="Field" error="Error!" />
    );
    const wrapper = container.querySelector(".border-red-400");
    expect(wrapper).toBeInTheDocument();
  });

  it("input wrapper has border-gray-200 when no error (nhánh B2)", () => {
    // Nhánh B2: no error → border xám mặc định.
    const { container } = render(<FormInput label="Field" />);
    const wrapper = container.querySelector(".border-gray-200");
    expect(wrapper).toBeInTheDocument();
  });

  it("error message has text-red-500 class", () => {
    // Chốt màu sắc error message.
    renderInput({ label: "Field", error: "Something went wrong" });
    expect(screen.getByText("Something went wrong")).toHaveClass("text-red-500");
  });

  it("border changes from gray-200 to red-400 when error is set", () => {
    // Transition giữa 2 nhánh B1/B2 — kiểm tra re-render.
    const { rerender, container } = render(<FormInput label="Field" />);
    expect(container.querySelector(".border-gray-200")).toBeInTheDocument();
    expect(container.querySelector(".border-red-400")).not.toBeInTheDocument();

    rerender(<FormInput label="Field" error="Oops" />);
    expect(container.querySelector(".border-red-400")).toBeInTheDocument();
    expect(container.querySelector(".border-gray-200")).not.toBeInTheDocument();
  });
});

// ─── 5. FOCUS BEHAVIOR ───────────────────────────────────────────────────────

describe("focus behavior", () => {
  it("wrapper has focus-within:ring-2 class for focus ring", () => {
    // Chốt rằng class focus-within tồn tại (dù CSS không chạy trong jsdom).
    const { container } = render(<FormInput label="Field" />);
    // Tìm wrapper div trực tiếp chứa input
    const wrapper = container.querySelector(".focus-within\\:ring-2");
    expect(wrapper).toBeInTheDocument();
  });
});

// ─── 6. STRUCTURE (DOM SHAPE) ────────────────────────────────────────────────

describe("DOM structure", () => {
  it("top-level element is a <div> with flex-col layout", () => {
    const { container } = render(<FormInput label="Field" />);
    const root = container.firstChild as HTMLElement;
    expect(root.tagName).toBe("DIV");
    expect(root).toHaveClass("flex", "flex-col");
  });

  it("label element comes before input wrapper in DOM order", () => {
    const { container } = render(<FormInput label="Field" />);
    const children = Array.from((container.firstChild as HTMLElement).children);
    expect(children[0].tagName).toBe("LABEL");
    expect(children[1].tagName).toBe("DIV"); // wrapper
  });
});
