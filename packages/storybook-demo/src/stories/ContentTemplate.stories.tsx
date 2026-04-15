import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { action } from 'storybook/actions';
import { Button, ContentTemplate } from 'hugo-ui';

const PanelContent = ({ label = 'Content area' }: { label?: string }) => (
  <div style={{ minHeight: 120, color: '#354052' }}>{label}</div>
);

const meta = {
  title: 'HugoUI/Templates/ContentTemplate',
  component: ContentTemplate,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
} satisfies Meta<typeof ContentTemplate>;

export default meta;

type Story = StoryObj;

export const Table: Story = {
  render: () => (
    <ContentTemplate
      type="table"
      pageTitle="Organizations"
      titleInfo="Search, filter, sort, and inspect synthetic organization records."
      actionItems={
        <Button level="primary" colorTheme="purple" size="medium">
          Add
        </Button>
      }
    >
      <PanelContent label="Table content" />
    </ContentTemplate>
  ),
};

export const Card: Story = {
  render: () => (
    <ContentTemplate
      type="card"
      pageTitle="Acme Cloud"
      titleInfo="Organization detail placeholder."
      onBack={action('back')}
    >
      <PanelContent label="Detail content" />
    </ContentTemplate>
  ),
};

export const Error: Story = {
  render: () => (
    <ContentTemplate
      type="error"
      pageTitle="Page not found"
      errorMessage="The requested route does not exist."
      onBack={action('back')}
    />
  ),
};

export const Full: Story = {
  render: () => (
    <ContentTemplate type="full" pageTitle="Full width page">
      <PanelContent label="Unframed content" />
    </ContentTemplate>
  ),
};
