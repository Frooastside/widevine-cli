declare global {
  namespace NodeJS {
    interface ProcessEnv {
      WVCLI_CREDENTIALS?: string;
      WVCLI_REFRESH_TOKEN?: string;
    }
  }
}
