import CommandService from './command-service'
import QueryService from './query-service'

const initializeServices = (db, ampq) => {
    
    const commandService = new CommandService({
        model: db.commandModel,
        amqp
    })
    
    const queryService = new QueryService({
        model: db.queryModel,
        amqp
    }),

    const methods = Object.assign({}, commandService, queryService)

    return {
        commandService,
        queryService,
        methods
    }
}

export default initializeServices

