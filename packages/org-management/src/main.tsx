import React from 'react';
import { ApolloProvider } from '@apollo/client/react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HugoUIProvider, hugoUITheme } from '@hugo-ui/mui';
import { orgManagementApolloClient } from './api/apolloClient';
import { App } from './app/App';
import { OrgManagementGlobalStyles } from './app/AppStyles';
import { getOrgManagementLocale, getOrgManagementMessages } from './lang/messages';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Root element #root was not found.');
}

const locale = getOrgManagementLocale();
const messages = getOrgManagementMessages(locale);

createRoot(rootElement).render(
  <React.StrictMode>
    <HugoUIProvider theme={hugoUITheme} locale={locale} messages={messages} fontLoading="none">
      <ApolloProvider client={orgManagementApolloClient}>
        <BrowserRouter>
          <OrgManagementGlobalStyles />
          <App />
        </BrowserRouter>
      </ApolloProvider>
    </HugoUIProvider>
  </React.StrictMode>
);
