# Module Federation Deployment Notes

> Languages: English | [简体中文](./module-federation-deployment.zh-CN.md)

Hugo SaaS Console uses `admin-console` as the browser entry point for the dashboard shell. While `user-management` and `org-management` can run as standalone apps during development, they should be served as Module Federation remotes in production when loaded by the shell.

## Local development defaults

| Service | Default URL |
|---------|-------------|
| `admin-console` (host) | http://127.0.0.1:5173 |
| `org-management` (remote) | http://127.0.0.1:5174 |
| `user-management` (remote) | http://127.0.0.1:5175 |
| Admin BFF GraphQL | http://127.0.0.1:4010/graphql |

### Port configuration

Dev and preview ports can be overridden via environment variables without modifying package scripts:

- `VITE_ADMIN_CONSOLE_PORT`, `VITE_ADMIN_CONSOLE_PREVIEW_PORT`
- `VITE_ORG_MANAGEMENT_PORT`, `VITE_ORG_MANAGEMENT_PREVIEW_PORT`
- `VITE_USER_MANAGEMENT_PORT`, `VITE_USER_MANAGEMENT_PREVIEW_PORT`
- `VITE_DEV_PORT`, `VITE_PREVIEW_PORT`, or `PORT` as shared fallbacks

### Remote entry URLs

The shell reads remote entry URLs from these environment variables:

- `VITE_USER_MANAGEMENT_REMOTE_ENTRY`
- `VITE_ORG_MANAGEMENT_REMOTE_ENTRY`
- `VITE_USER_MANAGEMENT_REMOTE_ENTRY_URL`
- `VITE_ORG_MANAGEMENT_REMOTE_ENTRY_URL`

Defaults point to the local dev servers for User Management and Organization Management.

### GraphQL endpoint

The GraphQL API is served by the external [hugo-saas-backend](https://github.com/HugoHZXu/hugo-saas-backend) repository. All dashboard packages share `VITE_ADMIN_BFF_GRAPHQL_URL` by default, with per-app overrides available for local testing.

## Production routing

In production, direct requests to remote domains should be handled at the CDN, load balancer, or edge routing layer.

Recommended routing behavior:

- Serve remote assets (`/remoteEntry.js`, `/assets/*`) from each remote domain.
- Redirect browser navigation requests to a remote app's root path back to the corresponding shell route.
- Let the shell domain handle all user-facing routes such as `/user-management` and `/org-management`.

Example with placeholder domains:

| Request | Behavior |
|---------|----------|
| `https://user.example.com/remoteEntry.js` | Serves User Management remote entry |
| `https://user.example.com/assets/*` | Serves User Management static assets |
| `https://user.example.com/` | Redirects to `https://admin.example.com/user-management` |
| `https://org.example.com/` | Redirects to `https://admin.example.com/org-management` |
