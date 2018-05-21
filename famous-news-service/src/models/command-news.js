const makeModel = (sequelize, Sequelize) => {
    let _schema = {
        id: {
            type: Sequelize.UUID,
            primaryKey: true
        },
        title: {
            type: Sequelize.STRING,
            unique: true,
            allowNull: false,
            validate: {
                max: 200,
                min: 5
            }
        },
        content: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                min: 10
            }
        },
        author: {
            type: Sequelize.STRING,
            max: 200,
            allowNull: false
        },
        created_at: Sequelize.DATE ,
        published_at: Sequelize.DATE,
        news_type: {
            type: Sequelize.STRING,
            allowNull: false
        },
        tags: {
            type: Sequelize.STRING,
            allowNull: true,
            validate: {
                max: 100
            }
        }
    }

    let model = sequelize.define('News', _schema, {
        timestamps: false,
        freezeTableName: true,
        tableName: 'news'
    })

    return model
}

export default makeModel