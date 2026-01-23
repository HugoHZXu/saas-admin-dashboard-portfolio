/*
 * © 2023 Promethean. All Rights Reserved.
 *
 * Unauthorized copying of this file or any part of this file
 * via any medium is strictly prohibited.
 */
// https://github.com/storybookjs/storybook/issues/18258
export const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms))
