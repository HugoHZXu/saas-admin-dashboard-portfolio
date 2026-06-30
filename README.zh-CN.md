# Hugo SaaS Console

> 语言：[English](README.md) | 简体中文

一个基于 React + TypeScript + 模块联邦（Module Federation）+ GraphQL 的 B2B SaaS 管理后台前端作品集项目。

本项目展示了一套现代化的微前端架构，涵盖租户运营、组织/用户管理、操作日志（Activity Log）等典型 B 端场景。所有数据均为模拟演示数据，不包含真实客户信息、生产环境接口或私有业务逻辑。

## 项目亮点

- **模块联邦架构** — 主应用（`admin-console`）作为宿主，动态加载组织管理、用户管理两个独立部署的子应用（remote）
- **典型 B 端工作流** — 高密度数据表格、详情页、操作日志视图，由 GraphQL BFF 层提供数据支撑
- **外部设计系统** — 通过 `@hugo-ui/mui` npm 包引入 UI 组件
- **pnpm monorepo** — 主应用、共享工具库、功能模块之间边界清晰，职责分离

## 截图

以下截图截自本地开发环境，使用模拟演示数据。

### 组织管理（Organization Management）

| 列表                                                       | 详情                                                                      | 操作日志                                                               |
| ---------------------------------------------------------- | ------------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| ![Organization list](docs/assets/screenshots/org-list.jpg) | ![Organization detail](docs/assets/screenshots/org-detail-acme-cloud.jpg) | ![Organization Activity Log](docs/assets/screenshots/org-activity-log.jpg) |

### 用户管理（User Management）

| 列表                                                           | 详情                                                             | 操作日志                                                                   |
| -------------------------------------------------------------- | ------------------------------------------------------------------ | ------------------------------------------------------------------------------ |
| ![User list](docs/assets/screenshots/user-list-acme-cloud.jpg) | ![User detail](docs/assets/screenshots/user-detail-mina-patel.jpg) | ![User Activity Log](docs/assets/screenshots/user-activity-log-acme-cloud.jpg) |

## 项目结构

```
packages/
├── admin-console/      # 主应用壳 + 模块联邦入口
├── admin-shared/       # 共享的会话状态、身份验证、UI 工具函数
├── org-management/     # 组织管理子应用（列表、详情、操作日志）
└── user-management/    # 用户管理子应用（列表、详情、操作日志）
```

本项目依赖两个外部配套仓库：

| 依赖 | 仓库 | 用途 |
|------|------|------|
| Admin BFF 后端 | [HugoHZXu/hugo-saas-backend](https://github.com/HugoHZXu/hugo-saas-backend) | GraphQL 接口、数据库 Schema、种子数据、操作日志数据规范化 |
| 设计系统 | [HugoHZXu/hugo-ui](https://github.com/HugoHZXu/hugo-ui) | 可复用 UI 组件（`@hugo-ui/mui`）、Storybook、设计令牌 |

## 快速开始

### 环境要求

- Node.js `>=26.4.0`
- pnpm `>=11.7.0 <12`

### 1. 安装依赖

```bash
pnpm install
```

### 2. 启动后端

前端需要运行 Admin BFF 服务。请在另一个终端中克隆并启动后端：

```bash
git clone https://github.com/HugoHZXu/hugo-saas-backend.git ../hugo-saas-backend
cd ../hugo-saas-backend
pnpm install
pnpm run db:reset
pnpm run dev:admin-bff
```

### 3. 启动前端

回到本仓库目录：

```bash
pnpm run dev
```

该命令会同时启动三个应用：

| 服务 | 地址 |
|------|------|
| 管理后台主应用（宿主） | http://127.0.0.1:5173 |
| 组织管理子应用（远程模块） | http://127.0.0.1:5174 |
| 用户管理子应用（远程模块） | http://127.0.0.1:5175 |
| Admin BFF GraphQL 接口 | http://127.0.0.1:4010/graphql |

如果需要单独启动某个应用，可以使用：`pnpm run dev:org-management`、`pnpm run dev:user-management`、`pnpm run dev:admin-console`。

打开浏览器访问 http://127.0.0.1:5173 即可查看管理后台。

## 文档

| 主题 | English | 简体中文 |
|------|---------|----------|
| 项目概览与范围说明 | [`docs/project-brief.md`](docs/project-brief.md) | [`docs/project-brief.zh-CN.md`](docs/project-brief.zh-CN.md) |
| 模块联邦部署说明 | [`docs/module-federation-deployment.md`](docs/module-federation-deployment.md) | [`docs/module-federation-deployment.zh-CN.md`](docs/module-federation-deployment.zh-CN.md) |

## 设计系统集成

UI 组件通过外部 `@hugo-ui/mui` npm 包引入：

```tsx
import { HugoUIProvider, Table } from '@hugo-ui/mui';
```

## 验证检查

运行完整验证流程：

```bash
pnpm run verify
```

也可以单独运行各项检查：

```bash
pnpm run typecheck
pnpm run test:frontend
pnpm run build:all
```
