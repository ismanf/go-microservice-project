import express from 'express'
import bodyParser from 'body-parser'
import middlewares from './middlewares'
import registerRoutes from './routes'

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

registerRoutes(app)
app.use(middlewares.errorHandler)

export default app