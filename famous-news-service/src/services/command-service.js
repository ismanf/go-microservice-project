import async from 'async'
import ServiceBase from './servise-base'

class CommandServiceNews extends ServiceBase {
    constructor({ db, amqp }) {
        super()

        this.db = db
        this.amqp = amqp
        this.addNews = this.addNews.bind(this)
    }

    addNews(data, reply) {
        let self = this

        async.waterfall([
            function saveData(next) {
                self.db.commandModel.create(data)
                    .then((id) => next(null, id))
                    .catch(err => next(err))
            },
            function loadData(id, next) {
                self.db.commandModel.findById(id)
                    .then(result => next(null, result))
                    .catch(err => next(err))
            },
            function publisEvent(news, next) {
                self.amqp.send(self.events.NEWS_CREATE, news)
                next()
            }
        ], function (error, result) {
            self.respond(error, result, reply)
        })
    }
}

export default CommandServiceNews