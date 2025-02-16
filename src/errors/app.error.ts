class AppError extends Error {
  public statusCode: number;
  public errorDetails?: unknown;

  constructor(
    statusCode: number,
    message: string,
    errorDetails?: unknown,
    stack?: string,
  ) {
    super(message);
    this.statusCode = statusCode;
    this.errorDetails = errorDetails;

    // Object.setPrototypeOf(this, AppError.prototype);

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }

  // Generate a structured error response
  toResponse() {
    return {
      success: false,
      message: this.message,
      statusCode: this.statusCode,
      error: this.errorDetails || null,
      stack: this.stack || null,
    };
  }
}

export default AppError;
