import React from 'react';
import { render, fireEvent, waitFor } from '../utils/testUtils';
import { HugoUILink } from './link';
import {
  PROMETHEAN_DARK_PURPLE,
  PROMETHEAN_PURPLE_GRAPE,
  PROMETHEAN_TEXT,
} from '../../styles/colors/colors';

const setup = (target, mode, size = 'medium', loading = false, error = false) => {
  render(
    <HugoUILink
      href="http://www.baidu.com"
      target={target}
      mode={mode}
      size={size}
      loading={loading}
      error={error}
    >
      this is a link
    </HugoUILink>
  );
};
describe('render Link', () => {
  // on node 16 toHaveStyle color work badly, I have to skip this for now
  // https://github.com/testing-library/jest-dom/issues/350
  xit('normal style', () => {
    setup('_blank', 'light');
    expect(document.querySelector('.HugoUILink')).toBeTruthy();
    expect(document.querySelector('.HugoUILink')).toHaveStyle(`color: ${PROMETHEAN_TEXT}`);
    setup(undefined);
    expect(document.querySelector('.HugoUILink')).toBeTruthy();
  });
  it('render small text if size is small', () => {
    setup('_blank', 'light', 'small');
    expect(document.querySelector('.HugoUILink')).toHaveStyle(`fontSize: 12px`);
  });
  xit('hover style', async () => {
    setup();
    fireEvent.mouseOver(document.querySelector('.HugoUILink'));
    await waitFor(() => {
      expect(document.querySelector('.HugoUILink')).toHaveStyle(`color: ${PROMETHEAN_DARK_PURPLE}`);
    });
  });
  xit('visited style', async () => {
    setup();
    fireEvent.click(document.querySelector('.HugoUILink'));
    await waitFor(() => {
      expect(document.querySelector('.HugoUILink')).toHaveStyle(
        `color: ${PROMETHEAN_PURPLE_GRAPE}`
      );
    });
  });
  it('render loading icon if pass loading - true', () => {
    setup('_blank', 'light', 'small', true);
    expect(document.querySelector('.HugoUILoading-small')).toBeTruthy();
  });
  describe('render aria-label', () => {
    it('render aria-label with children', () => {
      render(<HugoUILink href="http://www.baidu.com">this is a link</HugoUILink>);
      expect(document.querySelector('.HugoUILink')).toHaveAttribute('aria-label', 'this is a link');
    });
    it('render aria-label with children: opens in new page', () => {
      render(
        <HugoUILink href="http://www.baidu.com" target="_blank">
          this is a link
        </HugoUILink>
      );
      expect(document.querySelector('.HugoUILink')).toHaveAttribute(
        'aria-label',
        'this is a link (opens in new page)'
      );
    });
    it('custom aria-label', () => {
      render(
        <HugoUILink href="http://www.baidu.com" aria-label="this is link aria-label">
          this is a link
        </HugoUILink>
      );
      expect(document.querySelector('.HugoUILink')).toHaveAttribute(
        'aria-label',
        'this is link aria-label'
      );
    });
    it('custom aria-label: opens in new page', () => {
      render(
        <HugoUILink
          href="http://www.baidu.com"
          target="_blank"
          aria-label="this is link aria-label"
        >
          this is a link
        </HugoUILink>
      );
      expect(document.querySelector('.HugoUILink')).toHaveAttribute(
        'aria-label',
        'this is link aria-label (opens in new page)'
      );
    });
  });
});
