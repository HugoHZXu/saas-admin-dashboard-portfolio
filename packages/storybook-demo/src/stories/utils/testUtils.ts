// https://github.com/storybookjs/storybook/issues/18258
export const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
