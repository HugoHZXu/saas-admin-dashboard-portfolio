/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_IDENTITY_SERVICE_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
