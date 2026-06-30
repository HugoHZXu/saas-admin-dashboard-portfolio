# Entitlement Import Contract Change Notice

本文档给 `admin-dashboard` 后续前端改造使用。后端变更来源是 `/Users/xuhaoze/code-demo/hugo-saas-backend` 的 Entitlement CSV bulk import 和 Admin BFF contract 更新。

## 变更摘要

- Bulk import validation 不再把合法 `assign` 的未注册用户标为 `blocked`。
- 未注册用户 row 现在返回 `status = "needsConfirmation"`，issue code 为 `unregistered_user`。
- Job 可能进入 `status = "awaitingConfirmation"`、`phase = "awaiting_unregistered_user_confirmation"`。
- 前端确认后调用现有 commit endpoint，并传 `{ "confirmUnregisteredUsers": true }`。
- 确认 commit 后，后端会创建 `Incomplete` 用户、`pending_activation` membership、`pending` access profile 和 `pending` allocation；pending allocation 仍占用 seat。
- Admin BFF 的 `organization(id).memberships.user` 新增 `accountStatus`，用于 Organization Detail 的 Manage Org Admins 弹窗禁用未激活用户。
- Admin BFF 会拒绝对 `Incomplete` 用户做用户状态、角色、组织成员和组织管理员变更。

## Entitlement Importer / Entitlement Console 影响

Result 页应按 job 字段判断动作：

```ts
if (job.blockedRows > 0) {
  // 显示 blocked 状态，不允许导入
} else if (job.canConfirmUnregisteredUsers) {
  // 显示 Confirm and Import
  await commitJob(job.id, { confirmUnregisteredUsers: true });
} else if (job.canCommit) {
  // 显示 Import
  await commitJob(job.id);
}
```

需要支持的新字段：

```ts
type BulkImportJob = {
  status: 'awaitingConfirmation' | ExistingBulkImportJobStatus;
  phase: 'awaiting_unregistered_user_confirmation' | ExistingBulkImportJobPhase;
  needsConfirmationRows: number;
  unregisteredUserCount: number;
  unregisteredSeatQuantity: number;
  canConfirmUnregisteredUsers: boolean;
};

type BulkImportJobRow = {
  status: 'needsConfirmation' | ExistingBulkImportRowStatus;
  issues: Array<{ code: 'unregistered_user' | ExistingBulkImportIssueCode }>;
};
```

UI 建议：

- `needsConfirmation` row 使用提示/待确认样式，不使用错误样式。
- Result summary 增加 “Unregistered users” 或 “Not activated users to create”。
- Confirm 文案说明：确认后这些用户会加入 User Management，状态为 `Incomplete`，并占用 entitlement seat。
- 有 `blockedRows > 0` 时不要显示 Confirm and Import。
- 完成后刷新 Entitlement Console allocation/read model，pending allocation 应显示为占用 seat。

## User Management 影响

当前 `packages/user-management` 已有 `UserAccountStatus = 'Active' | 'Suspended' | 'Incomplete'`，不需要新增枚举值。

建议修改：

- 列表页可把 `Incomplete` 展示文案调整为 `Not activated`，底层值保持 `Incomplete`。
- 用户详情页中 `accountStatus === 'Incomplete'` 时：
  - 不显示或禁用 Suspend / Activate。
  - 禁用 Edit roles。
  - 禁用 Remove user。
  - 显示一条说明：该用户尚未激活，不能在 User Management 中执行管理操作。
- 保存角色前仍应检查 `user.accountStatus !== 'Incomplete'`，避免 modal 状态残留导致提交。

后端会兜底返回 `USER_NOT_ACTIVATED`，前端应把该错误展示为不可操作提示。

## Organization Management 影响

`packages/org-management` 的 Organization Detail 查询需要增加字段：

```graphql
query Organization($id: ID!) {
  organization(id: $id) {
    memberships {
      id
      status
      user {
        id
        name
        email
        accountStatus
      }
      roles {
        id
        key
        name
      }
    }
  }
}
```

类型建议：

```ts
export type OrganizationMemberUser = {
  id: string;
  name: string;
  email: string;
  accountStatus: 'Active' | 'Suspended' | 'Incomplete';
};
```

Manage Org Admins 弹窗建议：

- `accountStatus === 'Incomplete'` 的成员 checkbox 禁用。
- 禁用说明可使用 “Not activated users cannot be assigned admin roles.”。
- 保存时过滤或阻止把 `Incomplete` 用户放入 `addUserIds`。
- 如果后端返回 `USER_NOT_ACTIVATED`，显示批量更新失败提示并刷新 organization detail。

## 建议验证

- `packages/user-management`: typecheck、相关页面测试、build。
- `packages/org-management`: typecheck、Organization Detail 页面测试、build。
- 如果 Entitlement Console 在本仓库或同一 shell 中消费这些字段，补 Result 页状态测试和 confirm commit API client 测试。
- 若跨 remote 联动，最后跑 admin-console build，确认 Module Federation host 仍能消费 remotes。
