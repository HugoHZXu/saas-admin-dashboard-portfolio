import React from 'react';
import AddIcon from '@mui/icons-material/Add';
import { render } from '../utils/testUtils';
import { HugoUIButtonLink } from './ButtonLink';
import { HugoUILinkMode, HugoUILinkSize } from './Link';

const setup = (
  mode: HugoUILinkMode = 'light',
  icon?: React.ReactNode,
  size: HugoUILinkSize = 'medium'
) => {
  return render(
    <HugoUIButtonLink mode={mode} size={size} icon={icon}>
      Add more
    </HugoUIButtonLink>
  );
};
describe('render ButtonLink', () => {
  it('should have icon if pass icon', () => {
    setup('light', <AddIcon />);
    expect(document.querySelector('.HugoUIButtonLink')).toBeTruthy();
    expect(document.querySelector('.HugoUIButtonLink-icon svg')).toBeTruthy();
  });
  it('should render Link if pass no icon', () => {
    setup('light');
    expect(document.querySelector('.HugoUIButtonLink')).toBeFalsy();
    expect(document.querySelector('.HugoUILink')).toBeTruthy();
  });
  it('should render white mode if pass no mode', () => {
    setup(undefined, <AddIcon />);
    expect(document.querySelector('.HugoUIButtonLink')).toBeTruthy();
  });
  it('calls onClick when icon button is clicked', () => {
    const onClick = jest.fn();
    render(
      <HugoUIButtonLink mode="light" icon={<AddIcon />} onClick={onClick}>
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
      <HugoUIButtonLink mode="light" icon={<AddIcon />} onClick={onClick}>
        Add more
      </HugoUIButtonLink>
    );
    const button = document.querySelector('.HugoUIButtonLink');
    expect(button).toBeTruthy();
    button?.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
    expect(onClick).toHaveBeenCalled();
  });
});
