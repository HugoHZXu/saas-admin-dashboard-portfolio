/* eslint-disable @typescript-eslint/no-explicit-any */
import '@testing-library/jest-dom';
import { screen, render, fireEvent } from '../utils/testUtils';
import { HugoUIMessage } from './Message';

describe('render HugoUIMessage', () => {
  it('correctly render alert', () => {
    render(<HugoUIMessage type="alert">This is test content</HugoUIMessage>);
    const textItem = screen.getByText('This is test content');
    const root = document.querySelector('.HugoUIMessage-alert');
    expect(textItem).toBeInTheDocument();
    expect(root).toBeTruthy();
  });

  it('correctly render error', () => {
    render(<HugoUIMessage type="error">This is test content</HugoUIMessage>);
    const textItem = screen.getByText('This is test content');
    const root = document.querySelector('.HugoUIMessage-error');
    expect(textItem).toBeInTheDocument();
    expect(root).toBeTruthy();
  });

  it('correctly render success', () => {
    render(<HugoUIMessage type="success">This is test content</HugoUIMessage>);
    const textItem = screen.getByText('This is test content');
    const root = document.querySelector('.HugoUIMessage-success');
    expect(textItem).toBeInTheDocument();
    expect(root).toBeTruthy();
  });

  it('correctly render destructive success', () => {
    render(<HugoUIMessage type="destructiveSuccess">This is test content</HugoUIMessage>);
    const textItem = screen.getByText('This is test content');
    const root = document.querySelector('.HugoUIMessage-destructiveSuccess');
    expect(textItem).toBeInTheDocument();
    expect(root).toBeTruthy();
  });

  it('correctly render close button', () => {
    render(
      <HugoUIMessage inline type="success" onClose={() => console.log('message closed')}>
        This is test content
      </HugoUIMessage>
    );
    const closeIcon = document.querySelector('.HugoUIMessage-close');
    expect(closeIcon).toBeInTheDocument();
  });

  it('correctly render extra message', () => {
    render(
      <HugoUIMessage type="alert" extraText="Here is more text">
        This is test content
      </HugoUIMessage>
    );
    const extraText = screen.getByText('Here is more text');
    expect(extraText).toBeInTheDocument();
  });
});

describe('HugoUIMessage interaction', () => {
  it('click to close success', () => {
    const closeFn = jest.fn();
    render(
      <HugoUIMessage inline type="success" onClose={closeFn}>
        This is test content
      </HugoUIMessage>
    );
    const closeIcon = document.querySelector('.HugoUIMessage-close');
    expect(closeIcon).toBeTruthy();
    fireEvent.click(closeIcon as Element);
    expect(closeFn).toHaveBeenCalled();
  });

  it('click to close destructiveSuccess', () => {
    const closeFn = jest.fn();
    render(
      <HugoUIMessage inline type="destructiveSuccess" onClose={closeFn}>
        This is test content
      </HugoUIMessage>
    );
    const closeIcon = document.querySelector('.HugoUIMessage-close');
    expect(closeIcon).toBeTruthy();
    fireEvent.click(closeIcon as Element);
    expect(closeFn).toHaveBeenCalled();
  });

  it('press enter to close', () => {
    const closeFn = jest.fn();
    render(
      <HugoUIMessage inline type="success" onClose={closeFn}>
        This is test content
      </HugoUIMessage>
    );
    const closeIcon = document.querySelector('.HugoUIMessage-close');
    expect(closeIcon).toBeTruthy();
    fireEvent.keyDown(closeIcon as Element, { key: 'Enter' });
    expect(closeFn).toHaveBeenCalled();
  });
});

