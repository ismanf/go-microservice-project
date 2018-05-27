class Controller {
    constructor({ RPCClient, ISConfig }) {
        this.RPCClient = RPCClient
        this.ISConfig = ISConfig

        this.getAllNewsByType = this.getAllNewsByType.bind(this)
    }

    getAllNewsByType(req, res, next) {
        const newsType = req.params["news_type"]
        const serviceConfig = this.ISConfig[newsType]

        const client = new this.RPCClient(
            serviceConfig.port,
            serviceConfig.host,
            'getAll'
        )

        client.send()
            .then(news => {
                return res.status(200).json(news)
            }).catch(error => {
                next(error)
            })
    }

}

export default Controller