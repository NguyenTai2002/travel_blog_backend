
import config from './environment'


const corsOptions = {
  origin: config.allowOrigin, // Specific origin
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'], // Allowed methods
  allowedHeaders: ['Content-Type', 'Authorization', 'x-client-id'], // Allowed headers
  credentials: true,
}


export default corsOptions