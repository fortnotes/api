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
