import type { PropsWithChildren } from 'react';

import { cn } from '@/components/lib/utils';

export interface HugoUIShadcnProviderProps extends PropsWithChildren {
  className?: string;
}

export function HugoUIShadcnProvider({ children, className }: HugoUIShadcnProviderProps) {
  return (
    <div
      className={cn('min-h-full bg-background font-sans text-foreground antialiased', className)}
    >
      {children}
    </div>
  );
}
