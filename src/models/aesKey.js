import Sequelize from 'sequelize';

//import {GENERAL} from '../constants/aesKeyTypes.js';


export default ( {db} ) => {
    class AesKey extends Sequelize.Model {}

    AesKey.init(
        {
            userId: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            /* typeId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                defaultValue: GENERAL
            }, */
            /* kdfConfigId: {
                type: Sequelize.INTEGER,
                allowNull: false
            }, */
            kdfSalt: {
                type: Sequelize.STRING,
                allowNull: false
            },
            kdfIterations: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            codeId: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            isActive: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
                defaultValue: true
            }
            /* usages: {
                type: Sequelize.INTEGER,
                allowNull: false,
                defaultValue: 0
            } */
        },
        {
            sequelize: db,
            modelName: 'aesKey',
            indexes: [
                {
                    fields: ['userId']
                }
            ]
        }
    );

    return AesKey;
};
