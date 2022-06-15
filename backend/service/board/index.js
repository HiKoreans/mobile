const {models, Op} = require('../../lib/db');
const winston = require('../../lib/common/winston');

const createBoard = async (data, seperateNotice)=> {
    let result;
    try{
        result = await models['board'].create({
            userIdx : data.userIdx,
            subject : data.subject,
            content : data.content,
            type : seperateNotice
        });
        return result;
    }catch(err){
        winston.error(`Unable to createBoard[servcie] :`, err);
        throw new Error('DB_CREATEBOARD');
    }
}
const getBoardList = async ()=> {
    let result;
    try {
        result = await models['board'].findAll({
            include : [
                {
                    model : models['user'],
                }
            ]
        });
        return result;
    }catch(err){
        winston.error(`Unable to getBoard[servcie] :`, err);
        throw new Error('DB_GETBOARD');
    }
}
const getClickBoard = async (boardIdx)=> {
    let where = {};
    where.boardIdx = boardIdx;
    try {
        const result = await models['board'].findAll({
            where,
            include : [
                {
                    model : models['user'],
                }
            ]
        })
        return result;
    }catch(err){
        winston.error(`Unable to getClickBoard[servcie] :`, err);
        throw new Error('DB_GETClickBOARD');
    }
}

module.exports = {
    createBoard,
    getBoardList,
    getClickBoard
}