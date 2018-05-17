import mongoose from 'mongoose'
import makeFamousNewsModel from './famous-news'

export default {
    FamousNews: makeFamousNewsModel(mongoose)
}