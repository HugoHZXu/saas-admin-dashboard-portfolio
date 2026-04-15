import React from 'react';
import userEvent from '@testing-library/user-event';
import { HugoUIToggle, HugoUIToggleOption } from './Toggle';
import { render, screen } from '../utils/testUtils';

type Mode = 'search' | 'filter';

const options: HugoUIToggleOption<Mode>[] = [
  { value: 'search', label: 'Search' },
  { value: 'filter', label: 'Filter' },
];

describe('HugoUIToggle', () => {
  it('renders options and selected state', () => {
    const { container } = render(
      <HugoUIToggle ariaLabel="Table control mode" value="search" options={options} onChange={jest.fn()} />
    );

    expect(screen.getByRole('group', { name: 'Table control mode' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Search' })).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByRole('button', { name: 'Filter' })).toHaveAttribute('aria-pressed', 'false');
    expect(container.querySelector('.HugoUIToggle-root')).not.toBeNull();
    expect(container.querySelector('.HugoUIToggle-itemSelected')).not.toBeNull();
  });

  it('calls onChange when another option is selected', async () => {
    const user = userEvent.setup();
    const onChange = jest.fn();
    render(<HugoUIToggle ariaLabel="Table control mode" value="search" options={options} onChange={onChange} />);

    await user.click(screen.getByRole('button', { name: 'Filter' }));

    expect(onChange).toHaveBeenCalledWith('filter');
  });

  it('does not call onChange for the already selected option', async () => {
    const user = userEvent.setup();
    const onChange = jest.fn();
    render(<HugoUIToggle ariaLabel="Table control mode" value="search" options={options} onChange={onChange} />);

    await user.click(screen.getByRole('button', { name: 'Search' }));

    expect(onChange).not.toHaveBeenCalled();
  });
});
