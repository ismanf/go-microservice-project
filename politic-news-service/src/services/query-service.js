import async from 'async'
import ServiceBase from './servise-base'

class QueryServiceNews extends ServiceBase {

    constructor({ db, amqp }) {
        super()
        this.db = db
        this.getAll = this.getAll.bind(this)

        amqp.queue(this.events.NEWS_CREATE)
            .prefetch(1)
            .json()
            .subscribe(this._save.bind(this))
    }

    _save(data, cb) {
        cb()
        this.db.queryModel.create(data)
            .then(() => console.log('[_save]Data saved!'))
            .catch(err => console.log('[_save]Error on saving new data:', err))
    }

    getAll(query, reply) {
        const self = this
        this.db.queryModel.findAll(query)
            .then((result) => self.respond(null, result, reply))
            .catch(err => self.respond(err, null, reply))
    }
}

export default QueryServiceNews