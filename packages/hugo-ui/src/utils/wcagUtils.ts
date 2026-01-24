import React from 'react';

/**
 * Enter keypress to trigger submit or other callback
 * @param e
 * @param callback
 */
export function onEnterKeyPress<T extends HTMLElement>(
  e: React.KeyboardEvent<T>,
  callback?: (event: React.KeyboardEvent<T>) => void
): void {
  if (e.key === 'Enter') {
    e.preventDefault();
    callback?.(e);
  }
}

/**
 * Enter keypress to trigger submit or other callback
 * @param e
 * @param callback
 */
export function onKeyPress(
  e: React.KeyboardEvent<HTMLElement>,
  keys: string[],
  callback?: (event: React.KeyboardEvent<HTMLElement>) => void
): void {
  if (keys.includes(e.key)) {
    callback?.(e);
  }
}

export function preventSubmit(e: React.KeyboardEvent<HTMLElement>): void {
  const target = e.target as HTMLInputElement | HTMLButtonElement | null;
  const isSubmit = target?.type === 'submit';
  if (!isSubmit && e.key === 'Enter') {
    e.preventDefault();
  }
}
