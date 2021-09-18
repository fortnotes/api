import Sequelize from 'sequelize';

import {GENERAL} from '../constants/aesKeyTypes.js';


export default sequelize => {
    class AesKey extends Sequelize.Model {}

    AesKey.init(
        {
            userId: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            typeId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                defaultValue: GENERAL
            },
            codeId: {
                type: Sequelize.INTEGER,
                allowNull: true
            },
            iterations: {
                type: Sequelize.INTEGER,
                allowNull: true
            },
            salt: {
                type: Sequelize.STRING,
                allowNull: true
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
            sequelize,
            modelName: 'aesKey'/* ,
            defaultScope: {
                attributes: {
                    exclude: ['id', 'codeId']
                }
            },
            scopes: {
                full: {
                    attributes: {
                        exclude: []
                    }
                }
            } */
        }
    );

    return AesKey;
};
