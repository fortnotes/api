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
            aesKeyId: {
                type: Sequelize.INTEGER
            },
            ecKeyId: {
                type: Sequelize.INTEGER
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
