class QueryServiceNews {

    constructor({ model, amqp }) {
        this.model = model
        this.amqp = amqp

        this.getAll = this.getAll.bind(this)
    }

    getAll(query, reply) {
        return reply('query')
    }
}

export default QueryServiceNews