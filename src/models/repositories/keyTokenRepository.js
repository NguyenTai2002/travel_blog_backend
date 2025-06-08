import { keyTokenModel } from '../keyTokenModel'
import mongoose from 'mongoose'

const create = async (data) => {
  return await keyTokenModel.create(data)
}

const findOneAndUpdate = async (filter, update, options) => {
  return await keyTokenModel.findOneAndUpdate(filter, update, options)
}

const findOneByUserId = async (userId) => {
  return await keyTokenModel.findOne({user: new mongoose.Types.ObjectId(userId)}).lean()
}

const findOneByRefreshToken = async (refreshToken) => {
  return await keyTokenModel.findOne({ refreshToken }).lean()
}


const deleteOneById = async (id) => {
  return await keyTokenModel.deleteOne(id)
}

const deleteByUserId = async (id) => {
  return await keyTokenModel.deleteOne({user: new mongoose.Types.ObjectId(id)})
}

const findByRefreshTokenUsed = async (refreshToken) => {
  return await keyTokenModel.findOne({ refreshTokensUsed: refreshToken }).lean()
}

const updateTokensUsed = async (refreshToken, refreshTokenUsed) => {
  return await keyTokenModel.findOneAndUpdate(
    //find refresh token
    { refreshToken: refreshTokenUsed },
    //update
    {
      $set: { refreshToken: refreshToken },
      $push: { refreshTokensUsed: refreshTokenUsed }
    })
}


export const keyTokenRepository =  {
  create,
  findOneAndUpdate,
  findOneByUserId,
  deleteOneById,
  findByRefreshTokenUsed,
  deleteByUserId,
  findOneByRefreshToken,
  updateTokensUsed
}