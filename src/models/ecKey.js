import Sequelize from 'sequelize';

export default sequelize => {
    class EcKey extends Sequelize.Model {}

    EcKey.init(
        {
            public: {
                type: Sequelize.STRING,
                allowNull: false
            },
            codeId: {
                type: Sequelize.INTEGER,
                allowNull: false
            }
        },
        {
            sequelize,
            modelName: 'ecKey'
        }
    );

    return EcKey;
};
