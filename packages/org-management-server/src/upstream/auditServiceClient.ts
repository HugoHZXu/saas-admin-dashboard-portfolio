import { executeMockGraphql } from './mockGraphqlExecutor';
import { createMockAuditGraphqlSchema } from './mockAuditGraphqlSchema';
import { RawAuditEvent } from './types';

export type AuditServiceClient = {
  listAuditEvents: () => Promise<RawAuditEvent[]>;
};

type ListAuditEventsData = {
  auditEvents: RawAuditEvent[];
};

const LIST_AUDIT_EVENTS_QUERY = `
  query MockUpstreamAuditEvents {
    auditEvents {
      id
      i18n
      actor {
        id
        email
        givenName
        familyName
      }
      eventTime
      eventType
      eventSource
      eventName
      successful
      targets {
        userId
        email
        givenName
        familyName
        orgId
        orgReferenceId
        orgName
        domainId
        domainName
        resultDetails {
          changedFields
          failureReason
          operationResults {
            name
            successful
          }
        }
      }
    }
  }
`;

export const createMockAuditServiceClient = (): AuditServiceClient => ({
  async listAuditEvents() {
    const data = await executeMockGraphql<ListAuditEventsData>({
      schema: createMockAuditGraphqlSchema(),
      source: LIST_AUDIT_EVENTS_QUERY,
    });

    return data.auditEvents;
  },
});
