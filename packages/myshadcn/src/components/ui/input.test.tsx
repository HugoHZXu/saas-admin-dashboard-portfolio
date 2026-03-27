import { act } from 'react';
import ReactDOMClient from 'react-dom/client';

import { Input } from '@/components/ui/input';

describe('Input', () => {
  it('forwards native props', async () => {
    const container = document.createElement('div');
    const root = ReactDOMClient.createRoot(container);

    await act(async () => {
      root.render(<Input aria-label="Project name" placeholder="myshadcn" />);
    });

    const input = container.querySelector('input');
    expect(input?.getAttribute('aria-label')).toBe('Project name');
    expect(input?.getAttribute('placeholder')).toBe('myshadcn');

    await act(async () => {
      root.unmount();
    });
  });
});
