/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string; // La URL de la API
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}