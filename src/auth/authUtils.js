'use strict'

import JWT from 'jsonwebtoken'
import ErrorResponse, { AuthFailureError, NotFoundError } from '~/core/errorResponse'
import { HEADER } from '~/utils/constants'
import { keyTokenRepository } from '~/models/repositories/keyTokenRepository'

const createTokenPair = async (payload,publicKey, privateKey ) => {

  const accessToken = await JWT.sign(payload, publicKey, {
    expiresIn: '5 seconds'
  })

  const refreshToken = await JWT.sign(payload, privateKey, {
    expiresIn: '10 seconds'
  })

  return {accessToken, refreshToken}
}

const verifyToken = async (token, secretKey ) => {

  const decodedToken = JWT.verify(token, secretKey, (err, decoded) => {
    if (err) {
      console.error('error verify::', err.message);
      
      throw new AuthFailureError(err.message)
    }
    return decoded
  })
  return decodedToken
} 

const decodeToken = async (token, secretKey ) => {
  const decodedToken = JWT.decode(token, secretKey)

  if (!decodedToken) {
    throw new AuthFailureError('Cannot decode token')
  }

  return decodedToken
} 





export const authUtils = {
  createTokenPair,
  verifyToken, 
  decodeToken
}