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

const makeFamousNewsModel = (orm) => {
    let schema = new orm.Schema(_schema)
    return orm.model('News', schema)
}

export default makeFamousNewsModel