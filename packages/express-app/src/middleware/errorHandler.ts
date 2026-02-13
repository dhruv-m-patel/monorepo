import { Response, NextFunction } from 'express';
import { ApiError, ApiRequest } from '../types';

/**
 * Final error handler middleware.
 * Catches all unhandled route errors and returns a structured JSON response.
 */
export function finalErrorHandler(
  err: ApiError,
  req: ApiRequest,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction
): void {
  if (err) {
    console.error(err.message, err.stack);
    res.status(err.status || 500).json({
      message: err.message || 'Internal server error',
    });
  } else {
    next();
  }
}
