import assert from 'assert'

export default class FamousNewsController {

    constructor({ 
        commandNewsModel,
        queryNewsModel,
        amqp
    }) {
        //validate options
        assert(commandNewsModel, '"commandNewsModel" is undefined')
        assert(queryNewsModel, '"queryNewsModel" is undefined')
        assert(ampq, '"amqp" is undefined')

        this.commandNewsModel = commandNewsModel
        this.queryNewsModel = queryNewsModel
        this.ampq = ampq

        this.events = {
            NEWS_CREATE = 'news.create',
            NEWS_UPDATE = 'news.update'
        }

        this.getAllNews = this.getAllNews.bind(this)
        this.create = this.create.bind(this)
    }

    getAllNews(request, response, next) {
        this.model.find({})
            .then(result => {
                return response.status(200).json(result)
            })
            .catch(error => {
                return next(error)
            })
    }

    create(request, response, next) {
        let data = request.body
        data.created_at = Date.now()

        this.model.create(data)
            .then(result => {
                return response.status(201).send()
            })
            .catch(error => {
                return next(error)
            })
    }

    _normalizeDb()

}