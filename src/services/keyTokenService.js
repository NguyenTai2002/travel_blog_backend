'use strict'

import { keyTokenRepository } from '~/models/repositories/keyTokenRepository'

const createKeyToken = async ({userId, publicKey, privateKey, refreshToken}) => {


  // const tokens = await keyTokenRepository.create({
  //   user: userId,
  //   publicKey: publicKey,
  //   privateKey: privateKey
  // })

  const filter = { user: userId}, update = {
    publicKey, privateKey, refreshTokensUsed: [], refreshToken
  }, options = {upsert: true, new: true}

  const tokens = await keyTokenRepository.findOneAndUpdate( filter, update, options)
  return tokens ? tokens.publicKey : null
}



export const keyTokenService = {
  createKeyToken
}