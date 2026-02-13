import { Application, Request } from 'express';

export type ApiSpecType = 'openapi' | 'swagger';

export interface AppConfigOptions {
  appName?: string;
  apiOptions?: {
    apiSpec: string;
    specType: ApiSpecType;
    validateResponses?: boolean;
  };
  setup?: (app: Application) => void | Promise<void>;
  useBabel?: boolean;
}

export interface ApiError extends Error {
  status?: number;
}

export interface ApiRequest extends Request {
  id?: string;
}

export interface ApiStartupOptions {
  useClusteredStart?: boolean;
  port?: number;
  appName?: string;
  setup?: () => void | Promise<void>;
  callback?: () => void;
}
