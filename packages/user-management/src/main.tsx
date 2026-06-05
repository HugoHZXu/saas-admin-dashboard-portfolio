import React from 'react';
import { ApolloProvider } from '@apollo/client/react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HugoUIProvider, hugoUITheme } from '@hugo-ui/mui';
import { userManagementApolloClient } from './api/apolloClient';
import { App } from './app/App';
import { UserManagementGlobalStyles } from './app/AppStyles';
import { getUserManagementLocale, getUserManagementMessages } from './lang/messages';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Root element #root was not found.');
}

const locale = getUserManagementLocale();
const messages = getUserManagementMessages(locale);

createRoot(rootElement).render(
  <React.StrictMode>
    <HugoUIProvider theme={hugoUITheme} locale={locale} messages={messages} fontLoading="none">
      <ApolloProvider client={userManagementApolloClient}>
        <BrowserRouter>
          <UserManagementGlobalStyles />
          <App />
        </BrowserRouter>
      </ApolloProvider>
    </HugoUIProvider>
  </React.StrictMode>
);
