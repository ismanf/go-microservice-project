import dotenv from 'dotenv'

// Initialize env variables
if(!process.env.DOCKER_ENV){
    dotenv.config()
}

export default {
    dev: {
        mongodb: {
            connectionstring: `${process.env.QUERYDB_HOST}/${process.env.DATABASE}`
        },
        amqp:{
            url: process.env.AMQP_URL
        },
        app: {
            port: process.env.SERVICE_PORT
        },
        sequelize_config: {
            connectionstring: `mysql://root:@${process.env.COMMANDDB_HOST}/${process.env.DATABASE}`,
            options: {
                dialect: 'mysql',
                logging: false,
                define: {
                    underscored: false,
                    freezeTableName: false,
                    charset: 'utf8',
                    dialectOptions: {
                      collate: 'utf8_default'
                    },
                    timestamps: false
                },
                pool: {
                    max: 20,
                    idle: 30000
                }
            }
        }
    }
}