import { HugoUIButton } from './button';
import { render } from '../utils/testUtils';

describe('Color Theme', () => {
  it('render primary', () => {
    render(<HugoUIButton />);
    expect(document.querySelector('.MuiButton-containedPrimary')).not.toBe(null);
    expect(document.querySelector('.MuiButton-sizeMedium')).not.toBe(null);
    expect(document.querySelector('.HugoUIButton-purpleColor')).not.toBe(null);
  });
  it('render secondary filled', () => {
    render(<HugoUIButton level="secondary" />);
    expect(document.querySelector('.MuiButton-containedSecondary')).not.toBe(null);
  });
  it('render secondary outlined', () => {
    render(<HugoUIButton level="secondary" drawingStyle="outlined" />);
    expect(document.querySelector('.MuiButton-outlinedSecondary')).not.toBe(null);
  });
  it('render tertiary text', () => {
    render(<HugoUIButton level="tertiary" drawingStyle="text" />);
    expect(document.querySelector('.HugoUIButton-textDrawingStyle')).not.toBe(null);
  });
  it('render tertiary text grey', () => {
    render(<HugoUIButton level="tertiary" colorTheme="grey" drawingStyle="text" />);
    expect(document.querySelector('.HugoUIButton-textDrawingStyle')).not.toBe(null);
    expect(document.querySelector('.HugoUIButton-greyColor')).not.toBe(null);
  });
  it('render tertiary text white', () => {
    render(<HugoUIButton level="tertiary" colorTheme="white" drawingStyle="text" />);
    expect(document.querySelector('.HugoUIButton-textDrawingStyle')).not.toBe(null);
    expect(document.querySelector('.HugoUIButton-whiteColor')).not.toBe(null);
  });
  it('render tertiary text light purple', () => {
    render(<HugoUIButton level="tertiary" colorTheme="purple" drawingStyle="text" />);
    expect(document.querySelector('.HugoUIButton-textDrawingStyle')).not.toBe(null);
    expect(document.querySelector('.HugoUIButton-lavenderColor')).not.toBe(null);
  });
  it('render tertiary filled', () => {
    render(<HugoUIButton level="tertiary" colorTheme="grey" />);
    expect(document.querySelector('.HugoUIButton-tertiaryLevel')).not.toBe(null);
    expect(document.querySelector('.HugoUIButton-filledDrawingStyle')).not.toBe(null);
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
