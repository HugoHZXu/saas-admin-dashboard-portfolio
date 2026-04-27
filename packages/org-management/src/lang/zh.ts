const zhMessages: Record<string, string> = {
  'orgManagement.activity.column.actor': '操作者',
  'orgManagement.activity.column.activity': '活动',
  'orgManagement.activity.column.organization': '组织',
  'orgManagement.activity.column.result': '结果',
  'orgManagement.activity.column.eventTime': '事件时间',
  'orgManagement.activity.emptyOrganization': '无关联组织',

  'orgManagement.activity.result.success': '成功',
  'orgManagement.activity.result.failed': '失败',
  'orgManagement.activity.result.partial': '部分成功',
  'orgManagement.activity.result.unknown': '未知',

  'orgManagement.activity.action.organizationCreated': '创建组织',
  'orgManagement.activity.action.organizationUpdated': '更新组织',
  'orgManagement.activity.action.organizationArchived': '归档组织',
  'orgManagement.activity.action.domainVerified': '验证域名',
  'orgManagement.activity.action.domainUpdated': '更新域名',
  'orgManagement.activity.action.adminAdded': '添加管理员',
  'orgManagement.activity.action.userDisabled': '停用用户',
  'orgManagement.activity.action.unknown': '未映射活动',

  'orgManagement.activity.summary.organizationCreated': '{actorName} 创建了组织 {targetName}。',
  'orgManagement.activity.summary.organizationUpdated':
    '{actorName} 更新了组织 {targetName} 的设置。',
  'orgManagement.activity.summary.organizationArchived': '{actorName} 归档了组织 {targetName}。',
  'orgManagement.activity.summary.domainVerified': '{actorName} 验证了域名 {targetName}。',
  'orgManagement.activity.summary.domainUpdated': '{actorName} 更新了域名 {targetName} 的设置。',
  'orgManagement.activity.summary.domainUpdated.partial':
    '{actorName} 部分完成了域名 {targetName} 的设置更新。',
  'orgManagement.activity.summary.adminAdded': '{actorName} 将 {targetName} 添加为组织管理员。',
  'orgManagement.activity.summary.userDisabled': '{actorName} 停用了用户 {targetName}。',
  'orgManagement.activity.summary.userDisabled.failed':
    '{actorName} 尝试停用用户 {targetName}，但请求失败。',
  'orgManagement.activity.summary.unknown': '{actorName} 对 {targetName} 执行了未映射活动。',
  'orgManagement.activity.summary.unknown.failed':
    '{actorName} 对 {targetName} 执行了未映射活动，但请求失败。',
};

export default zhMessages;
