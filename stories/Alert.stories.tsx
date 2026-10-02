import type { Meta, StoryObj } from "@storybook/react";
import { Alert } from "../src";

const meta: Meta<typeof Alert> = { title: "Components/Alert", component: Alert, args: { children: "Your changes were saved." } };
export default meta;
type S = StoryObj<typeof Alert>;

export const Info: S = {};
export const Success: S = { args: { tone: "success" } };
export const Failure: S = { args: { tone: "error", children: "Something went wrong." } };
