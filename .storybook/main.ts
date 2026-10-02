import type { StorybookConfig } from "@storybook/react-webpack5";

const config: StorybookConfig = {
  stories: ["../stories/**/*.stories.tsx"],
  addons: ["@storybook/addon-webpack5-compiler-swc", "@storybook/addon-essentials", "@storybook/addon-a11y"],
  framework: { name: "@storybook/react-webpack5", options: {} },
  typescript: { check: false },
};
export default config;
