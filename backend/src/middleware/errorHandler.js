const errorHandler = (err, req, res, next) => {
  console.error('Error:', err.stack)

  // Default error status and message
  const status = err.status || 500
  const message = err.message || 'Internal Server Error'

  res.status(status).json({
    error: {
      message,
      status,
      ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    }
  })
}

export default errorHandler;