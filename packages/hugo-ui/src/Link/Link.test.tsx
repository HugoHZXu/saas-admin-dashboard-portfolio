import '@testing-library/jest-dom';
import { render, fireEvent, waitFor } from '../utils/testUtils';
import { HugoUILink, HugoUILinkMode, HugoUILinkSize } from './Link';
import { DARK_PURPLE, TEXT } from '../styles/color';

const setup = (
  target?: string,
  mode: HugoUILinkMode = 'light',
  size: HugoUILinkSize = 'medium',
  loading = false
) => {
  render(
    <HugoUILink
      href="http://www.baidu.com"
      target={target}
      mode={mode}
      size={size}
      loading={loading}
      onClick={(event) => event.preventDefault()}
    >
      this is a link
    </HugoUILink>
  );
};
describe('render Link', () => {
  it('normal style', () => {
    setup('_blank', 'light');
    const link = document.querySelector('.HugoUILink');
    expect(link).toBeTruthy();
    expect(link).toHaveStyle(`color: ${TEXT}`);
    setup(undefined);
    expect(document.querySelector('.HugoUILink')).toBeTruthy();
  });
  it('render small text if size is small', () => {
    setup('_blank', 'light', 'small');
    const link = document.querySelector('.HugoUILink');
    expect(link).toHaveStyle(`fontSize: 12px`);
  });
  it('hover style', async () => {
    setup();
    const link = document.querySelector('.HugoUILink');
    expect(link).toBeTruthy();
    fireEvent.mouseOver(link as Element);
    await waitFor(() => {
      expect(link).toHaveStyle(`color: ${DARK_PURPLE}`);
    });
  });
  it('visited style', async () => {
    setup();
    const link = document.querySelector('.HugoUILink');
    expect(link).toBeTruthy();
    fireEvent.click(link as Element);
    await waitFor(() => {
      expect(link).toBeTruthy();
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
