import {
  GraphQLID,
  GraphQLInputObjectType,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';
import { ActivityResultType, createPageType, PageInputFields } from '../../graphql/common';

const LocalizedMessageValueType = new GraphQLObjectType({
  name: 'LocalizedMessageValue',
  fields: {
    key: { type: new GraphQLNonNull(GraphQLString) },
    value: { type: new GraphQLNonNull(GraphQLString) },
  },
});

const LocalizedMessageType = new GraphQLObjectType({
  name: 'LocalizedMessage',
  fields: {
    id: { type: new GraphQLNonNull(GraphQLString) },
    defaultMessage: { type: new GraphQLNonNull(GraphQLString) },
    values: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(LocalizedMessageValueType))),
    },
  },
});

const UserRefType = new GraphQLObjectType({
  name: 'UserRef',
  fields: {
    id: { type: new GraphQLNonNull(GraphQLID) },
    email: { type: new GraphQLNonNull(GraphQLString) },
    givenName: { type: new GraphQLNonNull(GraphQLString) },
    familyName: { type: new GraphQLNonNull(GraphQLString) },
    displayName: { type: new GraphQLNonNull(GraphQLString) },
    type: { type: new GraphQLNonNull(GraphQLString) },
  },
});

const ActivityTargetType = new GraphQLObjectType({
  name: 'ActivityTarget',
  fields: {
    type: { type: new GraphQLNonNull(GraphQLString) },
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
  },
});

const ActivityOrganizationType = new GraphQLObjectType({
  name: 'ActivityOrganization',
  fields: {
    id: { type: GraphQLID },
    referenceId: { type: new GraphQLNonNull(GraphQLString) },
    name: { type: new GraphQLNonNull(GraphQLString) },
  },
});

export const ActivityRecordType = new GraphQLObjectType({
  name: 'ActivityRecord',
  fields: {
    id: { type: new GraphQLNonNull(GraphQLID) },
    actor: { type: new GraphQLNonNull(UserRefType) },
    target: { type: new GraphQLNonNull(ActivityTargetType) },
    organization: { type: ActivityOrganizationType },
    action: { type: new GraphQLNonNull(GraphQLString) },
    actionLabel: { type: new GraphQLNonNull(LocalizedMessageType) },
    summaryMessage: { type: new GraphQLNonNull(LocalizedMessageType) },
    summary: { type: new GraphQLNonNull(GraphQLString) },
    result: { type: new GraphQLNonNull(ActivityResultType) },
    eventTime: { type: new GraphQLNonNull(GraphQLString) },
  },
});

export const ActivityLogPageType = createPageType('ActivityLogPage', ActivityRecordType);

export const ActivityLogListInputType = new GraphQLInputObjectType({
  name: 'ActivityLogListInput',
  fields: {
    ...PageInputFields,
    targetUserId: { type: GraphQLID },
    organizationId: { type: GraphQLID },
    searchString: { type: GraphQLString },
    results: { type: new GraphQLList(new GraphQLNonNull(ActivityResultType)) },
    actions: { type: new GraphQLList(new GraphQLNonNull(GraphQLString)) },
  },
});
