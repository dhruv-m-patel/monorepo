import { Response, NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { ApiRequest } from '../types';

/**
 * Request tracing middleware.
 * Assigns a unique UUID to each incoming request for traceability.
 */
export function requestTracing(
  req: ApiRequest,
  res: Response,
  next: NextFunction
): void {
  if (!req.id) {
    req.id = uuidv4();
  }
  next();
}
