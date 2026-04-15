import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import FilterListIcon from '@mui/icons-material/FilterList';
import SearchIcon from '@mui/icons-material/Search';
import Box from '@mui/material/Box';
import { expect, userEvent, within } from 'storybook/test';
import { Toggle, ToggleOption } from 'hugo-ui';

type Mode = 'search' | 'filter';

const modeOptions: ToggleOption<Mode>[] = [
  { value: 'search', label: 'Search', icon: <SearchIcon /> },
  { value: 'filter', label: 'Filter', icon: <FilterListIcon /> },
];

const meta = {
  title: 'HugoUI/Molecules/Toggle',
  component: Toggle,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
} satisfies Meta<typeof Toggle>;

export default meta;

type Story = StoryObj<typeof Toggle>;

export const Basic: Story = {
  render: function BasicToggle() {
    const [value, setValue] = useState<Mode>('search');

    return (
      <Box sx={{ display: 'flex', padding: 3, background: (theme) => theme.hugoUIColorRoles.surface.subtle }}>
        <Toggle ariaLabel="Table control mode" value={value} options={modeOptions} onChange={setValue} />
      </Box>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button', { name: 'Filter' }));
    await expect(canvas.getByRole('button', { name: 'Filter' })).toHaveAttribute('aria-pressed', 'true');
  },
};

export const DisabledOption: Story = {
  render: function DisabledToggleOption() {
    const [value, setValue] = useState<Mode>('search');
    const options: ToggleOption<Mode>[] = [
      { value: 'search', label: 'Search', icon: <SearchIcon /> },
      { value: 'filter', label: 'Filter', icon: <FilterListIcon />, disabled: true },
    ];

    return (
      <Box sx={{ display: 'flex', padding: 3, background: (theme) => theme.hugoUIColorRoles.surface.subtle }}>
        <Toggle ariaLabel="Table control mode" value={value} options={options} onChange={setValue} />
      </Box>
    );
  },
};
