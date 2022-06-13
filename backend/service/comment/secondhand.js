const {models, Op} = require('../../lib/db');
const winston = require('../../lib/common/winston');

const createSecondhandComment = async (data)=> {
    let result;
    try{
        result = await models['shComment'].create({
            userIdx : data.userIdx,
            secondhandIdx : data.secondhandIdx,
            comment : data.comment,
        });
        return result;
    }catch(err){
        winston.error(`Unable to createSecondhandComment[servcie] :`, err);
        throw new Error('DB_createSecondhandComment');
    }
}

const getSecondhandComment = async (secondhandIdx)=> {
    let where = {};
    where.secondhandIdx = secondhandIdx;
    try {
        const result = await models['shComment'].findAll({
            where,
            include : [
                {
                    model : models['user'],
                }
            ]
        })
        return result;
    }catch(err){
        winston.error(`Unable to getSecondhandComment[servcie] :`, err);
        throw new Error('DB_getSecondhandComment');
    }
}

module.exports = {
    createSecondhandComment,
    getSecondhandComment,
}