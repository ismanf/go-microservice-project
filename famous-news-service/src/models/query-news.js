
const makeModel = (mongoose) => {
    let _schema = {
        title: {
            type: String,
            minlength: 5,
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
    }

    let schema = new mongoose.Schema(_schema, { versionKey: false })
    let model =  mongoose.model('News', schema)
    
    return model
}

export default makeModel