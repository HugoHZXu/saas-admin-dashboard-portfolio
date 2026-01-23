import type { Meta, StoryObj } from '@storybook/react';
import { DemoButton } from 'hugo-ui';

const meta: Meta<typeof DemoButton> = {
  title: 'Components/DemoButton',
  component: DemoButton,
  args: {
    label: 'Hello HugoUI',
  },
};

export default meta;

type Story = StoryObj<typeof DemoButton>;

export const Primary: Story = {};
