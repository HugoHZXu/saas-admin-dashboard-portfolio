import React from 'react';
import { ApolloProvider } from '@apollo/client/react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HugoUIProvider, hugoUITheme } from '@hugo-ui/mui';
import { adminConsoleApolloClient } from './api/apolloClient';
import { App } from './app/App';
import { AdminConsoleGlobalStyles } from './app/AppStyles';
import { AdminSessionBridge } from './session/AdminSessionBridge';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Root element #root was not found.');
}

createRoot(rootElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <HugoUIProvider theme={hugoUITheme} locale="en" messages={{}} fontLoading="none">
        <ApolloProvider client={adminConsoleApolloClient}>
          <AdminSessionBridge>
            <AdminConsoleGlobalStyles />
            <App />
          </AdminSessionBridge>
        </ApolloProvider>
      </HugoUIProvider>
    </BrowserRouter>
  </React.StrictMode>
);
