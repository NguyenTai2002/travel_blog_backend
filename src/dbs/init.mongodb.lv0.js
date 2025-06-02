'use strict'

import mongoose from 'mongoose'


const connectString = `mongodb://localhost:27017/travel_blog`

mongoose.connect(connectString)
  .then( _ => console.log('Connected mongodb'))
  .catch(err => console.log(`error connect: ${err}`))


export default mongoose  
