import React from 'react';
import userEvent from '@testing-library/user-event';
import { HugoUISearchBox } from './SearchBox';
import { render, screen } from '../utils/testUtils';

const renderSearchBox = (props: Partial<React.ComponentProps<typeof HugoUISearchBox>> = {}) => {
  const onChange = jest.fn();
  const onSearch = jest.fn();

  render(
    <HugoUISearchBox
      aria-label="Search organizations"
      value=""
      onChange={onChange}
      onSearch={onSearch}
      {...props}
    />
  );

  return { onChange, onSearch };
};

describe('HugoUISearchBox', () => {
  it('renders a native search input and design-system structure classes', () => {
    const { container } = render(
      <HugoUISearchBox aria-label="Search organizations" value="Acme" onChange={jest.fn()} />
    );

    expect(screen.getByRole('searchbox', { name: 'Search organizations' })).toHaveValue('Acme');
    expect(container.querySelector('.HugoUISearchBox-root')).not.toBeNull();
    expect(container.querySelector('.HugoUISearchBox-input')).not.toBeNull();
  });

  it('calls onChange as the user types', async () => {
    const user = userEvent.setup();
    const { onChange } = renderSearchBox();

    await user.type(screen.getByRole('searchbox', { name: 'Search organizations' }), 'Acme');

    expect(onChange).toHaveBeenCalledWith('A');
    expect(onChange).toHaveBeenLastCalledWith('e');
  });

  it('submits trimmed search text with Enter and the search button', async () => {
    const user = userEvent.setup();
    const onSearch = jest.fn();
    renderSearchBox({ value: '  Acme  ', onSearch });
    screen.getByRole('searchbox', { name: 'Search organizations' }).focus();

    await user.keyboard('[Enter]');
    await user.click(screen.getByRole('button', { name: 'Search' }));

    expect(onSearch).toHaveBeenCalledTimes(2);
    expect(onSearch).toHaveBeenCalledWith('Acme');
  });

  it('clears the current value and submits an empty search', async () => {
    const user = userEvent.setup();
    const onChange = jest.fn();
    const onSearch = jest.fn();
    renderSearchBox({ value: 'Acme', onChange, onSearch });

    await user.click(screen.getByRole('button', { name: 'Clear search' }));

    expect(onChange).toHaveBeenCalledWith('');
    expect(onSearch).toHaveBeenCalledWith('');
  });

  it('shows loading state and prevents search actions', () => {
    renderSearchBox({ value: 'Acme', loading: true });

    expect(screen.getByText('Searching')).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Search' })).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Clear search' })).toBeDisabled();
  });
});
