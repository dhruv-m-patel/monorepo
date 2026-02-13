import { Response } from 'express';
import { ApiRequest } from '../types';

/**
 * Creates a health check route handler.
 * Returns a 200 response with the app name and health status.
 */
export function createHealthCheck(appName: string) {
  return (req: ApiRequest, res: Response): void => {
    res.status(200).send(`${appName} is healthy`);
  };
}
