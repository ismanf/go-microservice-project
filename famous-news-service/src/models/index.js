import mongoose from 'mongoose'
import makeFamousNewsModel from './famous-news'

mongoose.Promise = Promise

export default {
    FamousNews: makeFamousNewsModel(mongoose)
}