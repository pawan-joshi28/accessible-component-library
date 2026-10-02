import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";
import { useState } from "react";
import { Alert, Button, Modal, Tabs, TextField } from "../src";

describe("accessibility (axe)", () => {
  it("has no violations for the core components", async () => {
    const { container } = render(
      <main>
        <Button>Save</Button>
        <TextField label="Email" hint="Work email" error="Invalid" />
        <Alert tone="error">Failed</Alert>
        <Tabs label="Demo" items={[{ id: "a", label: "A", content: "a" }, { id: "b", label: "B", content: "b" }]} />
      </main>
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});

describe("TextField", () => {
  it("links label, hint and error to the input", () => {
    render(<TextField label="Email" hint="Hint" error="Bad" />);
    const input = screen.getByLabelText("Email");
    expect(input).toHaveAttribute("aria-invalid", "true");
    expect(input).toHaveAccessibleDescription("Hint Bad");
  });
});

describe("Tabs", () => {
  it("supports arrow, Home and End keys with roving tabindex", async () => {
    const user = userEvent.setup();
    render(<Tabs label="t" items={[{ id: "a", label: "A", content: "pa" }, { id: "b", label: "B", content: "pb" }, { id: "c", label: "C", content: "pc" }]} />);
    const [a, b, c] = screen.getAllByRole("tab");
    a.focus();
    await user.keyboard("{ArrowRight}");
    expect(b).toHaveFocus();
    expect(b).toHaveAttribute("aria-selected", "true");
    expect(a).toHaveAttribute("tabindex", "-1");
    await user.keyboard("{End}");
    expect(c).toHaveFocus();
    await user.keyboard("{ArrowRight}");
    expect(a).toHaveFocus();
    expect(screen.getByRole("tabpanel")).toHaveTextContent("pa");
  });
});

describe("Modal", () => {
  function Demo() {
    const [open, setOpen] = useState(false);
    return (
      <>
        <button onClick={() => setOpen(true)}>open</button>
        <Modal open={open} title="Title" onClose={() => setOpen(false)}>
          <button>inside</button>
        </Modal>
      </>
    );
  }

  it("traps focus, closes on Escape and restores focus", async () => {
    const user = userEvent.setup();
    render(<Demo />);
    const trigger = screen.getByText("open");
    await user.click(trigger);
    const dialog = screen.getByRole("dialog", { name: "Title" });
    expect(dialog).toBeInTheDocument();

    const close = screen.getByLabelText("Close dialog");
    const inside = screen.getByText("inside");
    expect(close).toHaveFocus();
    await user.tab();
    expect(inside).toHaveFocus();
    await user.tab();
    expect(close).toHaveFocus();
    await user.tab({ shift: true });
    expect(inside).toHaveFocus();

    await user.keyboard("{Escape}");
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(trigger).toHaveFocus();
  });
});
