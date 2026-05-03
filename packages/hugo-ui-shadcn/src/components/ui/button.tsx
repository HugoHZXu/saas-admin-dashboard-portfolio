import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { Slot } from '@radix-ui/react-slot';

import { cn } from '@/components/lib/utils';

export type HugoUIShadcnButtonVariant = 'solid' | 'outline' | 'ghost';
export type HugoUIShadcnButtonSize = 'sm' | 'default' | 'lg' | 'icon';
export type HugoUIShadcnButtonTone = 'brand' | 'neutral' | 'danger' | 'inverse';

const buttonVariants = cva(
  [
    'hugo-ui-shadcn-button relative inline-flex min-w-fit items-center justify-center',
    'box-border rounded-full border-0 font-sans text-sm font-semibold leading-hugo-button',
    'tracking-hugo-button whitespace-nowrap outline-none transition-colors duration-150 ease-linear',
    'focus-visible:ring-2 focus-visible:ring-hugo-focus focus-visible:ring-inset',
    'data-[tone=inverse]:focus-visible:ring-hugo-focus-on-dark',
    'disabled:cursor-not-allowed data-[loading=true]:cursor-not-allowed',
    'data-[disabled=true]:cursor-not-allowed data-[disabled=true]:bg-hugo-neutral-disabled',
    'data-[disabled=true]:text-hugo-text-inverse data-[disabled=true]:ring-0',
    'data-[variant=outline]:data-[disabled=true]:bg-transparent data-[variant=outline]:data-[disabled=true]:text-hugo-text-disabled',
    'data-[variant=outline]:data-[disabled=true]:ring-1 data-[variant=outline]:data-[disabled=true]:ring-hugo-neutral-disabled',
    'data-[variant=ghost]:data-[disabled=true]:bg-transparent data-[variant=ghost]:data-[disabled=true]:text-hugo-text-disabled',
    'data-[variant=ghost]:data-[disabled=true]:ring-1 data-[variant=ghost]:data-[disabled=true]:ring-hugo-neutral-disabled',
    '[&_svg]:pointer-events-none [&_svg]:shrink-0',
  ],
  {
    variants: {
      variant: {
        solid: '',
        outline: 'bg-transparent ring-1 ring-hugo-button-border-mid ring-inset',
        ghost: 'bg-transparent ring-0',
      },
      tone: {
        brand: '',
        neutral: '',
        danger: '',
        inverse: '',
      },
      size: {
        sm: 'h-6 px-4 text-xs leading-4 tracking-hugo-button-small [&_svg]:h-4 [&_svg]:w-4',
        default: 'h-10 px-6 [&_svg]:h-6 [&_svg]:w-6',
        lg: 'h-12 px-8 [&_svg]:h-6 [&_svg]:w-6',
        icon: 'h-10 w-14 px-0 [&_svg]:h-6 [&_svg]:w-6',
      },
    },
    compoundVariants: [
      {
        variant: 'solid',
        tone: 'brand',
        className:
          'bg-hugo-brand-primary text-hugo-text-inverse hover:bg-hugo-button-brand-hover active:bg-hugo-button-brand-active data-[loading=true]:bg-hugo-button-brand-active',
      },
      {
        variant: 'solid',
        tone: 'danger',
        className:
          'bg-hugo-status-error text-hugo-text-inverse hover:bg-hugo-status-destruct-strong active:bg-hugo-status-destruct-active data-[loading=true]:bg-hugo-status-destruct-active',
      },
      {
        variant: 'solid',
        tone: 'inverse',
        className:
          'bg-hugo-surface-default text-hugo-brand-accent hover:bg-hugo-button-inverse-hover active:bg-hugo-button-inverse-active active:text-hugo-brand-deep data-[loading=true]:bg-hugo-button-inverse-active data-[loading=true]:text-hugo-brand-deep',
      },
      {
        variant: 'solid',
        tone: 'neutral',
        className:
          'bg-hugo-neutral-1200 text-hugo-text-inverse hover:bg-hugo-neutral-1100 active:bg-hugo-neutral-1200',
      },
      {
        variant: 'outline',
        tone: 'brand',
        className:
          'text-hugo-brand-accent hover:bg-hugo-button-brand-soft-hover hover:ring-hugo-brand-accent active:bg-hugo-button-brand-soft-active active:text-hugo-brand-deep active:ring-hugo-brand-deep data-[loading=true]:bg-hugo-button-brand-soft-active data-[loading=true]:text-hugo-brand-deep data-[loading=true]:ring-hugo-brand-deep',
      },
      {
        variant: 'outline',
        tone: 'neutral',
        className:
          'text-hugo-neutral-1200 hover:bg-hugo-neutral-200 hover:ring-hugo-neutral-800 active:bg-hugo-neutral-500 active:ring-hugo-neutral-1100 data-[loading=true]:bg-hugo-neutral-500 data-[loading=true]:ring-hugo-neutral-1100',
      },
      {
        variant: 'outline',
        tone: 'inverse',
        className:
          'text-hugo-text-inverse ring-hugo-button-border-light hover:bg-hugo-button-brand-soft-hover',
      },
      {
        variant: 'outline',
        tone: 'danger',
        className: 'text-hugo-status-error hover:bg-hugo-error-bg hover:ring-hugo-status-error',
      },
      {
        variant: 'ghost',
        tone: 'brand',
        className:
          'text-hugo-brand-accent hover:bg-hugo-button-tertiary-brand-hover hover:ring-1 hover:ring-hugo-brand-accent hover:ring-inset active:bg-hugo-button-tertiary-brand-active active:text-hugo-brand-deep active:ring-1 active:ring-hugo-brand-deep active:ring-inset data-[loading=true]:bg-hugo-button-tertiary-brand-active data-[loading=true]:text-hugo-brand-deep data-[loading=true]:ring-1 data-[loading=true]:ring-hugo-brand-deep data-[loading=true]:ring-inset',
      },
      {
        variant: 'ghost',
        tone: 'neutral',
        className:
          'text-hugo-neutral-1200 hover:bg-hugo-neutral-200 hover:ring-1 hover:ring-hugo-neutral-800 hover:ring-inset',
      },
      {
        variant: 'ghost',
        tone: 'inverse',
        className:
          'text-hugo-text-inverse hover:bg-hugo-button-brand-soft-hover hover:ring-1 hover:ring-hugo-text-inverse hover:ring-inset',
      },
      {
        variant: 'ghost',
        tone: 'danger',
        className:
          'text-hugo-status-error hover:bg-hugo-error-bg hover:ring-1 hover:ring-hugo-status-error hover:ring-inset',
      },
    ],
    defaultVariants: {
      variant: 'solid',
      tone: 'brand',
      size: 'default',
    },
  }
);

