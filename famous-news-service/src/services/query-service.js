import async from 'async'
import ServiceBase from './servise-base'

class QueryServiceNews extends ServiceBase {

    constructor({ db, amqp }) {
        super()
        this.db = db
        this.getAll = this.getAll.bind(this)
        this._save = this._save.bind(this)

        //Set up events
        amqp.listen(this.events.NEWS_CREATE, { ack: true }, this._save)
        amqp.listen(this.events.NEWS_UPDATE, { ack: true }, this._update)
    }

    _save(event) {
        this.db.queryModel.create(event.data)
            .then(() => event.handle.ack())
            .catch(err => event.handle.reject())
    }

    _update(event) {
        const data = event.data
        this.db.queryModel.updateOne(
            { id: data.id },
            {
                content: data.content,
                tags: data.tags,
            })
            .then(() => event.handle.ack())
            .catch(err => event.handle.reject())
    }

    getAll(query, reply) {
        const self = this
        this.db.queryModel.findAll(query)
            .then((result) => self.respond(null, result, reply))
            .catch(err => self.respond(err, null, reply))
    }
}

export default QueryServiceNews