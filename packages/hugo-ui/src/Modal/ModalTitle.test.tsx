import '@testing-library/jest-dom';
import { render } from '../utils/testUtils';
import { HugoUIModalTitle } from './ModalTitle';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';

describe('HugoUIModalTitle', () => {
  it('renders custom prefix icon when provided', () => {
    render(<HugoUIModalTitle title="Title" prefixIcon={<LocalFireDepartmentIcon />} />);
    const icon = document.querySelector('.HugoUIModalTitle-icon');
    expect(icon).toBeTruthy();
  });
});
