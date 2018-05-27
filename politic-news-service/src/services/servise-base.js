class ResponseFormat {
    constructor(error, payload) {
        this.error = error || ''
        this.payload = payload || ''
    }
}

export default class ServiceBase {

    constructor() {
        this.events = {
            NEWS_CREATE: 'politicnews.create',
            NEWS_UPDATE: 'politicnews.update'
        }
    }

    respond(error, payload, handler) {
        return handler(new ResponseFormat(error, payload))
    }
}