import '@testing-library/jest-dom';
import { render } from '../utils/testUtils';
import { HugoUIModalTitle } from './ModalTitle';

describe('HugoUIModalTitle', () => {
  it('renders custom prefix icon when provided', () => {
    render(<HugoUIModalTitle title="Title" prefixIconName="custom-icon" />);
    const icon = document.querySelector('.HugoUIModalTitle-icon');
    expect(icon).toBeTruthy();
    expect(icon).toHaveClass('custom-icon');
  });
});
