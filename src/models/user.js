import Sequelize from 'sequelize';


export default sequelize => {
    class User extends Sequelize.Model {
        getJwtData () {
            return {
                id: this.id
            };
        }
    }

    User.init(
        {
            email: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true
            },
            password: {
                type: Sequelize.STRING,
                allowNull: false
            },
            unlockAesKeyId: {
                type: Sequelize.INTEGER,
                allowNull: true
            },
            mainAesKeyId: {
                type: Sequelize.INTEGER,
                allowNull: true
            },
            /* ecKeyId: {
                type: Sequelize.INTEGER
            }, */
            isActive: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
                defaultValue: true
            }
        },
        {
            sequelize,
            modelName: 'user',
            /* defaultScope: {
                attributes: {
                    exclude: ['password', 'aesKeyId', 'ecKeyId']
                }
            },
            scopes: {
                full: {
                    attributes: {
                        exclude: []
                    }
                }
            }, */
            indexes: [
                {
                    fields: ['email']
                }
            ]
        }
    );

    return User;
};
