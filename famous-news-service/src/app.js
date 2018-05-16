import express from 'express'
import NewsController from './controller'
import { resolve } from 'dns';

const app = express()
const controller = new NewsController()


app.route('/news').get(controller.getAllNews)

export default app