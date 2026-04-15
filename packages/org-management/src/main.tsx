import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HugoUIProvider, hugoUITheme } from 'hugo-ui';
import { App } from './app/App';
import { OrgManagementGlobalStyles } from './app/AppStyles';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Root element #root was not found.');
}

createRoot(rootElement).render(
  <React.StrictMode>
    <HugoUIProvider theme={hugoUITheme} locale="en" messages={{}} fontLoading="none">
      <BrowserRouter>
        <OrgManagementGlobalStyles />
        <App />
      </BrowserRouter>
    </HugoUIProvider>
  </React.StrictMode>
);
