import type { Meta, StoryObj } from '@storybook/react';
import { Search, Star } from 'lucide-react';
import { Input } from 'hugo-ui-shadcn';

const meta = {
  title: 'Hugo UI Shadcn/Atoms/Input',
  component: Input,
  tags: ['autodocs'],
  args: {
    label: 'Label',
    description: 'Helper text',
    placeholder: '',
    value: '',
    status: 'default',
    disabled: false,
    as: 'input',
    size: 'default',
    required: false,
    showCharacterCount: true,
    loading: false,
  },
  argTypes: {
    status: {
      control: { type: 'radio' as const },
      options: ['default', 'success', 'error'],
    },
    as: {
      control: { type: 'radio' as const },
      options: ['input', 'textarea'],
    },
    size: {
      control: { type: 'radio' as const },
      options: ['default', 'sm'],
    },
    startIcon: {
      control: false,
    },
    endIcon: {
      control: false,
    },
    slotProps: {
      control: false,
    },
    classNames: {
      control: false,
    },
  },
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Input>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {};

export const Status: Story = {
  render: (args) => (
    <div className="flex w-[260px] flex-col gap-4">
      <Input {...args} label="Success" message="Success message" status="success" />
      <Input {...args} label="Error" message="Error message" status="error" />
      <Input {...args} label="Loading" loading />
      <Input {...args} disabled label="Disabled" />
    </div>
  ),
};

export const Small: Story = {
  render: (args) => (
    <div className="flex w-[260px] flex-col gap-4">
      <Input {...args} label="Small success" size="sm" status="success" />
      <Input {...args} label="Small error" size="sm" status="error" />
      <Input {...args} label="Small loading" loading size="sm" />
    </div>
  ),
};

export const Textarea: Story = {
  args: {
    as: 'textarea',
    label: 'Description',
    value: 'A short organization note.',
  },
};

export const Required: Story = {
  args: {
    label: 'Organization name',
    required: true,
  },
};

export const SearchPlaceholder: Story = {
  args: {
    name: 'search',
    label: 'Search organizations',
    startIcon: <Search size={18} />,
  },
};

export const CustomIcon: Story = {
  args: {
    label: 'Workspace',
    endIcon: <Star size={18} />,
  },
};
