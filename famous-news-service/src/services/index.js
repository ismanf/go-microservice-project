import CommandService from './command-service'
import QueryService from './query-service'

const initializeServices = (db, amqp) => {

    const commandService = new CommandService({ db, amqp })
    const queryService = new QueryService({ db, amqp })
    
    const methods = {
        addNews: commandService.addNews,
        getAll: queryService.getAll
    }

    return {
        commandService,
        queryService,
        methods
    }
}

export default initializeServices

