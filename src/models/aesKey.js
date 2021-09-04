import Sequelize from 'sequelize';

export default sequelize => {
    class AesKey extends Sequelize.Model {}

    AesKey.init(
        {
            iterations: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            salt: {
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
