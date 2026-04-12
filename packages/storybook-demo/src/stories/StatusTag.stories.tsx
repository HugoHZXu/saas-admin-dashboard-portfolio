import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Box from '@mui/material/Box';
import { StatusTag, StatusTagTone } from 'hugo-ui';

const tones: Array<{ tone: StatusTagTone; label: string }> = [
  { tone: 'success', label: 'Active' },
  { tone: 'warning', label: 'Paused' },
  { tone: 'neutral', label: 'Archived' },
  { tone: 'danger', label: 'Failed' },
  { tone: 'info', label: 'Invited' },
];

const meta = {
  title: 'HugoUI/Atoms/StatusTag',
  component: StatusTag,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
} satisfies Meta<typeof StatusTag>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    children: 'Active',
    tone: 'success',
  },
};

export const Tones: Story = {
  args: {
    children: 'Active',
  },
  render: () => (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5 }}>
      {tones.map(({ tone, label }) => (
        <StatusTag key={tone} tone={tone}>
          {label}
        </StatusTag>
      ))}
    </Box>
  ),
};
