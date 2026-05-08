INSERT INTO "roles" ("id", "key", "name")
VALUES ('role-workspace-manager', 'workspace_manager', 'Workspace Manager')
ON CONFLICT("key") DO UPDATE SET "name" = excluded."name";
