import express from 'express'
import bodyParser from 'body-parser'
import middlewares from './middlewares'
import initRouter from './router'
import config from './config'
import NewsOrcestratorController from './controller'
import RPCClient from './rpc-client'

const app = express()
const controller = new NewsOrcestratorController({ RPCClient, ISConfig: config.internalServices })
const router = initRouter(controller)

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use('/', router)
app.use(middlewares.errorHandler)

app.listen(config.app.SERVICE_PORT, (err) => {
    if(err) {
        console.log("App can't start:", err)
        return
    }

    console.log("App listening on port:", config.app.SERVICE_PORT)
})

export default app