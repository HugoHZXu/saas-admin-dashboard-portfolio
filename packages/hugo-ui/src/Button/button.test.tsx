import { HugoUIButton } from './Button';
import { render, screen } from '../utils/testUtils';

describe('Color Theme', () => {
  it('render primary', () => {
    render(<HugoUIButton />);
    expect(document.querySelector('.MuiButton-contained')).not.toBe(null);
    expect(document.querySelector('.MuiButton-colorPrimary')).not.toBe(null);
    expect(document.querySelector('.MuiButton-sizeMedium')).not.toBe(null);
    expect(document.querySelector('.HugoUIButton-purpleColor')).not.toBe(null);
  });
  it('render secondary filled', () => {
    render(<HugoUIButton level="secondary" />);
    expect(document.querySelector('.MuiButton-outlined')).not.toBe(null);
    expect(document.querySelector('.MuiButton-colorSecondary')).not.toBe(null);
  });
  it('render tertiary text', () => {
    render(<HugoUIButton level="tertiary" />);
    expect(document.querySelector('.HugoUIButton-textDrawingStyle')).not.toBe(null);
  });
  it('render tertiary text grey', () => {
    render(<HugoUIButton level="tertiary" colorTheme="grey" />);
    expect(document.querySelector('.HugoUIButton-textDrawingStyle')).not.toBe(null);
    expect(document.querySelector('.HugoUIButton-greyColor')).not.toBe(null);
  });
  it('render tertiary text white', () => {
    render(<HugoUIButton level="tertiary" colorTheme="white" />);
    expect(document.querySelector('.HugoUIButton-textDrawingStyle')).not.toBe(null);
    expect(document.querySelector('.HugoUIButton-whiteColor')).not.toBe(null);
  });
  it('render tertiary text light purple', () => {
    render(<HugoUIButton level="tertiary" colorTheme="purple" />);
    expect(document.querySelector('.HugoUIButton-textDrawingStyle')).not.toBe(null);
    expect(document.querySelector('.HugoUIButton-purpleColor')).not.toBe(null);
  });
  it('render destruct', () => {
    render(<HugoUIButton colorTheme="red" />);
    expect(document.querySelector('.HugoUIButton-redColor')).not.toBe(null);
    expect(document.querySelector('.HugoUIButton-filledDrawingStyle')).not.toBe(null);
  });
  it('render disabled', () => {
    render(<HugoUIButton disabled={true} />);
    expect(document.querySelector('.Mui-disabled')).not.toBe(null);
  });
});

describe('Size', () => {
  it('render large', () => {
    render(<HugoUIButton size="large" />);
    expect(document.querySelector('.MuiButton-sizeLarge')).not.toBe(null);
  });
  it('render small', () => {
    render(<HugoUIButton size="small" />);
    expect(document.querySelector('.MuiButton-sizeSmall')).not.toBe(null);
  });
});

describe('Icon', () => {
  it('render start icon', () => {
    render(<HugoUIButton startIcon={<span className="icon-expand-more" />} />);
    expect(document.querySelector('.MuiButton-startIcon')).not.toBe(null);
  });
  it('render start loading icon', () => {
    render(<HugoUIButton loading={true} />);
    expect(document.querySelector('.MuiButton-startIcon')).not.toBe(null);
  });

  it('render center loading icon', () => {
    render(<HugoUIButton loading={true} loadingPosition="center" />);
    expect(document.querySelector('.MuiButton-startIcon')).toBe(null);
    expect(document.querySelector('.HugoUIButton-loadingIndicator-center')).not.toBe(null);
  });
  it('render end icon', () => {
    render(<HugoUIButton endIcon={<span className="icon-expand-more" />} />);
    expect(document.querySelector('.MuiButton-endIcon')).not.toBe(null);
  });
  it('render icon only', () => {
    render(<HugoUIButton startIcon={<span className="icon-expand-more" />} />);
    expect(document.querySelector('.HugoUIButton-icon-only')).not.toBe(null);
  });
});

describe('Aria', () => {
  it('uses aria-label when labelHidden', () => {
    render(
      <HugoUIButton labelHidden startIcon={<span className="icon-expand-more" />}>
        Hidden Label
      </HugoUIButton>
    );
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('aria-label', 'Hidden Label');
    expect(screen.queryByText('Hidden Label')).toBeNull();
  });
});
