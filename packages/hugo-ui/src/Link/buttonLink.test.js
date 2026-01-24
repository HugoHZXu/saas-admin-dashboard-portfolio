import React from 'react';
import { render } from '../utils/testUtils';
import { HugoUIButtonLink } from './ButtonLink';
import { alpha } from '@mui/material';
import { PROMETHEAN_BLUE } from '../../styles/colors/colors';

const setup = (mode, iconName, size = 'medium') => {
  render(
    <HugoUIButtonLink mode={mode} size={size} iconName={iconName}>
      Add more
    </HugoUIButtonLink>
  );
};
describe('render ButtonLink', () => {
  it('should have icon if pass iconName', () => {
    setup('light', 'icon-add');
    expect(document.querySelector('.HugoUIButtonLink')).toBeTruthy();
    expect(document.querySelector('.HugoUIButtonLink-icon')).toHaveClass('icon-add');
  });
  it('should render Link if pass no iconName', () => {
    setup('light');
    expect(document.querySelector('.HugoUIButtonLink')).toBeFalsy();
    expect(document.querySelector('.HugoUILink')).toBeTruthy();
  });

  // on node 16 toHaveStyle color work badly, I have to skip this for now
  // https://github.com/testing-library/jest-dom/issues/350
  xit('should render white mode if pass no mode', () => {
    setup(undefined, 'icon-add');
    expect(document.querySelector('.HugoUIButtonLink')).toHaveStyle(
      `color: ${alpha(PROMETHEAN_BLUE)}`
    );
  });
});
