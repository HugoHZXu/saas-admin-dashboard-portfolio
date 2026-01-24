import React from 'react';
import { HugoUITypography } from './typography';
import { ROOT_PREFIX } from './typographyStyles';
import { render, screen } from '../utils/testUtils';

describe('render HugoUITypography', () => {
  it('correctly render HugoUITypography', () => {
    render(<HugoUITypography variant="body">body text</HugoUITypography>);
    expect(screen.getByText('body text')).toBeInTheDocument();
    expect(document.querySelector(`.${ROOT_PREFIX}-body`)).toBeTruthy();
    expect(document.querySelector(`.MuiTypography-inherit`)).toBeTruthy();
  });

  it('correctly render MUI variant on Typography', () => {
    render(<HugoUITypography variant="headerA">body text</HugoUITypography>);
    expect(document.querySelector(`.MuiTypography-h1`)).toBeTruthy();
  });
});
