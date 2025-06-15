import express from 'express'
import morgan from 'morgan'
import helmet from 'helmet'
import compression from 'compression'
import './dbs/init.mongodb.js'
import 'dotenv/config'
import bodyParser from 'body-parser'
import { API_V1 } from './routes/v1/index.js'
import { errorHandlingMiddleware } from './middlewares/errorHandlingMiddleware'
import { urlMismatchMiddleware } from './middlewares/URLMismatchMiddleware'
import cors from 'cors'
import corsOptions from './configs/corsOptions.js'
import cookieParser from 'cookie-parser'
const app = express()

// init middleware


app.use(cors(corsOptions))
app.use(cookieParser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(morgan("dev"))
app.use(helmet())
app.use(compression())

// checkOverload()

app.use('/api/v1', API_V1)

app.use(urlMismatchMiddleware)

app.use(errorHandlingMiddleware)

export default app