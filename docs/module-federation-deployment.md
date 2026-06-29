# Module Federation Deployment Notes

Hugo SaaS Console treats `admin-console` as the browser entry point for the admin dashboard shell.
`user-management` and `org-management` can still run as standalone dev apps, but their production
remote domains should be served as Module Federation remotes when loaded by the shell.

## Local Defaults

- `admin-console`: `http://127.0.0.1:5173`
- `org-management`: `http://127.0.0.1:5174`
- `user-management`: `http://127.0.0.1:5175`
- External Admin BFF GraphQL: `http://127.0.0.1:4010/graphql`

Dev and preview ports can be overridden without editing package scripts:

- `VITE_ADMIN_CONSOLE_PORT`, `VITE_ADMIN_CONSOLE_PREVIEW_PORT`
- `VITE_ORG_MANAGEMENT_PORT`, `VITE_ORG_MANAGEMENT_PREVIEW_PORT`
- `VITE_USER_MANAGEMENT_PORT`, `VITE_USER_MANAGEMENT_PREVIEW_PORT`
- `VITE_DEV_PORT`, `VITE_PREVIEW_PORT`, or `PORT` as shared fallbacks

The shell reads remote entry URLs from:

- `VITE_USER_MANAGEMENT_REMOTE_ENTRY`
- `VITE_ORG_MANAGEMENT_REMOTE_ENTRY`
- `VITE_USER_MANAGEMENT_REMOTE_ENTRY_URL`
- `VITE_ORG_MANAGEMENT_REMOTE_ENTRY_URL`

The default values point to the local User Management and Organization Management dev servers.

The GraphQL endpoint is served by the external backend repository at `/Users/xuhaoze/code-demo/hugo-saas-backend`. Dashboard packages can share `VITE_ADMIN_BFF_GRAPHQL_URL`, with per-app overrides available for local experiments.

## Production Routing

For production, prefer handling direct remote-domain document requests at the CDN, load balancer,
or edge routing layer.

Recommended behavior:

- Serve remote assets such as `/remoteEntry.js` and `/assets/*` from each remote domain.
- Redirect browser document requests for a remote app root back to the shell route.
- Keep the shell domain responsible for user-facing routes such as `/user-management` and
  `/org-management`.

Example policy, using placeholder domains:

- `https://user.example.com/remoteEntry.js` serves the User Management remote entry.
- `https://user.example.com/assets/*` serves User Management static assets.
- `https://user.example.com/` redirects to `https://admin.example.com/user-management`.
- `https://org.example.com/` redirects to `https://admin.example.com/org-management`.

This keeps direct remote app hosting from exposing a standalone production shell while preserving
local standalone development for each package.