describe('HugoUIMessage aria props', () => {
  it('alert icon', () => {
    render(<HugoUIMessage type="alert">This is test content</HugoUIMessage>);
    const icon = document.querySelector('.HugoUIStatusIcon-icon');
    expect(icon).toBeTruthy();
    expect(icon?.getAttribute('role')).toBe('img');
    expect(icon?.getAttribute('aria-label')).toBe('alert');
  });

  it('error icon', () => {
    render(<HugoUIMessage type="error">This is test content</HugoUIMessage>);
    const icon = document.querySelector('.HugoUIStatusIcon-icon');
    expect(icon).toBeTruthy();
    expect(icon?.getAttribute('role')).toBe('img');
    expect(icon?.getAttribute('aria-label')).toBe('error');
  });

  it('success icon', () => {
    render(<HugoUIMessage type="success">This is test content</HugoUIMessage>);
    const icon = document.querySelector('.HugoUIStatusIcon-icon');
    expect(icon).toBeTruthy();
    expect(icon?.getAttribute('role')).toBe('img');
    expect(icon?.getAttribute('aria-label')).toBe('success');
  });

  it('destructive success icon', () => {
    render(<HugoUIMessage type="destructiveSuccess">This is test content</HugoUIMessage>);
    const icon = document.querySelector('.HugoUIStatusIcon-icon');
    expect(icon).toBeTruthy();
    expect(icon?.getAttribute('role')).toBe('img');
    expect(icon?.getAttribute('aria-label')).toBe('success');
  });

  it('close button icon', () => {
    render(
      <HugoUIMessage inline type="success" onClose={() => console.log('message closed')}>
        This is test content
      </HugoUIMessage>
    );
    const closeIcon = document.querySelector('.HugoUIMessage-close');
    expect(closeIcon).toBeTruthy();
    expect(closeIcon?.getAttribute('role')).toBe('button');
    expect(closeIcon?.getAttribute('aria-label')).toBe('close');
  });

  it('uses provided icon aria label', () => {
    render(
      <HugoUIMessage type="alert" iconAriaProps={{ 'aria-label': 'custom-alert' }}>
        This is test content
      </HugoUIMessage>
    );
    const icon = document.querySelector('.HugoUIStatusIcon-icon');
    expect(icon).toBeTruthy();
    expect(icon?.getAttribute('aria-label')).toBe('custom-alert');
  });
});

describe('HugoUIMessage screen reader', () => {
  it('inline message', () => {
    render(
      <HugoUIMessage type="success" inline>
        This is test content
      </HugoUIMessage>
    );
    expect(document.querySelector('.HugoUIMessage-sr-only')).toHaveTextContent(
      'success This is test content'
    );
  });

  it('block message: no extraText', () => {
    render(<HugoUIMessage type="success">This is test content</HugoUIMessage>);
    expect(document.querySelector('.HugoUIMessage-sr-only')).toHaveTextContent(
      'success This is test content'
    );
  });

  it('block message: has complex dom structure of extraText', () => {
    render(
      <HugoUIMessage
        type="success"
        extraText={
          <div>
            <p>This is extraText title</p>
            <p>This is extraText content</p>
          </div>
        }
        extraTextComponentType="div"
      >
        This is test content
      </HugoUIMessage>
    );
    expect(document.querySelector('.HugoUIMessage-sr-only')).toHaveTextContent(
      'success This is test content This is extraText title This is extraText content'
    );
  });

  it('block message: has complex dom structure of children', () => {
    render(
      <HugoUIMessage type="success" extraText={'This is extraText message'}>
        <div>
          This is test content <div>111 test test</div>
        </div>
      </HugoUIMessage>
    );
    expect(document.querySelector('.HugoUIMessage-sr-only')).toHaveTextContent(
      'success This is test content 111 test test This is extraText message'
    );
  });

  it('handles empty children in screen reader text', () => {
    render(
      <HugoUIMessage type={'unknown' as any} hideScreenReaderMessage={false}>
        {null as any}
      </HugoUIMessage>
    );
    expect(document.querySelector('.HugoUIMessage-sr-only')).toBeInTheDocument();
  });

  it('uses large status spacing', () => {
    render(
      <HugoUIMessage type="success" size="large">
        This is test content
      </HugoUIMessage>
    );
    const icon = document.querySelector('.HugoUIStatusIcon-icon') as HTMLElement | null;
    expect(icon).toBeTruthy();
    expect(icon?.style.marginRight).toBe('8px');
  });
});
