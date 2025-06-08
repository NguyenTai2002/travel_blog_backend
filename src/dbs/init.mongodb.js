'use-strict'
import mongoose from 'mongoose'
import { countConnect } from '../helpers/check.connect.js'
import  config  from '../configs/environment.js'

const {host, name, port} = config.db
const connectString = `mongodb://${host}:${port}/${name}`

class Database {
  constructor() {
    this.connect()
  }

  connect(type = 'mongodb') {

    if (true) {
      mongoose.set('debug', 1)
      mongoose.set('debug', {color: true})
    }

    mongoose.connect(connectString, {
      maxPoolSize: 50
    })
      .then(_ => {
        console.log('Connected mongodb');
        countConnect()
      })
      .catch(err => console.log(`error connect: ${err}`))

  }


  static getInstance() {
    if (!Database.instance) {
      Database.instance =  new Database()
    }

    return Database.instance
  }
}


const instanceMongodb = Database.getInstance()

export default instanceMongodb