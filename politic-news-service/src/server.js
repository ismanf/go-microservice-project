import dnode from 'dnode'
import async from 'async'
import Tortoise from 'tortoise'
import config from './config'
import initServices from './services'
import db from './db'

// Initialize ampq broker client
const amqpBus = new Tortoise(config.dev.amqp.url)

const services = initServices(db, amqpBus)
const server = dnode(services.methods)

//Start server....
async.waterfall([

    function initDbConnections(next) {
        db.initConnections().then((result) => {
            console.log('DB status:', result)
            return next()
        }).catch((err) => {
            console.log('DB failed:', err)
            return next(err)
        })
    },

    function startServer(next) {
        server.listen(config.dev.app.port, (err) => {
            if(err) {
                return next(new Error(`Server start failed: ${err}`))
            }

            return next()
        })
    }

], function (err, result) {
    if (err) {
        console.log('Application crashed ((:', err)
        process.exit(0)
    }

    console.log('App serving on port:', config.dev.app.port)
})