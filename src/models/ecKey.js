import Sequelize from 'sequelize';

import hooks from '../hooks/code.js';


export default sequelize => {
    class EcKey extends Sequelize.Model {}

    EcKey.init(
        {
            userId: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            public: {
                type: Sequelize.STRING,
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
            modelName: 'ecKey',
            hooks
        }
    );

    return EcKey;
};
