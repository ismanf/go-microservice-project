import Sequelize from 'sequelize'
import mongoose, { model } from 'mongoose'
import async from 'async'
import config from '../config'
import models from '../models'

//Configure mongodb orm
mongoose.Promise = global.Promise

//Configure mysql orm
const sequelize_config = config.dev.sequelize_config
const sequelize = new Sequelize(
    sequelize_config.database,
    sequelize_config.username,
    sequelize_config.password,
    sequelize_config.options
)

//Init models
let commandModel = models.makeCommandModel(sequelize, Sequelize)
let queryModel = models.makeQueryModel(mongoose)

const initConnections = () => {
    return new Promise((resolve, reject) => {
        async.parallel([

            function connectMongodb(next) {
                try {
                    mongoose.connect(config.dev.mongodb.connectionstring)
                    return next()
                } catch (err) {
                    return next(new Error(`mongodb error: ${err}`))
                }
            },

            function connectMysql(next) {
                sequelize
                    .authenticate()
                    .then(() => next())
                    .catch(err => next(new Error(`mysql error: ${err}`)))
            }

        ], function (err, result) {
            if (err) {
                return reject(err)
            }

            return resolve('OK!')
        })
    })
}

const db = {
    sequelize,
    Sequelize,
    mongoose,
    commandModel,
    queryModel,
    initConnections
}

export default db