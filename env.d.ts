/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string; // add your custom env variables here
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
