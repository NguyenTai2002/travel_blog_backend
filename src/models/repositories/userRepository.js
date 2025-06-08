import { userModel } from '../userModel'

const findOneByEmail = async (email, select = { email: 1, password: 1, name: 1, status: 1}) => {
  const user = await userModel.findOne({email}).select(select).lean()
  return user
}

const create = async (data) => {
  return userModel.create(data)
}

export const userRepository = {
  findOneByEmail,
  create
}