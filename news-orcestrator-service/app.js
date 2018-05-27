import express from 'express'
import bodyParser from 'body-parser'
import middlewares from './middlewares'

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(middlewares.errorHandler)

export default app