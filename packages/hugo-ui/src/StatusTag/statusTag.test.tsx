import React from 'react';
import { render, screen } from '../utils/testUtils';
import { HugoUIStatusTag } from './StatusTag';

describe('HugoUIStatusTag', () => {
  it('renders children with the default neutral tone', () => {
    render(<HugoUIStatusTag>Archived</HugoUIStatusTag>);

    const tag = screen.getByText('Archived');
    expect(tag).toHaveClass('HugoUIStatusTag-root');
    expect(tag).toHaveClass('HugoUIStatusTag-neutral');
  });

  it('renders the selected tone class', () => {
    render(<HugoUIStatusTag tone="success">Active</HugoUIStatusTag>);

    expect(screen.getByText('Active')).toHaveClass('HugoUIStatusTag-success');
  });

  it('supports id, custom className, and style', () => {
    render(
      <HugoUIStatusTag id="status-paused" className="custom-status" style={{ marginLeft: 4 }}>
        Paused
      </HugoUIStatusTag>
    );

    const tag = screen.getByText('Paused');
    expect(tag).toHaveAttribute('id', 'status-paused');
    expect(tag).toHaveClass('custom-status');
    expect(tag).toHaveStyle({ marginLeft: '4px' });
  });
});
