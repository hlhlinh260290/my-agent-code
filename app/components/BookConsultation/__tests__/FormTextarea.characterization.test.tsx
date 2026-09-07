/**
 * CHARACTERIZATION TESTS — FormTextarea
 * Chốt hành vi trước khi áp dụng InputLabel.
 */

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import FormTextarea from "../FormTextarea";

describe("label", () => {
  it("renders label text", () => {
    render(<FormTextarea label="Notes" />);
    expect(screen.getByText("Notes")).toBeInTheDocument();
  });

  it("no asterisk when required omitted", () => {
    render(<FormTextarea label="Notes" />);
    expect(screen.queryByText("*")).not.toBeInTheDocument();
  });

  it("asterisk when required=true", () => {
    render(<FormTextarea label="Notes" required />);
    expect(screen.getByText("*")).toBeInTheDocument();
    expect(screen.getByText("*")).toHaveClass("text-red-500");
  });
});

describe("textarea element", () => {
  it("renders a <textarea>", () => {
    const { container } = render(<FormTextarea label="Notes" />);
    expect(container.querySelector("textarea")).toBeInTheDocument();
  });

  it("default rows=4", () => {
    const { container } = render(<FormTextarea label="Notes" />);
    expect(container.querySelector("textarea")).toHaveAttribute("rows", "4");
  });

  it("forwards placeholder", () => {
    render(<FormTextarea label="Notes" placeholder="Type here" />);
    expect(screen.getByPlaceholderText("Type here")).toBeInTheDocument();
  });

  it("forwards value and onChange (controlled)", () => {
    const onChange = vi.fn();
    render(<FormTextarea label="Notes" value="hello" onChange={onChange} />);
    const ta = screen.getByRole("textbox") as HTMLTextAreaElement;
    expect(ta.value).toBe("hello");
  });

  it("calls onChange when user types", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<FormTextarea label="Notes" defaultValue="" onChange={onChange} />);
    await user.type(screen.getByRole("textbox"), "X");
    expect(onChange).toHaveBeenCalled();
  });
});

describe("error state", () => {
  it("renders error message when error provided", () => {
    render(<FormTextarea label="Notes" error="Required" />);
    expect(screen.getByText("Required")).toBeInTheDocument();
  });

  it("no error paragraph when error omitted", () => {
    render(<FormTextarea label="Notes" />);
    expect(screen.queryByText(/required/i)).not.toBeInTheDocument();
  });

  it("border-red-400 when error (nhánh B1)", () => {
    const { container } = render(<FormTextarea label="Notes" error="Err" />);
    expect(container.querySelector("textarea")).toHaveClass("border-red-400");
  });

  it("border-gray-200 when no error (nhánh B2)", () => {
    const { container } = render(<FormTextarea label="Notes" />);
    expect(container.querySelector("textarea")).toHaveClass("border-gray-200");
  });

  it("error text has text-red-500 class", () => {
    render(<FormTextarea label="Notes" error="Oops" />);
    expect(screen.getByText("Oops")).toHaveClass("text-red-500");
  });
});
