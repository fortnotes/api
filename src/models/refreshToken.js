import Sequelize from 'sequelize';
import crypto from 'crypto';


export default ( {config, db} ) => {
    const generateTokenData = () => ({
        expireAt: new Date(Date.now() + config.jwt.refreshTokenExpireTime * 1000),
        data: crypto.randomBytes(config.jwt.refreshTokenSize).toString('base64')
    });

    class RefreshToken extends Sequelize.Model {
        static generate ( details = {} ) {
            return RefreshToken.create({
                ...generateTokenData(),
                ...details
            });
        }

        // return token instance if valid, null otherwise
        static async verify ( tokenString ) {
            const [tokenId, tokenData] = tokenString.split('.');
            const token = await RefreshToken.findByPk(tokenId);

            if ( token && token.data === tokenData ) {
                // found and seems valid
                if ( token.expireAt < new Date() ) {
                    // too old
                    await token.destroy();
                } else {
                    // ok
                    return token;
                }
            }

            return null;
        }

        async refresh ( details = {} ) {
            const tokenData = {
                ...generateTokenData(),
                ...details
            };

            Object.keys(tokenData).forEach(key => {
                this[key] = tokenData[key];
            });

            await this.save();
        }

        // return: "5.aQvyNJ2zkFTdVauHeq/lAIkL..."
        toString () {
            return `${this.id}.${this.data}`;
        }
    }

    RefreshToken.init(
        {
            userId: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            data: {
                type: Sequelize.STRING,
                allowNull: false
            },
            ip: {
                type: Sequelize.STRING
            },
            userAgent: {
                type: Sequelize.STRING
            },
            expireAt: {
                type: Sequelize.DATE,
                allowNull: false
            }
        },
        {
            sequelize: db,
            modelName: 'refreshToken',
            indexes: [
                {
                    fields: ['userId']
                }
            ]
        }
    );

    return RefreshToken;
};
