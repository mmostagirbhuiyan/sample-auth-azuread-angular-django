declare namespace NodeJS {
  /** Merge declaration with `process` in order to override the global-scoped env. */
  export interface ProcessEnv {
    /**
     * Built-in environment variable.
     * @see Docs https://github.com/chihab/ngx-env#ng_app_env.
     */
    readonly NG_APP_ENV: string;

    // Add your environment variables below
    readonly NG_APP_TENANT_ID: string;
    readonly NG_APP_CLIENT_ID: string;
    readonly NG_APP_REDIRECT_URI: string;
    readonly NG_APP_BACKEND_URL: string;
  }
}
