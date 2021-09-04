import Sequelize from 'sequelize';

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
            ]
        }
    );

    return Note;
};
