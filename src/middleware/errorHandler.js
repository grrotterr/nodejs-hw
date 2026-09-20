import createHttpError, { HttpError } from 'http-errors';

export const errorHandler = (err, _req, res, _next) => {
  if (err instanceof HttpError) {
    res.status(err.status).json({
      message: err.message,
    });

    return;
  }

  const error = createHttpError(500, err.message);

  res.status(error.status).json({
    message: error.message,
  });
};
