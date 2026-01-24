import React from 'react';
import { render } from '../utils/testUtils';
import { HugoUIButtonLink } from './ButtonLink';
import { HugoUILinkMode, HugoUILinkSize } from './Link';

const setup = (
  mode: HugoUILinkMode = 'light',
  iconName?: string,
  size: HugoUILinkSize = 'medium'
) => {
  return render(
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
  it('should render white mode if pass no mode', () => {
    setup(undefined, 'icon-add');
    expect(document.querySelector('.HugoUIButtonLink')).toBeTruthy();
  });
  it('calls onClick when icon button is clicked', () => {
    const onClick = jest.fn();
    render(
      <HugoUIButtonLink mode="light" iconName="icon-add" onClick={onClick}>
        Add more
      </HugoUIButtonLink>
    );
    const button = document.querySelector('.HugoUIButtonLink');
    expect(button).toBeTruthy();
    button?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    expect(onClick).toHaveBeenCalled();
  });

  it('calls onClick on Enter key', () => {
    const onClick = jest.fn();
    render(
      <HugoUIButtonLink mode="light" iconName="icon-add" onClick={onClick}>
        Add more
      </HugoUIButtonLink>
    );
    const button = document.querySelector('.HugoUIButtonLink');
    expect(button).toBeTruthy();
    button?.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
    expect(onClick).toHaveBeenCalled();
  });
});
