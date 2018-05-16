import News from './models'

export class NewsController {
    constructor() {
        this.model = News
    }

    getAllNews(request, response, next) {
        this.model.find().then(result => {
            response.json(result)
        })
    }
}