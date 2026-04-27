import { createOrgManagementServerApp } from './app/createApp';

const DEFAULT_PORT = 4010;
const HOST = '127.0.0.1';

const parsePort = (value: string | undefined) => {
  const port = Number(value);

  return Number.isInteger(port) && port > 0 ? port : DEFAULT_PORT;
};

const app = createOrgManagementServerApp();
const port = parsePort(process.env.PORT);

app.listen(port, HOST, () => {
  console.info(`org-management-server listening on http://${HOST}:${port}`);
});
