
import express from 'express'
import { authRoute } from './authRoute.js'
const router = express.Router()

router.use('/auth', authRoute)

export const API_V1 = router