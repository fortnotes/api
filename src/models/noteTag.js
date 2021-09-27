import Sequelize from 'sequelize';


export default ( {db} ) => {
    const {models} = db;

    class NoteTag extends Sequelize.Model {
        // note to tag list:
        // { '1': [ 1, 2 ], '2': [ 3 ] }
        static async getMap ( ids ) {
            const noteTags = await this.findAll({
                attributes: ['noteId', 'tagId'],
                where: {
                    noteId: ids
                },
                raw: true
            });

            const map = {};

            noteTags.forEach(link => {
                map[link.noteId] = map[link.noteId] || [];
                map[link.noteId].push(link.tagId);
            });

            return map;
        }
    }

    NoteTag.init(
        {
            noteId: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            tagId: {
                type: Sequelize.INTEGER,
                allowNull: false
            }
        },
        {
            sequelize: db,
            modelName: 'noteTag',
            updatedAt: false,
            indexes: [
                {
                    fields: ['noteId']
                },
                {
                    fields: ['tagId']
                }
            ]
        }
    );

    //TODO: add beforeCreate and transaction
    NoteTag.beforeBulkCreate(async links => {
        const tagIds = links.map(link => link.tagId);

        await models.tag.increment('usages', {
            where: {id: tagIds}
        });
    });

    NoteTag.beforeBulkDestroy(async options => {
        await models.tag.decrement('usages', {
            where: {id: options.where.tagId}
        });
    });

    return NoteTag;
};
