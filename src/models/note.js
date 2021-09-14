import Sequelize from 'sequelize';

import hooks from '../hooks/code.js';


export default sequelize => {
    class Note extends Sequelize.Model {}

    Note.init(
        {
            userId: {
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
        },
        {
            sequelize,
            modelName: 'note',
            /* defaultScope: {
                attributes: {
                    exclude: ['userId', 'codeId']
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
                    fields: ['userId']
                }
            ],
            hooks
        }
    );

    return Note;
};
