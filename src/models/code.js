import Sequelize from 'sequelize';


export default sequelize => {
    class Code extends Sequelize.Model {}

    Code.init(
        {
            userId: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            aesKeyId: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            iv: {
                type: Sequelize.STRING,
                allowNull: false
            },
            em: {
                type: Sequelize.TEXT,
                allowNull: false,
                // no need to repeat this for for `iv` field
                // as they both should be set at the same time
                set ( value ) {
                    this.setDataValue('em', value);
                    // calculate total data size
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
