
export const errorHandlingMiddleware = (err, req, res, next) => {

  const statusCode = err.status || 500
  return res.status(statusCode).json({
    status: 'error',
    code: statusCode,
    message: err.message || 'Internal Server Error'
  })
}