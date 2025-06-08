
import  expressAsyncHandler  from 'express-async-handler'
import { authUtils } from '~/auth/authUtils'
import { AuthFailureError, NotFoundError } from '~/core/errorResponse'
import { keyTokenRepository } from '~/models/repositories/keyTokenRepository'
import { HEADER } from '~/utils/constants'


const authentication = expressAsyncHandler(async (req, res, next) => {
  const userId = req.headers[HEADER.CLIENT_ID]

  if (!userId) throw new AuthFailureError('Invalid request 1 ')

  const keyStore = await keyTokenRepository.findOneByUserId(userId)

  if (!keyStore) throw new NotFoundError('Not found keystore')

  const accessToken = req.headers[HEADER.AUTHORIZATION]

  if (!accessToken) throw new AuthFailureError('Invalid request 2')

  const decodedUser = await authUtils.verifyToken(accessToken, keyStore?.publicKey)

  if (userId !== decodedUser.userId) throw new AuthFailureError('Invalid request 3')

  req.keyStore = keyStore

  return next()
})


export default authentication