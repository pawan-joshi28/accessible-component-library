import type { Meta, StoryObj } from "@storybook/react";
import { Tabs } from "../src";

const meta: Meta<typeof Tabs> = { title: "Components/Tabs", component: Tabs };
export default meta;

export const Default: StoryObj<typeof Tabs> = {
  args: {
    label: "Account settings",
    items: [
      { id: "profile", label: "Profile", content: "Profile settings. Use the arrow keys to move between tabs." },
      { id: "security", label: "Security", content: "Security settings." },
      { id: "billing", label: "Billing", content: "Billing settings." },
    ],
  },
};
