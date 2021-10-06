import Sequelize from 'sequelize';

import {USER} from '../constants/userTypes.js';


export default ( {db} ) => {
    class User extends Sequelize.Model {
        getJwtData () {
            return {
                id: this.id
            };
        }
    }

    User.init(
        {
            typeId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                defaultValue: USER
            },
            email: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true
            },
            /* passwordKdfConfigId: {
                type: Sequelize.INTEGER,
                allowNull: false
            }, */
            passwordKdfSalt: {
                type: Sequelize.STRING,
                allowNull: false
            },
            passwordKdfIterations: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            passwordHash: {
                type: Sequelize.STRING,
                allowNull: false
            },
            aesKeyId: {
                type: Sequelize.INTEGER,
                // aes key can't be created beforehand
                allowNull: true
            },
            ecKeyId: {
                type: Sequelize.INTEGER,
                // aes key can't be created beforehand
                allowNull: true
            },
            isActive: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
                defaultValue: true
            }
        },
        {
            sequelize: db,
            modelName: 'user',
            indexes: [
                {
                    fields: ['typeId']
                },
                {
                    fields: ['email']
                }
            ]
        }
    );

    return User;
};
