import { ReasonPhrases, StatusCodes } from 'http-status-codes'
import { successResponse } from '~/core/successResponse'
import { authService } from '~/services/authService'


const signUp = async (req, res) => {

  return successResponse(res, {
    metadata: await authService.signUp(req.body),
    statusCode: StatusCodes.CREATED,
    message: ReasonPhrases.CREATED
  })
  
}

const login = async (req, res) => {
  
  return successResponse(res, {
    metadata: await authService.login(req.body),
    statusCode: StatusCodes.OK,
    message: ReasonPhrases.OK
  })
  
}

const logout = async (req, res) => {
  
  return successResponse(res, {
    metadata: await authService.logout(req.keyStore),
    statusCode: StatusCodes.OK,
    message: 'Logout success'
  })
  
}
const refreshToken = async (req, res) => {
  
  return successResponse(res, {
    metadata: await authService.handleRefreshToken(req.body.refreshToken),
    statusCode: StatusCodes.OK,
    message: ReasonPhrases.OK
  })
  
}

export const userController = {
  signUp,
  login,
  logout,
  refreshToken
}