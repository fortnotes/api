import Sequelize from 'sequelize';

export default sequelize => {
    class Code extends Sequelize.Model {}

    Code.init(
        {
            aesKeyId: {
                type: Sequelize.INTEGER,
                // key itself is encrypted without keyId
                allowNull: true
            },
            iv: {
                type: Sequelize.STRING,
                allowNull: false
            },
            em: {
                type: Sequelize.TEXT,
                allowNull: false,
                set ( value ) {
                    this.setDataValue('em', value);
                    this.setDataValue('size', this.iv.length + value.length);
                }
            },
            size: {
                type: Sequelize.INTEGER,
                allowNull: false
            }
        },
        {
            sequelize,
            modelName: 'code'/* ,
            defaultScope: {
                attributes: {
                    exclude: ['id', 'aesKeyId']
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

    return Code;
};
