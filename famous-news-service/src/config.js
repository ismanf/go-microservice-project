export default {
    dev: {
        mongodb: {
            connectionstring: `${process.env.MONGODB_HOST}/${process.env.DATABASE}`
        },
        app: {
            port: process.env.SERVICE_PORT
        }
    }
}