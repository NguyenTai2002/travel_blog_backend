import { ReasonPhrases, StatusCodes } from 'http-status-codes'
import ms from 'ms'
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

  const loginData = await authService.login(req.body)

  const refreshToken = loginData.tokens.refreshToken
  const accessToken = loginData.tokens.accessToken

  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: ms('14 days'),
    sameSite: 'strict'
  })
  
  res.cookie('accessToken', accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: ms('14 days'),
    sameSite: 'strict'
  })

  return successResponse(res, {
    metadata: loginData,
    statusCode: StatusCodes.OK,
    message: ReasonPhrases.OK
  })
  
}

const logout = async (req, res) => {

  const logoutResult = await authService.logout(req.keyStore)
  
  res.clearCookie('refreshToken')
  res.clearCookie('accessToken')
  
  return successResponse(res, {
    metadata: logoutResult,
    statusCode: StatusCodes.OK,
    message: 'Logout success'
  })
  
}


const refreshToken = async (req, res) => {

  const refreshToken = req.refreshToken
  const keyStore = req.keyStore
  const user = req.user

  const newTokens = await authService.handleRefreshToken({refreshToken, keyStore, user})

  const newRefreshToken = newTokens.tokens.refreshToken
  const newAccessToken = newTokens.tokens.accessToken

  res.cookie('refreshToken', newRefreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: ms('14 days'),
    sameSite: 'strict'
  })
  
  res.cookie('accessToken', newAccessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: ms('14 days'),
    sameSite: 'strict'
  })
  
  return successResponse(res, {
    metadata: newTokens,
    statusCode: StatusCodes.OK,
    message: ReasonPhrases.OK
  })
  
}

export const authController = {
  signUp,
  login,
  logout,
  refreshToken
}