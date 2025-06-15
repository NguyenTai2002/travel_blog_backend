
import  expressAsyncHandler  from 'express-async-handler'
import { authUtils } from '~/auth/authUtils'
import { authController } from '~/controllers/authController'
import { AuthFailureError, NotFoundError } from '~/core/errorResponse'
import { keyTokenRepository } from '~/models/repositories/keyTokenRepository'
import { HEADER } from '~/utils/constants'


const authentication = expressAsyncHandler(async (req, res, next) => {

  const userId = req.headers[HEADER.CLIENT_ID]

  if (!userId) throw new AuthFailureError('Invalid request 1')

  const keyStore = await keyTokenRepository.findOneByUserId(userId)

  if (!keyStore) throw new NotFoundError('Not found keystore')

  const accessToken = req.cookies.accessToken

  if (!accessToken) throw new AuthFailureError('Invalid request 2')

  const decodedUser = await authUtils.verifyToken(accessToken, keyStore?.publicKey)

  if (userId !== decodedUser.userId) throw new AuthFailureError('Invalid request 3')

  req.keyStore = keyStore

  return next()
})




export const authenticationV2 = expressAsyncHandler(async (req, res, next) => {

  const userId = req.headers[HEADER.CLIENT_ID]

  if (!userId) throw new AuthFailureError('Invalid request 1')

  const keyStore = await keyTokenRepository.findOneByUserId(userId)

  if (!keyStore) throw new NotFoundError('Not found keystore')

  if (req._parsedUrl.pathname === '/refresh-token') {

    const refreshToken = req.cookies.refreshToken

    if (!refreshToken) throw new AuthFailureError('Invalid request 4')

    try {


      const decodedRefreshToken = await authUtils.decodeToken(refreshToken, keyStore?.privateKey)

      if (userId !== decodedRefreshToken.userId) throw new AuthFailureError('Invalid request 4')
      
      req.keyStore = keyStore
      req.user = decodedRefreshToken
      req.refreshToken = refreshToken
      return next()
    } catch (error) {
      throw error
    }
  }


  const accessToken = req.cookies.accessToken

  if (!accessToken) throw new AuthFailureError('Invalid request 2')

  const decodedUser = await authUtils.verifyToken(accessToken, keyStore?.publicKey)

  
  if (userId !== decodedUser.userId) throw new AuthFailureError('Invalid request 3')

  req.keyStore = keyStore

  return next()
})




export default authentication