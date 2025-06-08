'use strict'

import JWT from 'jsonwebtoken'
import ErrorResponse, { AuthFailureError, NotFoundError } from '~/core/errorResponse'
import expressAsyncHandler from '../../node_modules/express-async-handler/index'
import { HEADER } from '~/utils/constants'
import { keyTokenRepository } from '~/models/repositories/keyTokenRepository'

const createTokenPair = async (payload,publicKey, privateKey ) => {

  const accessToken = await JWT.sign(payload, publicKey, {
    expiresIn: '2 days'
  })

  const refreshToken = await JWT.sign(payload, privateKey, {
    expiresIn: '7 days'
  })

  return {accessToken, refreshToken}
}

const verifyToken = async (token, secretKey ) => {

  const decodedToken = JWT.verify(token, secretKey, (err, decoded) => {
    if (err) {
      console.error('error verify::', err.message);
      
      throw new ErrorResponse('Error verify token')
    }
    return decoded
  })
  return decodedToken
} 





export const authUtils = {
  createTokenPair,
  verifyToken, 

}