export default class FamousNewsController {
    
    constructor({ model }) {
        this.model = model
        this.getAllNews = this.getAllNews.bind(this)
    }

    getAllNews(request, response, next) {
        this.model.find({}).then(result => {
            return response.status(200).json(result)
        }).catch(error => {
            return next(error)
        })
    }

}