import type { Meta, StoryObj } from '@storybook/react';
import { Button } from 'myshadcn';

const meta = {
  title: 'Shadcn/Atoms/Button',
  component: Button,
  tags: ['autodocs'],
  args: {},
  argTypes: {
    variant: {
      control: { type: 'select' as const },
      options: ['default', 'secondary', 'outline', 'ghost', 'destructive'],
    },
    size: {
      control: { type: 'select' as const },
      options: ['default', 'sm', 'lg', 'icon'],
    },
    className: {
      control: { type: 'text' as const },
    },
    onClick: {
      action: 'clicked',
    },
  },
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-2 md:flex-row">
      <Button variant="outline" size="lg">
        Button
      </Button>
    </div>
  ),
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Secondary action',
  },
};

export const Outline: Story = {
  args: {
    variant: 'outline',
    children: 'Review settings',
  },
};

export const Destructive: Story = {
  args: {
    variant: 'destructive',
    children: 'Delete project',
  },
};

export const IconOnly: Story = {
  args: {
    size: 'icon',
    'aria-label': 'Add item',
    children: '+',
  },
};
