import Sequelize from 'sequelize';

import hooks from '../hooks/code.js';


export default ( {db} ) => {
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
            sequelize: db,
            modelName: 'noteRevision',
            hooks,
            updatedAt: false,
            indexes: [
                {
                    fields: ['noteId']
                }
            ]
        }
    );

    return NoteRevision;
};
