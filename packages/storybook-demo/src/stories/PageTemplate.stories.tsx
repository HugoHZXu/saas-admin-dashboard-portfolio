import React from 'react';
import BusinessIcon from '@mui/icons-material/Business';
import HistoryIcon from '@mui/icons-material/History';
import SettingsIcon from '@mui/icons-material/Settings';
import type { Meta, StoryObj } from '@storybook/react';
import { action } from 'storybook/actions';
import { PageTemplate, PageTemplateNavItem } from 'hugo-ui';

const navItems: PageTemplateNavItem[] = [
  {
    id: 'organizations',
    label: 'Organizations',
    icon: <BusinessIcon fontSize="small" />,
    children: [
      {
        id: 'activityLog',
        label: 'Activity Log',
        icon: <HistoryIcon fontSize="small" />,
      },
    ],
  },
];

const DemoContent = () => (
  <div
    style={{
      minHeight: 280,
      border: '1px solid #d5d7de',
      borderRadius: 8,
      background: '#fff',
      padding: 24,
    }}
  >
    Dashboard content
  </div>
);

const meta = {
  title: 'HugoUI/Templates/PageTemplate',
  component: PageTemplate,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof PageTemplate>;

export default meta;

type Story = StoryObj;

export const WithoutNavigation: Story = {
  render: () => (
    <PageTemplate appTitle="Organization Management" appIcon={<BusinessIcon />}>
      <DemoContent />
    </PageTemplate>
  ),
};

export const WithNavigation: Story = {
  render: () => (
    <PageTemplate
      appTitle="Organization Management"
      appIcon={<BusinessIcon />}
      titleSlot={<SettingsIcon fontSize="small" />}
      navProps={{
        navItems,
        defaultSelected: 'organizations',
        defaultExpanded: ['organizations'],
        onBeforeSelection: (selection, onSelection) => {
          action('nav selected')(selection);
          onSelection();
        },
      }}
    >
      <DemoContent />
    </PageTemplate>
  ),
};

export const ChildSelected: Story = {
  render: () => (
    <PageTemplate
      appTitle="Organization Management"
      appIcon={<BusinessIcon />}
      navProps={{
        navItems,
        defaultSelected: 'activityLog',
        defaultExpanded: ['organizations'],
        onBeforeSelection: (selection, onSelection) => {
          action('nav selected')(selection);
          onSelection();
        },
      }}
    >
      <DemoContent />
    </PageTemplate>
  ),
};

export const MobileWidth: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
  render: () => (
    <PageTemplate
      appTitle="Organization Management"
      appIcon={<BusinessIcon />}
      navProps={{
        navItems,
        defaultSelected: 'activityLog',
        defaultExpanded: ['organizations'],
      }}
    >
      <DemoContent />
    </PageTemplate>
  ),
};
