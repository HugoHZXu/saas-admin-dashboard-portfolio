/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_ORG_MANAGEMENT_GRAPHQL_URL?: string;
  readonly VITE_ADMIN_BFF_GRAPHQL_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
