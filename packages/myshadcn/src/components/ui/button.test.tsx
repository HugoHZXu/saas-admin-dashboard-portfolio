import { act } from 'react';
import ReactDOMClient from 'react-dom/client';

import { Button } from '@/components/ui/button';

describe('Button', () => {
  it('renders text and fires click handlers', async () => {
    const handleClick = jest.fn();
    const container = document.createElement('div');
    const root = ReactDOMClient.createRoot(container);

    await act(async () => {
      root.render(<Button onClick={handleClick}>Create project</Button>);
    });

    const button = container.querySelector('button');
    expect(button?.textContent).toBe('Create project');

    button?.click();
    expect(handleClick).toHaveBeenCalledTimes(1);

    await act(async () => {
      root.unmount();
    });
  });
});
