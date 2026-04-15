import React from 'react';
import BusinessIcon from '@mui/icons-material/Business';
import HistoryIcon from '@mui/icons-material/History';
import { fireEvent, render, screen } from '../utils/testUtils';
import { HugoUIContentTemplate } from './ContentTemplate';
import { HugoUIPageTemplate, HugoUIPageTemplateNavItem } from './PageTemplate';

const navItems: HugoUIPageTemplateNavItem[] = [
  {
    id: 'organizations',
    label: 'Organizations',
    icon: <BusinessIcon />,
    children: [{ id: 'activityLog', label: 'Activity Log', icon: <HistoryIcon /> }],
  },
];

describe('HugoUIPageTemplate', () => {
  it('renders the app title and children', () => {
    render(
      <HugoUIPageTemplate appTitle="Organization Management">
        <div>Dashboard content</div>
      </HugoUIPageTemplate>
    );

    expect(screen.getByRole('heading', { name: 'Organization Management' })).toBeInTheDocument();
    expect(screen.getByText('Dashboard content')).toBeInTheDocument();
  });

  it('marks the selected nav item', () => {
    render(
      <HugoUIPageTemplate
        appTitle="Organization Management"
        navProps={{
          navItems,
          defaultSelected: 'activityLog',
          defaultExpanded: ['organizations'],
        }}
      />
    );

    expect(screen.getByRole('button', { name: 'Activity Log' })).toHaveClass(
      'HugoUIPageTemplate-navItemSelected'
    );
  });

  it('runs navigation selection through onBeforeSelection', () => {
    const onBeforeSelection = jest.fn((_selection: string, onSelection: () => void) => onSelection());

    render(
      <HugoUIPageTemplate
        appTitle="Organization Management"
        navProps={{
          navItems,
          defaultSelected: 'organizations',
          defaultExpanded: ['organizations'],
          onBeforeSelection,
        }}
      />
    );

    fireEvent.click(screen.getByRole('button', { name: 'Activity Log' }));

    expect(onBeforeSelection).toHaveBeenCalledWith('activityLog', expect.any(Function));
    expect(screen.getByRole('button', { name: 'Activity Log' })).toHaveClass(
      'HugoUIPageTemplate-navItemSelected'
    );
  });
});

describe('HugoUIContentTemplate', () => {
  it('renders a title, description, action area, and content', () => {
    render(
      <HugoUIContentTemplate
        type="table"
        pageTitle="Organizations"
        titleInfo="Manage synthetic organizations."
        actionItems={<button type="button">Add</button>}
      >
        <div>Table content</div>
      </HugoUIContentTemplate>
    );

    expect(screen.getByRole('heading', { name: 'Organizations' })).toBeInTheDocument();
    expect(screen.getByText('Manage synthetic organizations.')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Add' })).toBeInTheDocument();
    expect(screen.getByText('Table content')).toBeInTheDocument();
  });

  it('calls onBack from the back action', () => {
    const onBack = jest.fn();

    render(
      <HugoUIContentTemplate type="card" pageTitle="Acme Cloud" onBack={onBack}>
        <div>Detail content</div>
      </HugoUIContentTemplate>
    );

    fireEvent.click(screen.getByRole('button', { name: 'Back' }));

    expect(onBack).toHaveBeenCalledTimes(1);
  });
});
