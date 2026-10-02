import type { Meta, StoryObj } from "@storybook/react";
import { TextField } from "../src";

const meta: Meta<typeof TextField> = { title: "Components/TextField", component: TextField, args: { label: "Email" } };
export default meta;
type S = StoryObj<typeof TextField>;

export const Default: S = {};
export const WithHint: S = { args: { hint: "We never share your email." } };
export const WithError: S = { args: { error: "Enter a valid email address.", defaultValue: "pawan@" } };
