import React from 'react';
import { HugoUIInput } from './Input';
import { render, fireEvent } from '../utils/testUtils';
import { screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import InputAdornment from '@mui/material/InputAdornment';
import userEvent from '@testing-library/user-event';

const setup = (props: React.ComponentProps<typeof HugoUIInput> = {}) =>
  render(<HugoUIInput {...props} />);
const handleInputChange = jest.fn();

const testLabel = 'here is a label';

describe('render Input', () => {
  it('render basic', () => {
    setup();
    expect(document.querySelector('input')).toBeInTheDocument();
  });
  it('render multiline', () => {
    setup({ multiline: true });
    expect(document.querySelector('textarea')).toBeInTheDocument();
  });
  it('render helperText', () => {
    setup({ helperText: '123' });
    expect(document.querySelector('.HugoUIInput-helperText-content')?.innerHTML).toBe('123');
  });
  it('render error state', () => {
    setup({ color: 'error', extraMessage: 'Input error message' });
    expect(document.querySelector('.MuiInputBase-colorError')).toBeInTheDocument();
  });

  it('render success state', () => {
    setup({ color: 'success', extraMessage: 'Input success message' });
    expect(document.querySelector('.MuiInputBase-colorSuccess')).toBeInTheDocument();
  });
  it('render mini', () => {
    setup({ mini: true });
    expect(document.querySelector('.HugoUIInput-mini')).toBeInTheDocument();
  });
  it('render mini success', () => {
    setup({ mini: true, color: 'success', id: 'mini-success' });
    expect(document.querySelector('#HugoUIInput-miniIcon-mini-success')).toBeInTheDocument();
  });
  it('render required label postfix', () => {
    setup({ label: testLabel, required: true });
    expect(document.querySelector('.HugoUIInput-label-requiredPostfix')).toBeInTheDocument();
  });
  it('renders label instead of placeholder', () => {
    setup({
      label: testLabel,
    });
    const label = document.querySelector('.MuiInputLabel-root') as HTMLElement;
    const input = document.querySelector('input') as HTMLInputElement;
    expect(label).toBeInTheDocument();
    expect(label.innerHTML).toBe(testLabel);
    expect(input).toHaveAttribute('placeholder', '');
  });
  it('renders label as placeholder if it is a search input', () => {
    setup({
      label: testLabel,
      name: 'search',
      InputProps: {
        startAdornment: (
          <InputAdornment position="start">
            <i className="icon-search" />
          </InputAdornment>
        ),
      },
    });
    const input = document.querySelector('input') as HTMLInputElement;
    expect(document.querySelector('.MuiInputLabel-root')).not.toBeInTheDocument();
    expect(input).toHaveAttribute('placeholder', testLabel);
  });
  it('renders loading', () => {
    setup({
      label: testLabel,
      loading: true,
    });
    expect(document.querySelector('.HugoUILoading-small')).toBeInTheDocument();
  });
});

describe('Input: interaction', () => {
  it('onChange', () => {
    setup({ onChange: handleInputChange });
    fireEvent.change(screen.getByRole('textbox'), { target: { value: '987654' } });
    expect(handleInputChange).toHaveBeenCalled();
  });
});

describe('Input: aria props', () => {
  it('error state', () => {
    setup({ color: 'error', extraMessage: 'Input error message' });
    const status = document.querySelector('.HugoUIInput-status');
    expect(status).toBeInTheDocument();
  });
  it('success state', () => {
    setup({ color: 'success', extraMessage: 'Input success message' });
    const status = document.querySelector('.HugoUIInput-status');
    expect(status).toBeInTheDocument();
  });
  it('custom extraMessage element', () => {
    setup({
      extraMessage: <span data-testid="custom-extra">custom message</span>,
    });
    expect(screen.getByTestId('custom-extra')).toBeInTheDocument();
  });
  it('string extraMessage without status color', () => {
    setup({ extraMessage: 'Plain message' });
    expect(screen.getByText('Plain message')).toBeInTheDocument();
  });
  it('mini success', () => {
    setup({ mini: true, color: 'success', id: 'mini-success-aria' });
    const icon = document.querySelector('#HugoUIInput-miniIcon-mini-success-aria');
    expect(icon).toBeInTheDocument();
  });
  it('mini error', () => {
    setup({ mini: true, color: 'error', id: 'mini-error-aria' });
    const icon = document.querySelector('#HugoUIInput-miniIcon-mini-error-aria');
    expect(icon).toBeInTheDocument();
  });
});

describe('Input: keyboard event', () => {
  it("Input shouldn't have the focus style if autoFocus is true", () => {
    setup({ autoFocus: true, label: 'label' });
    const label = document.querySelector('label') as HTMLLabelElement;
    const input = document.querySelector('.HugoUIInput-hasLabel') as HTMLElement;
    expect(label.classList).toContain('MuiInputLabel-shrink');
    expect(input.classList).toContain('HugoUIInput-clickFocus');
  });

  it('Input should have the keyboard focus style if autoFocus and autoFocusByKeyboard are true', () => {
    setup({ autoFocus: true, autoFocusByKeyboard: true, label: 'label' });
    const label = document.querySelector('label') as HTMLLabelElement;
    const input = document.querySelector('.HugoUIInput-hasLabel') as HTMLElement;
    expect(label.classList).toContain('MuiInputLabel-shrink');
    expect(input.classList).not.toContain('HugoUIInput-clickFocus');
  });

  it("Input shouldn't have the focus style if click to focus", async () => {
    const user = userEvent.setup();
    setup({ label: 'label' });
    const input = document.querySelector('input') as HTMLInputElement;
    const inputContainer = document.querySelector('.HugoUIInput-hasLabel') as HTMLElement;
    await user.click(input);
    expect(inputContainer.classList).toContain('HugoUIInput-clickFocus');
  });

  it('Input should have the focus style if tab to focus', async () => {
    const user = userEvent.setup();
    setup({ label: 'label' });
    const inputContainer = document.querySelector('.HugoUIInput-hasLabel') as HTMLElement;
    await user.tab();
    expect(inputContainer.classList).not.toContain('HugoUIInput-clickFocus');
  });

  it('handleBlur clears click focus and calls onBlur', () => {
    const onBlurEvt = jest.fn();
    setup({ label: 'label', onBlur: onBlurEvt });
    const input = document.querySelector('input') as HTMLInputElement;
    const inputContainer = document.querySelector('.HugoUIInput-hasLabel') as HTMLElement;
    fireEvent.mouseDown(input);
    expect(inputContainer.classList).toContain('HugoUIInput-clickFocus');
    fireEvent.blur(input);
    expect(onBlurEvt).toHaveBeenCalled();
    expect(inputContainer.classList).not.toContain('HugoUIInput-clickFocus');
  });

  it('Press Enter should trigger onBlur', () => {
    const onBlurEvt = jest.fn();
    setup({ onBlur: onBlurEvt });
    const input = document.querySelector('input') as HTMLInputElement;
    fireEvent.keyDown(input, { key: 'Enter' });
    expect(onBlurEvt).toHaveBeenCalled();
  });

  it("Multiple line input shouldn't trigger onBlur if Press Enter", () => {
    const onBlurEvt = jest.fn();
    setup({ multiline: true, onBlur: onBlurEvt });
    const textarea = document.querySelector('textarea') as HTMLTextAreaElement;
    fireEvent.keyDown(textarea, { key: 'Enter' });
    expect(onBlurEvt).not.toHaveBeenCalled();
  });
});
