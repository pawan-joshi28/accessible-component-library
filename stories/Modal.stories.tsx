import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Button, Modal, TextField } from "../src";

const meta: Meta<typeof Modal> = { title: "Components/Modal", component: Modal };
export default meta;

export const Default: StoryObj<typeof Modal> = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>Open dialog</Button>
        <Modal open={open} title="Rename project" onClose={() => setOpen(false)}>
          <TextField label="Project name" />
          <p>Focus is trapped here. Press Escape to close; focus returns to the trigger.</p>
          <Button onClick={() => setOpen(false)}>Done</Button>
        </Modal>
      </>
    );
  },
};
