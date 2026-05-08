ALTER TABLE "organizations" ADD COLUMN "kind" TEXT NOT NULL DEFAULT 'tenant';

CREATE INDEX "organizations_kind_idx" ON "organizations"("kind");
