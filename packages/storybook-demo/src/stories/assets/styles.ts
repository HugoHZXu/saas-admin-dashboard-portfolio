import React from 'react';
import { styled } from '@mui/material';
import { hugoUITheme } from 'hugo-ui';

export const StyledColumn = {
  display: 'flex',
  flexDirection: 'column',
  rowGap: 20,
  padding: '0 20px',
} as React.CSSProperties;

export const StyledRow = {
  display: 'flex',
  justifyContent: 'space-evenly',
  alignItems: 'center',
  paddingBottom: 10,
} as React.CSSProperties;

export const StorybookSetStyle = {
  fontFamily:
    '"Nunito Sans",-apple-system,".SFNSText-Regular","San Francisco",BlinkMacSystemFont,"Segoe UI","Helvetica Neue",Helvetica,Arial,sans-serif',
  fontSize: 16,
  borderRadius: 4,
  background: '#FFFFFF',
  boxShadow: 'rgba(0, 0, 0, 0.10) 0 1px 3px 0',
  border: '1px solid rgba(0,0,0,.1)',
  margin: '25px 0 40px',
  padding: '30px 20px 10px',
};

export const StorybookSetRowStyle = {
  display: 'flex',
  alignItems: 'center',
  marginBottom: 20,
};

export const StorybookFontStyle = {
  fontSize: 12,
  color: 'rgba(51,51,51,0.6)',
};

export const CardListLayout = styled('div')({
  '.HugoUICard-root': {
    marginBottom: 20,
  },
});

export const NoHeaderLayout = styled('div')({
  '.HugoUIAppSwitcher-root': {
    top: 0,
  },
  [`@media screen and (max-width:${hugoUITheme.breakpoints.values.md}px)`]: {
    '.HugoUIAppSwitcher-root': {
      top: 0,
    },
  },
});
