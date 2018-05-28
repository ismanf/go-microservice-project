import dotenv from 'dotenv'

// Initialize env variables
if (!process.env.DOCKER_ENV) {
    dotenv.config()
}

export default {
    app: {
        SERVICE_PORT: process.env.SERVICE_PORT
    },
    internalServices: {
        famous: {
            port: 3001,
            host: ""
        },
        politic: {
            port: 3002,
            host: ""
        },
        sport: {
            port: 3003,
            host: ""
        },
        methods: {
            getAll: "getAll",
            getNews: "getNews",
            addNews: "addNews",
            updateNews: "updateNews"
        }
    }
}