type NativeButtonProps = Omit<React.ComponentProps<'button'>, 'color'>;

type ButtonProps = NativeButtonProps &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
    loading?: boolean;
    loadingPosition?: 'start' | 'center';
  };

const buttonSpinner = (position: 'start' | 'center', size: HugoUIShadcnButtonSize) => (
  <span
    aria-hidden="true"
    className={cn(
      'rounded-full border-2 border-current border-t-transparent animate-spin',
      size === 'sm' ? 'h-4 w-4' : 'h-6 w-6',
      position === 'center' && 'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'
    )}
    data-position={position}
    data-slot="button-spinner"
  />
);

function Button({
  className,
  children,
  variant = 'solid',
  tone = 'brand',
  size = 'default',
  asChild = false,
  loading = false,
  loadingPosition = 'start',
  disabled,
  type = 'button',
  tabIndex,
  onClick,
  'aria-label': ariaLabel,
  ...props
}: ButtonProps) {
  const resolvedVariant = variant ?? 'solid';
  const resolvedTone = tone ?? 'brand';
  const resolvedSize = size ?? 'default';
  const isIconOnly = resolvedSize === 'icon';
  const isDisabled = disabled || loading;
  const showCenterLoading = loading && loadingPosition === 'center';
  const showStartLoading = loading && loadingPosition === 'start';
  const buttonTabIndex = isDisabled ? -1 : tabIndex;
  const rootClassName = cn(
    buttonVariants({
      variant: resolvedVariant,
      tone: resolvedTone,
      size: resolvedSize,
    }),
    className
  );
  const sharedProps = {
    'aria-busy': loading || undefined,
    'aria-label': ariaLabel,
    className: rootClassName,
    'data-disabled': disabled ? 'true' : undefined,
    'data-icon-only': isIconOnly ? 'true' : undefined,
    'data-loading': loading ? 'true' : undefined,
    'data-size': resolvedSize,
    'data-slot': 'button',
    'data-tone': resolvedTone,
    'data-variant': resolvedVariant,
    tabIndex: buttonTabIndex,
  };
  const handleButtonClick: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    if (isDisabled) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }

    onClick?.(event);
  };

  const renderContentPart = (child: React.ReactNode, index: number) => {
    if (typeof child === 'string' || typeof child === 'number') {
      return (
        <span data-slot="button-label" key={`button-label-${index}`}>
          {child}
        </span>
      );
    }

    return child;
  };

  const renderContent = (content: React.ReactNode) => {
    const contentParts = React.Children.toArray(content);

    return (
      <>
        {showCenterLoading && buttonSpinner('center', resolvedSize)}
        <span
          className={cn(
            'inline-flex items-center justify-center gap-2',
            showCenterLoading && 'invisible'
          )}
          data-slot="button-content"
        >
          {showStartLoading && buttonSpinner('start', resolvedSize)}
          {contentParts.map(renderContentPart)}
        </span>
      </>
    );
  };

  if (asChild) {
    const child = React.Children.only(children) as React.ReactElement<
      React.HTMLAttributes<HTMLElement>
    >;
    const childOnClick = child.props.onClick;
    const handleAsChildClick: React.MouseEventHandler<HTMLElement> = (event) => {
      if (isDisabled) {
        event.preventDefault();
        event.stopPropagation();
        return;
      }

      childOnClick?.(event);
      onClick?.(event as unknown as React.MouseEvent<HTMLButtonElement>);
    };

    return (
      <Slot aria-disabled={isDisabled ? true : undefined} {...sharedProps} {...props}>
        {React.cloneElement(
          child,
          { onClick: handleAsChildClick },
          renderContent(child.props.children)
        )}
      </Slot>
    );
  }

  return (
    <button
      {...sharedProps}
      disabled={isDisabled}
      onClick={handleButtonClick}
      type={type}
      {...props}
    >
      {renderContent(children)}
    </button>
  );
}

export { Button, buttonVariants };
export type { ButtonProps };
