import mongoose, {Schema} from 'mongoose'

let newsSchema = new Schema({
    title: {
        type: String,
        minlength: 10,
        maxlength: 200,
        required: true
    },
    content: {
        type: String,
        required: true,
        minlength: 10
    },
    author: {
        type: String,
        required: true
    },
    created_at: Date,
    published_at: Date,
    news_type: String,
    tags: {
        type: String,
        maxlength: 100
    }
})

let News = mongoose.model('News', newsSchema)

export default News