class CommandServiceNews {
    constructor({ model, amqp }){
        this.model = model,
        this.amqp = amqp

        this.addNews = this.addNews.bind(this)
    }

    addNews(data, reply) {
        return reply('kuku')
    }
}

export default CommandServiceNews