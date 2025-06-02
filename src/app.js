import express from 'express'
import morgan from 'morgan'
import helmet from 'helmet'
import compression from 'compression'
import './dbs/init.mongodb.js'
import 'dotenv/config'
import { checkOverload } from './helpers/check.connect.js'
const app = express()

// init middleware
//HTTP request logger middleware for node.js
app.use(morgan("dev"))
//Help secure Express apps by setting HTTP response headers.  
app.use(helmet())
//compression
app.use(compression())

checkOverload()

app.get('/', (req, res, next) => { 
  const strCompress = 'Hello world'

  return res.status(200).json({
    message: 'Welcome to app',
    metadata: strCompress.repeat(1000000)
  })
})


export default app