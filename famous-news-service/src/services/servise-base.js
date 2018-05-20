class ResponseFormat {
    constructor(error, payload ) {
        this.error = error
        this.payload = payload
    }
}

export default class ServiceBase {

    constructor(){
        this.events = {
            NEWS_CREATE = 'news.create',
            NEWS_UPDATE = 'news.update'
        }
    }

    respond(error, payload, handler) {
        return handler(new ResponseFormat(error, payload))
    }
}