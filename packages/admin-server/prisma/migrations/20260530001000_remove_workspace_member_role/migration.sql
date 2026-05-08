DELETE FROM "membership_role_assignments"
WHERE "role_id" IN (
  SELECT "id" FROM "roles" WHERE "key" = 'workspace_member'
);

DELETE FROM "roles"
WHERE "key" = 'workspace_member';
