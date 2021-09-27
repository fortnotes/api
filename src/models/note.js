import Sequelize from 'sequelize';

import hooks from '../hooks/code.js';


export default ( {db} ) => {
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
            },
            viewedAt: {
                type: Sequelize.DATE
            }
        },
        {
            sequelize: db,
            modelName: 'note',
            hooks,
            indexes: [
                {
                    fields: ['userId']
                }
            ]
        }
    );

    return Note;
};
