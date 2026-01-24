import { HugoUITypography } from './Typography';
import { ROOT_PREFIX } from './typographyStyles';
import { render, screen } from '../utils/testUtils';

describe('render HugoUITypography', () => {
  it('correctly render HugoUITypography', () => {
    render(<HugoUITypography variant="body">body text</HugoUITypography>);
    expect(screen.getByText('body text')).toBeInTheDocument();
    expect(document.querySelector(`.${ROOT_PREFIX}-body`)).toBeTruthy();
    expect(document.querySelector(`.MuiTypography-inherit`)).toBeTruthy();
  });

  it('correctly render MUI variant on Typography', () => {
    render(<HugoUITypography variant="headerA">body text</HugoUITypography>);
    expect(document.querySelector(`.MuiTypography-h1`)).toBeTruthy();
  });

  it('maps subtitleC to subtitle3', () => {
    render(<HugoUITypography variant="subtitleC">subtitle text</HugoUITypography>);
    expect(document.querySelector(`.${ROOT_PREFIX}-subtitle3`)).toBeTruthy();
    expect(document.querySelector(`.MuiTypography-inherit`)).toBeTruthy();
  });

  it('maps headerD to h4', () => {
    render(<HugoUITypography variant="headerD">header text</HugoUITypography>);
    expect(document.querySelector(`.${ROOT_PREFIX}-h4`)).toBeTruthy();
    expect(document.querySelector(`.MuiTypography-h4`)).toBeTruthy();
  });

  it('maps subtitleB to subtitle2', () => {
    render(<HugoUITypography variant="subtitleB">subtitle text</HugoUITypography>);
    expect(document.querySelector(`.${ROOT_PREFIX}-subtitle2`)).toBeTruthy();
    expect(document.querySelector(`.MuiTypography-subtitle2`)).toBeTruthy();
  });

  it('maps headerE to h5', () => {
    render(<HugoUITypography variant="headerE">header text</HugoUITypography>);
    expect(document.querySelector(`.${ROOT_PREFIX}-h5`)).toBeTruthy();
    expect(document.querySelector(`.MuiTypography-h5`)).toBeTruthy();
  });
});
