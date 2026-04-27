import { graphql, GraphQLSchema } from 'graphql';

type ExecuteMockGraphqlOptions<TVariables extends Record<string, unknown>> = {
  schema: GraphQLSchema;
  source: string;
  variableValues?: TVariables;
};

export const executeMockGraphql = async <
  TData,
  TVariables extends Record<string, unknown> = Record<string, never>,
>({
  schema,
  source,
  variableValues,
}: ExecuteMockGraphqlOptions<TVariables>): Promise<TData> => {
  const result = await graphql({
    schema,
    source,
    variableValues,
  });

  if (result.errors?.length) {
    throw new Error(
      `Mock upstream GraphQL error: ${result.errors.map((error) => error.message).join('; ')}`
    );
  }

  if (!result.data) {
    throw new Error('Mock upstream GraphQL response did not include data.');
  }

  return result.data as TData;
};
