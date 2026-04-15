import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Box from '@mui/material/Box';
import { action } from 'storybook/actions';
import { expect, userEvent, within } from 'storybook/test';
import { SearchBox } from 'hugo-ui';

const SearchBoxPreview = ({ children }: { children: React.ReactNode }) => (
  <Box
    sx={{
      width: 'min(100%, 480px)',
      padding: 3,
      background: (theme) => theme.hugoUIColorRoles.surface.subtle,
    }}
  >
    {children}
  </Box>
);

const meta = {
  title: 'HugoUI/Molecules/SearchBox',
  component: SearchBox,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
} satisfies Meta<typeof SearchBox>;

export default meta;

type Story = StoryObj<typeof SearchBox>;

export const Basic: Story = {
  render: function BasicSearchBox() {
    const [value, setValue] = useState('');

    return (
      <SearchBoxPreview>
        <SearchBox
          aria-label="Search organizations"
          placeholder="Search organizations"
          value={value}
          onChange={setValue}
          onSearch={action('search submitted')}
        />
      </SearchBoxPreview>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.type(canvas.getByRole('searchbox', { name: 'Search organizations' }), 'Acme');
    await expect(canvas.getByRole('button', { name: 'Search' })).toBeEnabled();
  },
};

export const WithValue: Story = {
  render: function SearchBoxWithValue() {
    const [value, setValue] = useState('Northstar');

    return (
      <SearchBoxPreview>
        <SearchBox
          aria-label="Search organizations"
          placeholder="Search organizations"
          value={value}
          onChange={setValue}
          onSearch={action('search submitted')}
        />
      </SearchBoxPreview>
    );
  },
};

export const Loading: Story = {
  render: () => (
    <SearchBoxPreview>
      <SearchBox
        aria-label="Search organizations"
        placeholder="Search organizations"
        value="Vertex"
        onChange={action('search changed')}
        onSearch={action('search submitted')}
        loading
      />
    </SearchBoxPreview>
  ),
};

export const Disabled: Story = {
  render: () => (
    <SearchBoxPreview>
      <SearchBox
        aria-label="Search organizations"
        placeholder="Search organizations"
        value="Archived"
        onChange={action('search changed')}
        disabled
      />
    </SearchBoxPreview>
  ),
};
