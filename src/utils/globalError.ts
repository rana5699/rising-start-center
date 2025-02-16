/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { StatusCodes } from 'http-status-codes';
import { NextFunction, Request, Response } from 'express';
import {
  handleDuplicateError,
  handleMongooseCastError,
  handleMongooseValidationError,
  handleZodValidationError,
} from '../errors/handleErrors';
import { ZodError } from 'zod';

// Define error interface
interface IError extends Error {
  status?: number;
  stack?: string;
  errors?: { path: string; message: string }[];
}

// Global error handler
const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  let statusCode = err.status || StatusCodes.INTERNAL_SERVER_ERROR;
  let message = err.message || 'Something went wrong!';
  let error: any = {};

  if (err instanceof ZodError) {
    const zodError = handleZodValidationError(err);
    statusCode = zodError.statusCode;
    message = zodError.message;
    error = zodError.error;
  } else if (err?.name === 'ValidationError') {
    const mongooseValidationError = handleMongooseValidationError(err);
    statusCode = mongooseValidationError.statusCode;
    message = mongooseValidationError.message;
    error = mongooseValidationError.error;
  } else if (err?.name === 'CastError') {
    const castError = handleMongooseCastError(err);
    statusCode = castError.statusCode;
    message = castError.message;
    error = castError.error;
  } else if (err?.name === 'MongoServerError' && err.code === 11000) {
    const duplicateError = handleDuplicateError(err);
    statusCode = duplicateError.statusCode;
    message = duplicateError.message;
    error = duplicateError.error;
  } else {
    // Send response with error details
    res.status(statusCode).json({
      success: false,
      message,
      error: error.errors || error,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
    });
  }
};

export default globalErrorHandler;
