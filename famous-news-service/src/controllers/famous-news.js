class FamousNewsController {
    
    constructor({ model }) {
        this.model = model
    }

    getAllNews(request, response, next) {
        this.model.find().then(result => {
            return response.json(result)
        }).catch(error => {
            return next(error)
        })
    }

}