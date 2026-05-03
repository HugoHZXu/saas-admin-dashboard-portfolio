import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';

import { Button } from '@/components/ui/button';

describe('Button', () => {
  it('renders Hugo-style defaults and fires click handlers', () => {
    const handleClick = jest.fn();

    render(<Button onClick={handleClick}>Create project</Button>);

    const button = screen.getByRole('button', { name: 'Create project' });
    expect(button).toHaveAttribute('data-variant', 'solid');
    expect(button).toHaveAttribute('data-tone', 'brand');
    expect(button).toHaveAttribute('data-size', 'default');
    expect(button).toHaveClass('hugo-ui-shadcn-button');
    expect(button.className).toContain('inline-flex');
    expect(button).toHaveClass('h-10');
    expect(button.className).toContain('bg-hugo-brand-primary');
    expect(button.style.getPropertyValue('--hugo-ui-shadcn-button-brand-hover')).toBe('');

    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('renders variant, tone, size, and composed icon content', () => {
    render(
      <Button size="sm" tone="neutral" variant="outline">
        Review
        <span data-testid="end-icon" />
      </Button>
    );

    const button = screen.getByRole('button', { name: 'Review' });
    expect(button).toHaveAttribute('data-variant', 'outline');
    expect(button).toHaveAttribute('data-tone', 'neutral');
    expect(button).toHaveAttribute('data-size', 'sm');
    expect(button).toHaveClass('h-6');

    const icon = screen.getByTestId('end-icon');
    expect(icon).toBeInTheDocument();
    expect(icon.closest('[data-slot="button-content"]')).not.toBeNull();
    expect(icon.closest('[data-slot="button-label"]')).toBeNull();
  });

  it('supports icon-only buttons through size and aria-label', () => {
    render(
      <Button aria-label="Completed" size="icon">
        <span data-testid="start-icon" />
      </Button>
    );

    const button = screen.getByRole('button', { name: 'Completed' });
    expect(button).toHaveAttribute('data-icon-only', 'true');
    expect(button).toHaveAttribute('aria-label', 'Completed');
    expect(button).toHaveClass('h-10');
    expect(button).toHaveClass('w-14');
    expect(screen.getByTestId('start-icon')).toBeInTheDocument();
    expect(button.querySelector('[data-slot="button-label"]')).toBeNull();
  });

  it('disables click behavior while loading', () => {
    const handleClick = jest.fn();

    render(
      <Button loading loadingPosition="center" onClick={handleClick}>
        Saving
      </Button>
    );

    const button = screen.getByRole('button', { name: 'Saving' });
    expect(button).toBeDisabled();
    expect(button).toHaveAttribute('aria-busy', 'true');
    expect(button).toHaveAttribute('data-loading', 'true');

    const spinner = button.querySelector('[data-slot="button-spinner"]');
    expect(spinner).not.toBeNull();
    expect(spinner).toHaveClass('h-6');
    expect(spinner).toHaveClass('w-6');

    fireEvent.click(button);
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('prevents disabled asChild links from firing click handlers', () => {
    const handleClick = jest.fn();
    const linkChild = <a href="/projects">Projects</a>;

    render(
      <Button asChild disabled onClick={handleClick}>
        {linkChild}
      </Button>
    );

    const link = screen.getByRole('link', { name: 'Projects' });
    expect(link).toHaveAttribute('aria-disabled', 'true');
    expect(link).toHaveAttribute('data-disabled', 'true');
    expect(link).not.toHaveAttribute('disabled');
    expect(link).toHaveAttribute('tabindex', '-1');

    fireEvent.click(link);
    expect(handleClick).not.toHaveBeenCalled();
  });
});
