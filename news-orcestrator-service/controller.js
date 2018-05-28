class Controller {
    constructor({ RPCClient, ISConfig }) {
        this.RPCClient = RPCClient
        this.ISConfig = ISConfig
        this.getAllNewsByType = this.getAllNewsByType.bind(this)
        this.getAllNews = this.getAllNews.bind(this)
        this.getNews = this.getNews.bind(this)
        this.addNews = this.addNews.bind(this)
        this.updateNews = this.updateNews.bind(this)
    }

    getAllNews(req, res, next) {
        let self = this
        async.parallel({
            famousNews: function(cb) {
                const client = self.RPCClient(
                    self.ISConfig.famous.port,
                    self.ISConfig.famous.host,
                    self.ISConfig.methods.getAll
                )
                client.send()
                    .then(fnews => cb(fnews))
                    .catch(err => cb(err))
            },
            politicNews: function(cb){
                const client = self.RPCClient(
                    self.ISConfig.politic.port,
                    self.ISConfig.politic.host,
                    self.ISConfig.methods.getAll
                )
                client.send()
                    .then(pnews => cb(pnews))
                    .catch(err => cb(err))
            },
            sportNews: function(cb) {
                const client = self.RPCClient(
                    self.ISConfig.sport.port,
                    self.ISConfig.sport.host,
                    self.ISConfig.methods.getAll
                )
                client.send()
                    .then(snews => cb(snews))
                    .catch(err => cb(err))
            }
        }, (error, result) => {
            if(error) {
                return next(error)
            }

            res.status(200).json(result)
        })
    }

    getAllNewsByType(req, res, next) {
        const newsType = req.params["news_type"]
        const serviceConfig = this.ISConfig[newsType]

        const client = new this.RPCClient(
            serviceConfig.port,
            serviceConfig.host,
            self.ISConfig.methods.getAll
        )

        client.send()
            .then(news => {
                return res.status(200).json(news)
            }).catch(error => {
                next(error)
            })
    }

    getNews(req, res, next) {
        const newsType = req.params["news_type"]
        const newsId = req.params["news_id"]
        const serviceConfig = this.ISConfig[newsType]

        const client = new this.RPCClient(
            serviceConfig.port,
            serviceConfig.host,
            self.ISConfig.methods.getNews
        )

        client.send(newsId)
            .then(news => {
                return res.status(200).json(news)
            }).catch(error => {
                next(error)
            })
    }

    addNews(req, res, next) {
        const newsType = req.params["news_type"]
        const data = req.body
        const serviceConfig = this.ISConfig[newsType]

        const client = new this.RPCClient(
            serviceConfig.port,
            serviceConfig.host,
            self.ISConfig.methods.addNews
        )

        client.send(data)
            .then(news => {
                return res.status(200).json(news)
            }).catch(error => {
                next(error)
            })
    }

    updateNews(req, res, next) {
        const newsType = req.params["news_type"]
        const data = req.body
        const serviceConfig = this.ISConfig[newsType]

        const client = new this.RPCClient(
            serviceConfig.port,
            serviceConfig.host,
            self.ISConfig.methods.updateNews
        )

        client.send(data)
            .then(news => {
                return res.status(200).json(news)
            }).catch(error => {
                next(error)
            })
    }

}

export default Controller