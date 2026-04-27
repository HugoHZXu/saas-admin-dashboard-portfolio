import cors from '@koa/cors';
import Koa from 'koa';
import mount from 'koa-mount';
import { createHandler } from 'graphql-http/lib/use/koa';
import { createOrgManagementSchema } from '../graphql/schema';

export const createOrgManagementServerApp = () => {
  const app = new Koa();
  const schema = createOrgManagementSchema();

  app.use(cors({ origin: '*' }));

  app.use(async (ctx, next) => {
    if (ctx.path === '/healthz' && ctx.method === 'GET') {
      ctx.status = 200;
      ctx.body = {
        status: 'ok',
        service: 'org-management-server',
      };
      return;
    }

    await next();
  });

  app.use(async (ctx, next) => {
    if (ctx.path === '/graphql' && ctx.method !== 'POST' && ctx.method !== 'OPTIONS') {
      ctx.status = 405;
      ctx.body = {
        error: 'GraphQL endpoint accepts POST requests only.',
      };
      return;
    }

    await next();
  });

  app.use(
    mount(
      '/graphql',
      createHandler({
        schema,
      })
    )
  );

  return app;
};
