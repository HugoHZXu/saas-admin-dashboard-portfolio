import React from 'react';
import classnames from 'classnames';
import { ToggleRoot } from './styles/toggleStyles';
import { TOGGLE_ROOT_PREFIX } from './styles/toggleTokens';

export type HugoUIToggleOption<TValue extends string = string> = {
  value: TValue;
  label: React.ReactNode;
  icon?: React.ReactNode;
  disabled?: boolean;
};

export interface HugoUIToggleProps<TValue extends string = string> {
  value: TValue;
  options: HugoUIToggleOption<TValue>[];
  onChange: (value: TValue) => void;
  ariaLabel: string;
  className?: string;
}

export function HugoUIToggle<TValue extends string = string>({
  value,
  options,
  onChange,
  ariaLabel,
  className,
}: HugoUIToggleProps<TValue>) {
  return (
    <ToggleRoot className={classnames(`${TOGGLE_ROOT_PREFIX}-root`, className)} role="group" aria-label={ariaLabel}>
      {options.map((option) => {
        const selected = option.value === value;
        return (
          <button
            key={option.value}
            type="button"
            className={classnames(`${TOGGLE_ROOT_PREFIX}-item`, {
              [`${TOGGLE_ROOT_PREFIX}-itemSelected`]: selected,
            })}
            aria-pressed={selected}
            disabled={option.disabled}
            onClick={() => {
              if (!selected) {
                onChange(option.value);
              }
            }}
          >
            {option.icon}
            <span>{option.label}</span>
          </button>
        );
      })}
    </ToggleRoot>
  );
}
