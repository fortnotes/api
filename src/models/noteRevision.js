import Sequelize from 'sequelize';

import hooks from '../hooks/code.js';


export default sequelize => {
    class NoteRevision extends Sequelize.Model {}

    NoteRevision.init(
        {
            noteId: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            codeId: {
                type: Sequelize.INTEGER,
                allowNull: false
            }
        },
        {
            sequelize,
            modelName: 'noteRevision',
            updatedAt: false,
            /* defaultScope: {
                attributes: {
                    exclude: ['noteId']
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
                    fields: ['noteId']
                }
            ],
            hooks
        }
    );

    return NoteRevision;
};
