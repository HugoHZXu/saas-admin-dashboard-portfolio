# 项目简介

> 语言：[English](./project-brief.md) | 简体中文

## 概览

Hugo SaaS Console 是一个 B2B SaaS 管理后台前端作品集项目。它展示了构建微前端管理界面的实用模式——包括可复用的 UI 组合、高密度数据交互、操作日志视图、GraphQL 客户端集成等——全部使用模拟演示数据，不暴露任何私有代码或真实业务信息。

项目刻意保持小而聚焦，旨在展示：

- 通过外部设计系统包组合管理后台 UI
- 高密度表格与详情页交互模式
- 操作日志（Activity Log）UI 设计
- 与本地 BFF 层对接的 GraphQL 客户端集成
- 边界清晰的模块联邦（Module Federation）架构

## 当前状态

目前项目是一个可运行的 monorepo，包含：

- 模块联邦宿主主应用（`admin-console`）
- 两个功能子应用（remote）：组织管理和用户管理
- 通过 npm 包引入的设计系统组件（`@hugo-ui/mui`）
- 配置好的 GraphQL 客户端，对接外部 Admin BFF 服务

后端 BFF、数据库 Schema 和种子数据位于独立的 [hugo-saas-backend](https://github.com/HugoHZXu/hugo-saas-backend) 仓库，前端通过 `VITE_ADMIN_BFF_GRAPHQL_URL` 环境变量连接。

### 已实现功能

- 基于 pnpm workspace 的工程化配置（React、TypeScript、Vite、Vitest、GraphQL 客户端）
- 通过标准 npm 包方式消费 `@hugo-ui/mui` 设计系统
- `admin-console` 模块联邦宿主壳应用
- `org-management` 和 `user-management` 两个子应用，包含列表、详情、操作日志页面
- 前端 GraphQL 客户端配置，对接外部 Admin BFF
- 消费后端规范化数据的操作日志 UI

### 刻意保持轻量化的部分

- 身份验证使用后端提供的模拟会话状态（没有接入真实身份提供商）
- 部署文档仅为示意，不是生产环境基础设施指导
- 用户管理覆盖组织场景下的工作流，但不是完整的 IAM 平台
- 高级表格功能（列宽调整、吸顶表头、批量操作、列配置）不在范围内

## 产品范围

作品集聚焦三个完成度较高的模块：

1. **组织列表表格** — 带排序、分页、跳转的高密度数据列表
2. **组织/用户详情页** — 包含成员关系和角色管理的详情视图
3. **操作日志** — 组织和用户维度的规范化审计轨迹展示

设计系统的 UI 组件在项目边界内保持通用性；搜索、筛选、查询状态管理、数据转换、路由跳转等逻辑放在页面代码中处理。后端查询逻辑和数据规范化由 [hugo-saas-backend](https://github.com/HugoHZXu/hugo-saas-backend) 仓库负责。
