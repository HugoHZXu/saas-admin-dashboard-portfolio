import { render, screen } from '@testing-library/react';
import { HugoUIProvider } from './HugoUIProvider';
import { useTheme } from '@mui/material/styles';
import { useIntl } from 'react-intl';

jest.mock('@fontsource/noto-sans/200.css', () => ({}), { virtual: true });
jest.mock('@fontsource/noto-sans/300.css', () => ({}), { virtual: true });
jest.mock('@fontsource/noto-sans/400.css', () => ({}), { virtual: true });
jest.mock('@fontsource/noto-sans-jp/300.css', () => ({}), { virtual: true });
jest.mock('@fontsource/noto-sans-thai/300.css', () => ({}), { virtual: true });
jest.mock('@fontsource/noto-sans-arabic/300.css', () => ({}), { virtual: true });

const ThemeProbe = () => {
  const theme = useTheme();
  return <span data-testid="theme-color">{theme.hugoUIColors.PURPLE_PLUM}</span>;
};

const IntlProbe = () => {
  const intl = useIntl();
  return (
    <span data-testid="intl-message">
      {intl.formatMessage({ id: 'hugoUI.button.save', defaultMessage: 'Save' })}
    </span>
  );
};

describe('HugoUIProvider', () => {
  afterEach(() => {
    const link = document.getElementById('hugoUI-remote-fonts');
    link?.remove();
  });

  it('provides messages to IntlProvider', () => {
    render(
      <HugoUIProvider
        locale="en"
        messages={{ 'hugoUI.button.save': 'Save Local' }}
        fontLoading="none"
      >
        <IntlProbe />
      </HugoUIProvider>
    );
    expect(screen.getByTestId('intl-message')).toHaveTextContent('Save Local');
  });

  it('merges theme overrides', () => {
    render(
      <HugoUIProvider fontLoading="none">
        <ThemeProbe />
      </HugoUIProvider>
    );
    expect(screen.getByTestId('theme-color')).toHaveTextContent('#9955C6');
  });

  it('does not load fonts when fontLoading is none', () => {
    render(
      <HugoUIProvider fontLoading="none">
        <ThemeProbe />
      </HugoUIProvider>
    );
    expect(document.getElementById('hugoUI-remote-fonts')).toBeNull();
  });

  it('loads remote fonts for japanese locale', () => {
    render(
      <HugoUIProvider locale="ja-JP" fontLoading="remote">
        <ThemeProbe />
      </HugoUIProvider>
    );
    const link = document.getElementById('hugoUI-remote-fonts') as HTMLLinkElement | null;
    expect(link).toBeTruthy();
    expect(link?.href).toContain('Noto+Sans+JP');
  });

  it('updates remote font link when switching locale to arabic', () => {
    const { rerender } = render(
      <HugoUIProvider locale="en" fontLoading="remote">
        <ThemeProbe />
      </HugoUIProvider>
    );
    const link = document.getElementById('hugoUI-remote-fonts') as HTMLLinkElement | null;
    expect(link?.href).toContain('Noto+Sans');
    rerender(
      <HugoUIProvider locale="ar" fontLoading="remote">
        <ThemeProbe />
      </HugoUIProvider>
    );
    const updated = document.getElementById('hugoUI-remote-fonts') as HTMLLinkElement | null;
    expect(updated?.href).toContain('Noto+Sans+Arabic');
  });
});
