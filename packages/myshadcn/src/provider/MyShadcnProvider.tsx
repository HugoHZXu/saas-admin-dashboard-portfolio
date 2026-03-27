import type { PropsWithChildren } from 'react';

import { cn } from '@/components/lib/utils';

export interface MyShadcnProviderProps extends PropsWithChildren {
  className?: string;
}

export function MyShadcnProvider({ children, className }: MyShadcnProviderProps) {
  return (
    <div
      className={cn('min-h-full bg-background font-sans text-foreground antialiased', className)}
    >
      {children}
    </div>
  );
}
