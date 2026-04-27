import {
  GraphQLBoolean,
  GraphQLID,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} from 'graphql';
import { mockAuditEvents } from '../mockData/auditEvents';

const MockRawUserType = new GraphQLObjectType({
  name: 'MockRawUser',
  fields: {
    id: { type: new GraphQLNonNull(GraphQLID) },
    email: { type: new GraphQLNonNull(GraphQLString) },
    givenName: { type: new GraphQLNonNull(GraphQLString) },
    familyName: { type: new GraphQLNonNull(GraphQLString) },
  },
});

const MockAuditOperationResultType = new GraphQLObjectType({
  name: 'MockAuditOperationResult',
  fields: {
    name: { type: new GraphQLNonNull(GraphQLString) },
    successful: { type: new GraphQLNonNull(GraphQLBoolean) },
  },
});

const MockAuditResultDetailsType = new GraphQLObjectType({
  name: 'MockAuditResultDetails',
  fields: {
    changedFields: { type: new GraphQLList(new GraphQLNonNull(GraphQLString)) },
    failureReason: { type: GraphQLString },
    operationResults: {
      type: new GraphQLList(new GraphQLNonNull(MockAuditOperationResultType)),
    },
  },
});

const MockAuditTargetType = new GraphQLObjectType({
  name: 'MockAuditTarget',
  fields: {
    userId: { type: GraphQLID },
    email: { type: GraphQLString },
    givenName: { type: GraphQLString },
    familyName: { type: GraphQLString },
    orgId: { type: GraphQLID },
    orgReferenceId: { type: GraphQLString },
    orgName: { type: GraphQLString },
    domainId: { type: GraphQLID },
    domainName: { type: GraphQLString },
    resultDetails: { type: MockAuditResultDetailsType },
  },
});

const MockRawAuditEventType = new GraphQLObjectType({
  name: 'MockRawAuditEvent',
  fields: {
    id: { type: new GraphQLNonNull(GraphQLID) },
    i18n: { type: new GraphQLNonNull(GraphQLString) },
    actor: { type: MockRawUserType },
    eventTime: { type: new GraphQLNonNull(GraphQLString) },
    eventType: { type: GraphQLString },
    eventSource: { type: new GraphQLNonNull(GraphQLString) },
    eventName: { type: new GraphQLNonNull(GraphQLString) },
    successful: { type: new GraphQLNonNull(GraphQLBoolean) },
    targets: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(MockAuditTargetType))),
    },
  },
});

export const createMockAuditGraphqlSchema = () =>
  new GraphQLSchema({
    query: new GraphQLObjectType({
      name: 'MockAuditQuery',
      fields: {
        auditEvents: {
          type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(MockRawAuditEventType))),
          resolve: () => mockAuditEvents,
        },
      },
    }),
  });
