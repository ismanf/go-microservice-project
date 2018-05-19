export default {
    dev: {
        mongodb: {
            connectionstring: `${process.env.MONGODB_HOST}/${process.env.DATABASE}`
        },
        app: {
            port: process.env.SERVICE_PORT
        },
        sequelize_config: {
            database: 'famousnews',
            username: 'root',
            password: null,
            options: {
                dialect: 'mysql',
                port: 3306,
                logging: false,
                define: {
                    underscored: false,
                    freezeTableName: false,
                    charset: 'utf8',
                    dialectOptions: {
                      collate: 'utf8_general_ci'
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