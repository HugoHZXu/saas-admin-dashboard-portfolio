import { AddressInfo } from 'net';
import { createOrgManagementServerApp } from '../app/createApp';

const listen = () => {
  const app = createOrgManagementServerApp();
  const server = app.listen(0);
  const { port } = server.address() as AddressInfo;

  return {
    server,
    url: `http://127.0.0.1:${port}`,
  };
};

describe('org-management-server app', () => {
  it('serves health checks', async () => {
    const { server, url } = listen();

    try {
      const response = await fetch(`${url}/healthz`);
      const payload = await response.json();

      expect(response.status).toBe(200);
      expect(payload).toEqual({
        status: 'ok',
        service: 'org-management-server',
      });
    } finally {
      server.close();
    }
  });

  it('executes organization GraphQL queries', async () => {
    const { server, url } = listen();

    try {
      const response = await fetch(`${url}/graphql`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          query: `
            query Organizations($input: OrganizationListInput) {
              organizations(input: $input) {
                totalElements
                items {
                  id
                  name
                  status
                }
              }
            }
          `,
          variables: {
            input: {
              searchString: 'Acme',
              pageSize: 5,
            },
          },
        }),
      });
      const payload = await response.json();

      expect(response.status).toBe(200);
      expect(payload.errors).toBeUndefined();
      expect(payload.data.organizations.totalElements).toBe(1);
      expect(payload.data.organizations.items[0].name).toBe('Acme Cloud');
    } finally {
      server.close();
    }
  });

  it('supports CORS preflight for GraphQL requests', async () => {
    const { server, url } = listen();

    try {
      const response = await fetch(`${url}/graphql`, {
        method: 'OPTIONS',
        headers: {
          origin: 'http://127.0.0.1:5174',
          'access-control-request-method': 'POST',
          'access-control-request-headers': 'content-type',
        },
      });

      expect(response.status).toBe(204);
      expect(response.headers.get('access-control-allow-origin')).toBe('*');
      expect(response.headers.get('access-control-allow-methods')).toContain('POST');
    } finally {
      server.close();
    }
  });

  it('executes activity GraphQL queries', async () => {
    const { server, url } = listen();

    try {
      const response = await fetch(`${url}/graphql`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          query: `
            query ActivityLogs($input: ActivityLogListInput) {
              activityLogs(input: $input) {
                totalElements
                items {
                  id
                  action
                  actionLabel {
                    id
                    defaultMessage
                    values {
                      key
                      value
                    }
                  }
                  summary
                  summaryMessage {
                    id
                    defaultMessage
                    values {
                      key
                      value
                    }
                  }
                  result
                }
              }
            }
          `,
          variables: {
            input: {
              results: ['failed'],
              pageSize: 5,
            },
          },
        }),
      });
      const payload = await response.json();

      expect(response.status).toBe(200);
      expect(payload.errors).toBeUndefined();
      expect(payload.data.activityLogs.totalElements).toBe(1);
      expect(payload.data.activityLogs.items[0].result).toBe('failed');
      expect(payload.data.activityLogs.items[0].action).toBe('userDisabled');
      expect(payload.data.activityLogs.items[0].actionLabel.id).toBe(
        'orgManagement.activity.action.userDisabled'
      );
      expect(payload.data.activityLogs.items[0].summaryMessage.id).toBe(
        'orgManagement.activity.summary.userDisabled.failed'
      );
    } finally {
      server.close();
    }
  });

  it('returns GraphQL errors for invalid queries', async () => {
    const { server, url } = listen();

    try {
      const response = await fetch(`${url}/graphql`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          query: '{ missingField }',
        }),
      });
      const payload = await response.json();

      expect(response.status).toBe(200);
      expect(payload.errors[0].message).toContain('Cannot query field');
    } finally {
      server.close();
    }
  });
});
