import type { Meta, StoryObj } from '@storybook/react';
import { CheckCircle2, X } from 'lucide-react';
import { Button } from 'hugo-ui-shadcn';

const buttonRowStyle = {
  alignItems: 'center',
  columnGap: 16,
  display: 'flex',
  flexWrap: 'wrap',
  rowGap: 12,
} as const;

const meta = {
  title: 'Hugo UI Shadcn/Atoms/Button',
  component: Button,
  tags: ['autodocs'],
  args: {
    children: 'Button',
    variant: 'solid',
    tone: 'brand',
    size: 'default',
    loading: false,
    loadingPosition: 'start',
    disabled: false,
  },
  argTypes: {
    variant: {
      control: { type: 'select' as const },
      options: ['solid', 'outline', 'ghost'],
    },
    tone: {
      control: { type: 'select' as const },
      options: ['brand', 'neutral', 'danger', 'inverse'],
    },
    size: {
      control: { type: 'select' as const },
      options: ['sm', 'default', 'lg', 'icon'],
    },
    loadingPosition: {
      control: { type: 'select' as const },
      options: ['start', 'center'],
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

export const Primary: Story = {};

export const Variants: Story = {
  render: ({ children: _children, ...args }) => (
    <div style={buttonRowStyle}>
      <Button {...args} tone="brand" variant="solid">
        Solid
      </Button>
      <Button {...args} tone="brand" variant="outline">
        Outline
      </Button>
      <Button {...args} tone="brand" variant="ghost">
        Ghost
      </Button>
    </div>
  ),
};

export const Sizes: Story = {
  render: ({ children: _children, ...args }) => (
    <div style={buttonRowStyle}>
      <Button {...args} size="lg">
        Large
      </Button>
      <Button {...args} size="default">
        Default
      </Button>
      <Button {...args} size="sm">
        Small
      </Button>
    </div>
  ),
};

export const Status: Story = {
  render: ({ children: _children, ...args }) => (
    <div style={buttonRowStyle}>
      <Button {...args}>Rest</Button>
      <Button {...args} loading>
        Loading
      </Button>
      <Button {...args} loading loadingPosition="center">
        Center loading
      </Button>
      <Button {...args} disabled>
        Disabled
      </Button>
    </div>
  ),
};

export const Icons: Story = {
  render: ({ children: _children, ...args }) => (
    <div style={buttonRowStyle}>
      <Button {...args}>
        <CheckCircle2 />
        Completed
      </Button>
      <Button {...args}>
        Close
        <X />
      </Button>
      <Button {...args} aria-label="Completed" size="icon">
        <CheckCircle2 />
      </Button>
    </div>
  ),
};

export const Destructive: Story = {
  args: {
    tone: 'danger',
    children: 'Delete project',
  },
};

export const OnDark: Story = {
  parameters: {
    backgrounds: {
      default: 'dark',
      values: [{ name: 'dark', value: '#444' }],
    },
  },
  render: ({ children: _children, ...args }) => (
    <div style={buttonRowStyle}>
      <Button {...args} tone="inverse" variant="solid">
        Solid
      </Button>
      <Button {...args} tone="inverse" variant="outline">
        Outline
      </Button>
      <Button {...args} tone="inverse" variant="ghost">
        Ghost
      </Button>
    </div>
  ),
};
