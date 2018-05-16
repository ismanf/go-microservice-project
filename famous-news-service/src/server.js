import app from './app'
import dbconnection from './db'

const startServer = (server) => {
    return new Promise((resolve, reject) => {
        server.listen(3001, (err) => {
            if(err) {
                return reject(err)
            }
            resolve('OK')
        })
    })
}

dbconnection
    .then(db => {
        console.log('Connected to db')
        return startServer(app)
    })
    .then(res => {
        console.log('App is ready..')
    })
    .catch(err => {
        console.log('something bad happened', err)
    })