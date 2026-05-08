import React from 'react';
import userEvent from '@testing-library/user-event';
import { DetailCard } from '..';
import { render, screen } from '../utils/testUtils';

describe('DetailCard', () => {
  it('renders card content', () => {
    render(<DetailCard>Account summary</DetailCard>);

    expect(screen.getByText('Account summary')).toBeInTheDocument();
  });

  it('activates clickable cards with keyboard', async () => {
    const user = userEvent.setup();
    const onClick = jest.fn();

    render(<DetailCard onClick={onClick}>Open details</DetailCard>);

    const card = screen.getByRole('button', { name: 'Open details' });
    card.focus();
    await user.keyboard('[Enter]');
    await user.keyboard('[Space]');

    expect(onClick).toHaveBeenCalledTimes(2);
  });
});
