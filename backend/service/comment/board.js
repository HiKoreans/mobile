const {models, Op} = require('../../lib/db');
const winston = require('../../lib/common/winston');

const createBoardComment = async (data)=> {
    let result;
    try{
        result = await models['bComment'].create({
            userIdx : data.userIdx,
            boardIdx : data.boardIdx,
            comment : data.comment,
        });
        return result;
    }catch(err){
        winston.error(`Unable to createBoardComment[servcie] :`, err);
        throw new Error('DB_createBoardComment');
    }
}

const getBoardComment = async (boardIdx)=> {
    let where = {};
    where.boardIdx = boardIdx;
    try {
        const result = await models['bComment'].findAll({
            where,
            include : [
                {
                    model : models['user'],
                }
            ]
        })
        return result;
    }catch(err){
        winston.error(`Unable to getBoardComment[servcie] :`, err);
        throw new Error('DB_getBoardComment');
    }
}

module.exports = {
    createBoardComment,
    getBoardComment,
}