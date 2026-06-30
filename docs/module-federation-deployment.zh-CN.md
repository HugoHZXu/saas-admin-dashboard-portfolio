# 模块联邦部署说明

> 语言：[English](./module-federation-deployment.md) | 简体中文

Hugo SaaS Console 将 `admin-console` 作为管理后台的浏览器入口。虽然 `user-management` 和 `org-management` 在开发阶段可以作为独立应用运行，但在生产环境中，它们应该作为模块联邦（Module Federation）远程模块（remote）被主应用加载。

## 本地开发默认配置

| 服务 | 默认地址 |
|------|----------|
| `admin-console`（宿主主应用） | http://127.0.0.1:5173 |
| `org-management`（远程模块） | http://127.0.0.1:5174 |
| `user-management`（远程模块） | http://127.0.0.1:5175 |
| Admin BFF GraphQL 接口 | http://127.0.0.1:4010/graphql |

### 端口配置

开发和预览端口可以通过环境变量覆盖，无需修改 package.json 脚本：

- `VITE_ADMIN_CONSOLE_PORT`、`VITE_ADMIN_CONSOLE_PREVIEW_PORT`
- `VITE_ORG_MANAGEMENT_PORT`、`VITE_ORG_MANAGEMENT_PREVIEW_PORT`
- `VITE_USER_MANAGEMENT_PORT`、`VITE_USER_MANAGEMENT_PREVIEW_PORT`
- `VITE_DEV_PORT`、`VITE_PREVIEW_PORT` 或 `PORT` 作为通用兜底

### 远程模块入口地址

主应用从以下环境变量读取远程模块的入口 URL：

- `VITE_USER_MANAGEMENT_REMOTE_ENTRY`
- `VITE_ORG_MANAGEMENT_REMOTE_ENTRY`
- `VITE_USER_MANAGEMENT_REMOTE_ENTRY_URL`
- `VITE_ORG_MANAGEMENT_REMOTE_ENTRY_URL`

默认值指向本地的 User Management 和 Organization Management 开发服务器。

### GraphQL 接口地址

GraphQL 接口由外部后端仓库 [hugo-saas-backend](https://github.com/HugoHZXu/hugo-saas-backend) 提供。所有前端包默认共享 `VITE_ADMIN_BFF_GRAPHQL_URL`，本地调试时也可以为单个应用单独覆盖。

## 生产环境路由

生产环境中，对远程模块域名的直接请求应该在 CDN、负载均衡器或边缘路由层处理。

推荐的路由策略：

- 从各个远程模块域名提供 `/remoteEntry.js` 和 `/assets/*` 等静态资源。
- 将浏览器直接访问远程模块根路径的请求重定向回主应用对应的路由。
- 让主应用域名处理所有面向用户的路由，如 `/user-management` 和 `/org-management`。

使用占位域名的示例配置：

| 请求 | 处理方式 |
|------|----------|
| `https://user.example.com/remoteEntry.js` | 返回 User Management 远程模块入口 |
| `https://user.example.com/assets/*` | 返回 User Management 静态资源 |
| `https://user.example.com/` | 重定向到 `https://admin.example.com/user-management` |
| `https://org.example.com/` | 重定向到 `https://admin.example.com/org-management` |
