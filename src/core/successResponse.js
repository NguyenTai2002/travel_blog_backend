import { ReasonPhrases, StatusCodes } from 'http-status-codes'


export const successResponse = (res, {
  statusCode = StatusCodes.OK,
  message = ReasonPhrases.OK,
  metadata = {},
  headers = {},
  options = {
    // limit, page, totalPage...
  }
}) => { 

  Object.entries(headers).forEach(([key, value]) => {
    res.setHeader(key, value)
  })

  const response = {
    status: statusCode,
    message,
    metadata
  } 

  if (Object.keys(options).length > 0) {
    response.options = options
  }

  return res.status(statusCode).json(response)
}