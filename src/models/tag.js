import Sequelize from 'sequelize';

import hooks from '../hooks/code.js';


export default ( {db} ) => {
    class Tag extends Sequelize.Model {}

    Tag.init(
        {
            userId: {
                type: Sequelize.INTEGER,
                allowNull: false/* ,
                references: {
                    model: 'user',
                    key: 'id'
                } */
            },
            codeId: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            usages: {
                type: Sequelize.INTEGER,
                allowNull: false,
                defaultValue: 0
            }
        },
        {
            sequelize: db,
            modelName: 'tag',
            hooks,
            indexes: [
                {
                    fields: ['userId']
                }
            ]
        }
    );

    return Tag;
};
