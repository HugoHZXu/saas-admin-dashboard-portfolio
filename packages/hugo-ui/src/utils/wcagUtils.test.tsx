/* eslint-disable @typescript-eslint/no-explicit-any */
import { onEnterKeyPress, onKeyPress, preventSubmit } from './wcagUtils';

describe('wcagUtils', () => {
  it('onEnterKeyPress triggers callback and preventDefault', () => {
    const preventDefault = jest.fn();
    const callback = jest.fn();
    onEnterKeyPress({ key: 'Enter', preventDefault } as any, callback);
    expect(preventDefault).toHaveBeenCalled();
    expect(callback).toHaveBeenCalled();
  });

  it('onEnterKeyPress ignores non-enter keys', () => {
    const preventDefault = jest.fn();
    const callback = jest.fn();
    onEnterKeyPress({ key: 'Escape', preventDefault } as any, callback);
    expect(preventDefault).not.toHaveBeenCalled();
    expect(callback).not.toHaveBeenCalled();
  });

  it('onKeyPress triggers callback for matching key', () => {
    const callback = jest.fn();
    onKeyPress({ key: 'Escape' } as any, ['Escape', 'Enter'], callback);
    expect(callback).toHaveBeenCalled();
  });

  it('onKeyPress ignores non-matching key', () => {
    const callback = jest.fn();
    onKeyPress({ key: 'Tab' } as any, ['Escape', 'Enter'], callback);
    expect(callback).not.toHaveBeenCalled();
  });

  it('preventSubmit prevents Enter for non-submit targets', () => {
    const preventDefault = jest.fn();
    preventSubmit({
      key: 'Enter',
      preventDefault,
      target: { type: 'text' },
    } as any);
    expect(preventDefault).toHaveBeenCalled();
  });

  it('preventSubmit does not prevent Enter for submit targets', () => {
    const preventDefault = jest.fn();
    preventSubmit({
      key: 'Enter',
      preventDefault,
      target: { type: 'submit' },
    } as any);
    expect(preventDefault).not.toHaveBeenCalled();
  });
});
