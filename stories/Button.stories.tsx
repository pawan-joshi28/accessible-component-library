import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "../src";

const meta: Meta<typeof Button> = { title: "Components/Button", component: Button, args: { children: "Save changes" } };
export default meta;
type S = StoryObj<typeof Button>;

export const Primary: S = {};
export const Secondary: S = { args: { variant: "secondary" } };
export const Danger: S = { args: { variant: "danger", children: "Delete" } };
export const Disabled: S = { args: { disabled: true } };
