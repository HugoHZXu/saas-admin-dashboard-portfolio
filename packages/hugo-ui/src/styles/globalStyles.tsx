import GlobalStyles from '@mui/material/GlobalStyles';

export function HugoUIGlobalStyles() {
  return (
    <GlobalStyles
      styles={{
        'html, body': {
          fontFamily: "'Noto Sans', sans-serif, BlinkMacSystemFont, system-ui, -apple-system",
        },
        'h1, h2, h3, h4, h5, h6, p': {
          margin: 0,
        },
        html: {
          boxSizing: 'border-box',
        },
        '*, *::before, *::after': {
          boxSizing: 'inherit',
        },
        '*:focus': {
          outline: 'none',
        },
        '::-webkit-scrollbar': {
          width: 12,
          height: 0,
        },
        '::-webkit-scrollbar-thumb': {
          height: '2em',
          border: '4px solid rgba(0, 0, 0, 0)',
          backgroundClip: 'padding-box',
          borderRadius: '2em',
          backgroundColor: '#ccc',
          boxShadow: 'inset 0 0 0 1px rgba(0, 0, 0, 0.025)',
        },
        '::-webkit-scrollbar-button': {
          width: 0,
          height: 0,
          display: 'none',
        },
        '::-webkit-scrollbar-corner': {
          backgroundColor: 'transparent',
        },
      }}
    />
  );
}
