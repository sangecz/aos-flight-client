// Feel free to extend this interface
// depending on your app specific config.
export interface EnvConfig {
  API?: string;
  ENV?: string;
  APP_TITLE?: string;
}

export const Config: EnvConfig = JSON.parse('<%= ENV_CONFIG %>');

