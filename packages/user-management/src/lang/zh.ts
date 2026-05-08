const zhMessages: Record<string, string> = {
  'userManagement.activity.column.actor': '操作者',
  'userManagement.activity.column.activity': '活动',
  'userManagement.activity.column.organization': '组织',
  'userManagement.activity.column.result': '结果',
  'userManagement.activity.column.eventTime': '事件时间',
  'userManagement.activity.emptyOrganization': '无关联组织',

  'userManagement.activity.result.success': '成功',
  'userManagement.activity.result.failed': '失败',
  'userManagement.activity.result.partial': '部分成功',
  'userManagement.activity.result.unknown': '未知',

  'userManagement.activity.action.ADD_USER_TO_ORGANIZATION': '添加用户到组织',
  'userManagement.activity.action.CHANGE_USER_ROLES': '修改用户角色',
  'userManagement.activity.action.REMOVE_USER_FROM_ORGANIZATION': '从组织移除用户',
  'userManagement.activity.action.SUSPEND_USER': '暂停用户',
  'userManagement.activity.action.ORGANIZATION_CREATED': '创建组织',
  'userManagement.activity.action.ORGANIZATION_UPDATED': '更新组织',
  'userManagement.activity.action.DOMAIN_VERIFIED': '验证域名',
  'userManagement.activity.action.UNKNOWN': '未映射活动',

  'userManagement.activity.summary.ADD_USER_TO_ORGANIZATION':
    '{actorName} 将 {targetName} 添加到 {organizationName}。',
  'userManagement.activity.summary.CHANGE_USER_ROLES':
    '{actorName} 修改了 {targetName} 在 {organizationName} 中的角色。',
  'userManagement.activity.summary.REMOVE_USER_FROM_ORGANIZATION':
    '{actorName} 将 {targetName} 从 {organizationName} 移除。',
  'userManagement.activity.summary.SUSPEND_USER': '{actorName} 暂停了 {targetName}。',
  'userManagement.activity.summary.ORGANIZATION_CREATED': '{actorName} 创建了 {organizationName}。',
  'userManagement.activity.summary.ORGANIZATION_UPDATED':
    '{actorName} 更新了 {organizationName} 的组织设置。',
  'userManagement.activity.summary.DOMAIN_VERIFIED':
    '{actorName} 验证了 {organizationName} 的域名。',
  'userManagement.activity.summary.UNKNOWN':
    '{actorName} 为 {targetName} 记录了未映射活动。',
};

export default zhMessages;
