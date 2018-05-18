import mongoose, { mongo } from 'mongoose'
import app from './app'
import config from './config'

//TODO: improve db connection
mongoose.connect(config.dev.mongodb.connectionstring)

app.listen(config.dev.app.port, (err) => {
    if (err) {
        console.log('Server can not start:', err)
    }
    console.log('Server started on port:', config.dev.app.port)
})