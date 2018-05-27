import async from 'async'
import ServiceBase from './servise-base'
import uuidv1 from 'uuid/v1'

class CommandServiceNews extends ServiceBase {
    constructor({ db, amqp }) {
        super()

        this.db = db
        this.amqp = amqp
        this.addNews = this.addNews.bind(this)
    }

    addNews(data, reply) {
        let self = this
        let newUuid = uuidv1()

        data = JSON.parse(data)
        data.id = newUuid

        async.waterfall([
            function saveData(next) {
                self.db.commandModel.create(data)
                    .then(() => next())
                    .catch(err => next(err))
            },
            function loadData(next) {
                self.db.commandModel.findById(newUuid)
                    .then(result => next(null, result.dataValues))
                    .catch(err => next(err))
            },
            function publisEvent(news, next) {
                self.amqp
                    .queue(self.events.NEWS_CREATE)
                    .publish(data)
                
                next()
            }
        ], function (error, result) {
            self.respond(error, newUuid, reply)
        })
    }
}

export default CommandServiceNews