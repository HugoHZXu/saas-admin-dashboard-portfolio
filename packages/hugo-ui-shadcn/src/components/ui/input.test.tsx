import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';

import { Input } from '@/components/ui/input';

describe('Input', () => {
  it('forwards native props', () => {
    render(<Input aria-label="Project name" placeholder="hugo-ui-shadcn" />);

    const input = screen.getByRole('textbox', { name: 'Project name' });
    const root = input.closest('[data-component="hugo-input"]');

    expect(input).toHaveAttribute('placeholder', 'hugo-ui-shadcn');
    expect(root).toHaveAttribute('data-slot', 'root');
    expect(root?.querySelector('[data-slot="control"]')).toBeInTheDocument();
    expect(root?.querySelector('[data-slot="input"]')).toBe(input);
  });

  it('renders labels, helper text, required state, and value changes', () => {
    const handleChange = jest.fn();

    render(
      <Input
        description="Helper text"
        label="Organization"
        onChange={handleChange}
        required
        value=""
      />
    );

    const input = screen.getByLabelText(/Organization/);
    const root = input.closest('[data-component="hugo-input"]');

    expect(screen.getByText('*')).toBeInTheDocument();
    expect(screen.getByText('Helper text')).toBeInTheDocument();
    expect(root?.querySelector('[data-slot="label"]')).toBeInTheDocument();
    expect(root?.querySelector('[data-slot="required-mark"]')).toBeInTheDocument();
    expect(root?.querySelector('[data-slot="helper"]')).toBeInTheDocument();

    fireEvent.change(input, { target: { value: 'Acme' } });
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it('uses label text as placeholder for search inputs', () => {
    render(<Input label="Search organizations" name="search" />);

    const input = screen.getByPlaceholderText('Search organizations');
    expect(input).toBeInTheDocument();
    expect(screen.queryByText('Search organizations')).not.toBeInTheDocument();
  });

  it('renders success, error, loading, and small states', () => {
    const { rerender } = render(
      <Input label="Success" message="Saved" size="sm" status="success" />
    );

    expect(screen.getByText('Saved')).toBeInTheDocument();
    expect(screen.getByLabelText('Success')).not.toHaveAttribute('aria-required');
    expect(
      document.querySelector('[data-slot="status"][data-status="success"]')
    ).toBeInTheDocument();

    rerender(<Input label="Error" message="Required" status="error" />);
    expect(screen.getByText('Required')).toBeInTheDocument();
    expect(screen.getByLabelText('Error')).toHaveAttribute('aria-invalid', 'true');
    expect(document.querySelector('[data-slot="status"][data-status="error"]')).toBeInTheDocument();

    rerender(<Input label="Loading" loading />);
    expect(screen.getByLabelText('Loading')).toHaveAttribute('aria-busy', 'true');
    expect(document.querySelector('[data-slot="spinner"]')).toBeInTheDocument();
  });

  it('renders textarea input with count', () => {
    render(<Input as="textarea" label="Description" maxLength={20} value="Hello" />);

    expect(screen.getByRole('textbox', { name: 'Description' }).tagName).toBe('TEXTAREA');
    expect(document.querySelector('[data-slot="textarea"]')).toBeInTheDocument();
    expect(document.querySelector('[data-slot="counter"]')).toBeInTheDocument();
    expect(screen.getByText('5/20')).toBeInTheDocument();
  });

  it('calls onBlur when Enter is pressed for single-line inputs', () => {
    const handleBlur = jest.fn();

    render(<Input aria-label="Editable" onBlur={handleBlur} />);
    fireEvent.keyDown(screen.getByRole('textbox', { name: 'Editable' }), { key: 'Enter' });

    expect(handleBlur).toHaveBeenCalledTimes(1);
  });

  it('does not call onBlur when Enter is pressed for textarea inputs', () => {
    const handleBlur = jest.fn();

    render(<Input aria-label="Editable" as="textarea" onBlur={handleBlur} />);
    fireEvent.keyDown(screen.getByRole('textbox', { name: 'Editable' }), { key: 'Enter' });

    expect(handleBlur).not.toHaveBeenCalled();
  });

  it('forwards slot props and class names to internal parts', () => {
    render(
      <Input
        aria-label="Project"
        classNames={{ control: 'custom-control', input: 'custom-input' }}
        slotProps={{
          control: { 'data-testid': 'control' },
          input: { 'data-testid': 'field' },
          label: { 'data-testid': 'label' },
        }}
        label="Project"
      />
    );

    expect(screen.getByTestId('label')).toHaveAttribute('data-slot', 'label');
    expect(screen.getByTestId('control')).toHaveClass('custom-control');
    expect(screen.getByTestId('field')).toHaveClass('custom-input');
  });
});
