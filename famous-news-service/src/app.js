import express from 'express'
import bodyParser from 'body-parser'
import middlewares from './middlewares'
import registerRoutes from './routes'

const app = express()

//Register all routes
registerRoutes(app)

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(middlewares.errorHandler)

export default app