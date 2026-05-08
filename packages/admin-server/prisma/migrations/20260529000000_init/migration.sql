CREATE TABLE "users" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "email" TEXT NOT NULL,
  "first_name" TEXT NOT NULL,
  "last_name" TEXT NOT NULL,
  "account_status" TEXT NOT NULL,
  "flagged_for_deletion" BOOLEAN NOT NULL DEFAULT false,
  "last_signed_in" DATETIME,
  "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" DATETIME NOT NULL
);

CREATE TABLE "organizations" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "reference_id" TEXT NOT NULL,
  "name" TEXT NOT NULL,
  "description" TEXT,
  "address" TEXT,
  "address2" TEXT,
  "city" TEXT,
  "region" TEXT,
  "postal_code" TEXT,
  "country" TEXT NOT NULL,
  "timezone" TEXT,
  "domain_name" TEXT NOT NULL,
  "status" TEXT NOT NULL,
  "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" DATETIME NOT NULL
);

CREATE TABLE "roles" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "key" TEXT NOT NULL,
  "name" TEXT NOT NULL
);

CREATE TABLE "organization_memberships" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "user_id" TEXT NOT NULL,
  "organization_id" TEXT NOT NULL,
  "membership_status" TEXT NOT NULL,
  "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" DATETIME NOT NULL,
  CONSTRAINT "organization_memberships_user_id_fkey"
    FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT "organization_memberships_organization_id_fkey"
    FOREIGN KEY ("organization_id") REFERENCES "organizations" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE "membership_role_assignments" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "membership_id" TEXT NOT NULL,
  "role_id" TEXT NOT NULL,
  CONSTRAINT "membership_role_assignments_membership_id_fkey"
    FOREIGN KEY ("membership_id") REFERENCES "organization_memberships" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT "membership_role_assignments_role_id_fkey"
    FOREIGN KEY ("role_id") REFERENCES "roles" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE "activity_events" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "actor_user_id" TEXT,
  "target_user_id" TEXT,
  "organization_id" TEXT,
  "action" TEXT NOT NULL,
  "result" TEXT NOT NULL,
  "message" TEXT NOT NULL,
  "metadata_json" TEXT,
  "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "activity_events_actor_user_id_fkey"
    FOREIGN KEY ("actor_user_id") REFERENCES "users" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT "activity_events_target_user_id_fkey"
    FOREIGN KEY ("target_user_id") REFERENCES "users" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT "activity_events_organization_id_fkey"
    FOREIGN KEY ("organization_id") REFERENCES "organizations" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

CREATE UNIQUE INDEX "users_email_key" ON "users"("email");
CREATE UNIQUE INDEX "organizations_reference_id_key" ON "organizations"("reference_id");
CREATE UNIQUE INDEX "roles_key_key" ON "roles"("key");
CREATE UNIQUE INDEX "organization_memberships_user_id_organization_id_key"
  ON "organization_memberships"("user_id", "organization_id");
CREATE UNIQUE INDEX "membership_role_assignments_membership_id_role_id_key"
  ON "membership_role_assignments"("membership_id", "role_id");
CREATE INDEX "organization_memberships_user_id_idx" ON "organization_memberships"("user_id");
CREATE INDEX "organization_memberships_organization_id_idx" ON "organization_memberships"("organization_id");
CREATE INDEX "membership_role_assignments_membership_id_idx" ON "membership_role_assignments"("membership_id");
CREATE INDEX "activity_events_target_user_id_idx" ON "activity_events"("target_user_id");
CREATE INDEX "activity_events_organization_id_idx" ON "activity_events"("organization_id");
CREATE INDEX "activity_events_created_at_idx" ON "activity_events"("created_at");
