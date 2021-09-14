// remove associated code
export const beforeDestroy = async ( instance, {transaction} ) => {
    const {models} = instance.sequelize;

    await models.code.destroy({
        where: {id: instance.codeId},
        transaction
    });
};

// find and remove all associated codes
export const beforeBulkDestroy = async ( {model, where, transaction} ) => {
    const notes = await model.findAll({
        attributes: ['codeId'],
        where,
        transaction
    });

    const {models} = model.sequelize;

    await models.code.destroy({
        where: {id: notes.map(note => note.codeId)},
        transaction
    });
};

export default {
    beforeDestroy,
    beforeBulkDestroy
};
