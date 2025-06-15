import { StatusCodes } from 'http-status-codes';
import ErrorResponse, { AuthFailureError, BadRequestError, ForbiddenError, NotFoundError } from '~/core/errorResponse';
import { userRepository } from '~/models/repositories/userRepository';
import bcrypt from 'bcrypt'
import crypto from 'node:crypto'
import { keyTokenService } from './keyTokenService';
import { authUtils } from '~/auth/authUtils';
import { token } from 'morgan';
import { getInfoData } from '~/utils/index';
import { keyTokenRepository } from '~/models/repositories/keyTokenRepository';

const signUp = async ({name, email, password}) => {
  const existUser = await userRepository.findOneByEmail(email)

  if (existUser) {
    throw new ErrorResponse("User already registered", StatusCodes.CONFLICT)
  }

  const passwordHash =  bcrypt.hashSync(password, 10)

  const newUser = await userRepository.create({
    name, email, password: passwordHash
  })

  if (newUser) {

    const publicKey = crypto.randomBytes(64).toString('hex')
    const privateKey = crypto.randomBytes(64).toString('hex')

    const keyStore = await keyTokenService.createKeyToken({
      userId: newUser._id,
      publicKey,
      privateKey
    })

    if (!keyStore) {
      throw new ErrorResponse("keyStore error")
    }

    const tokens = await authUtils.createTokenPair({userId: newUser._id, email}, publicKey, privateKey)

    return {
      user: newUser,
      tokens
    }
  }

  return null
}

const login = async ({email, password, refreshToken = null}) => {
  const foundUser = await userRepository.findOneByEmail(email)

  if (!foundUser) throw new BadRequestError('User not registered')
  
  const match = bcrypt.compare(password, foundUser.password)

  if (!match) throw new AuthFailureError('Authentication failed')
  
  const publicKey = crypto.randomBytes(64).toString('hex')
  const privateKey = crypto.randomBytes(64).toString('hex')

  const tokens = await authUtils.createTokenPair({ userId: foundUser._id, email }, publicKey, privateKey)

  await keyTokenService.createKeyToken({
    userId: foundUser._id,
    publicKey,
    privateKey,
    refreshToken: tokens.refreshToken
  })

  return {
    user: getInfoData({fields: ['_id', 'name', 'email'], object: foundUser}),
    tokens
  }
}


const logout = async (keyStore) => {

  const deleteKey = await keyTokenRepository.deleteOneById(keyStore._id)

  return deleteKey
  
}

const handleRefreshToken = async ({refreshToken, keyStore, user}) => {

  const {userId, email} = user


  if (keyStore.refreshTokensUsed.includes(refreshToken)) {

    await keyTokenRepository.deleteByUserId(userId)

    throw new ForbiddenError('Something wrong happen, pls re-login')
  }


  if (keyStore.refreshToken !== refreshToken) {
    throw new ForbiddenError('User not registered')
  }


  const foundUser = await userRepository.findOneByEmail(email)
  if (!foundUser) throw new ForbiddenError('User not registered')


  const tokens = await authUtils.createTokenPair({ userId, email }, keyStore.publicKey, keyStore.privateKey) 

  //update token into refreshTokensUsed
  //apply atomic update
  await keyTokenRepository.updateTokensUsed(tokens.refreshToken, refreshToken)

  return {
    user: getInfoData({ fields: ['_id', 'name', 'email'], object: foundUser }),
    tokens
  }
}

export const authService = {
  signUp,
  login,
  logout,
  handleRefreshToken
}