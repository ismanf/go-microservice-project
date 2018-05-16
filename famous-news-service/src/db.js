import mongoose, { mongo } from 'mongoose'
import config from './config'

//Replace mongoose promise with ES6 Promise
mongoose.Promise = Promise

const connection = mongoose.createConnection(config.db.connectionString)

export default connection