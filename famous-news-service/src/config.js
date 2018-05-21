import dotenv from 'dotenv'

// Initialize env variables
dotenv.config()

export default {
    dev: {
        mongodb: {
            connectionstring: `${process.env.MONGODB_HOST}/${process.env.DATABASE}`
        },
        amqp:{
            url: process.env.AMQP_URL
        },
        app: {
            port: process.env.SERVICE_PORT
        },
        sequelize_config: {
            database: 'famousnews',
            username: 'root',
            password: '123456',
            options: {
                dialect: 'mysql',
                port: 3306,
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