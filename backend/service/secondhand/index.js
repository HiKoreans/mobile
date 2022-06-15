const {models, Op} = require('../../lib/db');
const winston = require('../../lib/common/winston');

const createSecondhand = async(data) => {
    let result;

    try{
        result = await models['secondhand'].create({
            userIdx : data.userIdx,
            subject : data.subject,
            content : data.content,
            price : data.price,
            type : data.type
        })
        return result;
    }catch(err) {
        winston.error(`Unable to createSeconhand[servcie] :`, err);
        throw new Error('DB__CREATE_SECONDHAND');  
    }
}
const getSecondhandList = async ()=> {
    let result;
    try {
        result = await models['secondhand'].findAll({
            include : [
                {
                    model : models['user'],
                }
            ]
        });
        return result;
    }catch(err){
        winston.error(`Unable to getSecondhandList[servcie] :`, err);
        throw new Error('DB_getSecondhandList');
    }
}

const getClickSecondhand = async (secondhandIdx)=> {
    let where = {};
    where.secondhandIdx = secondhandIdx;
    try {
        const result = await models['secondhand'].findAll({
            where,
            include : [
                {
                    model : models['user'],
                }
            ]
        })
        return result;
    }catch(err){
        winston.error(`Unable to getClickSecondhand[servcie] :`, err);
        throw new Error('DB_getClickSecondhand');
    }
}
module.exports = {
    createSecondhand,getClickSecondhand, getSecondhandList
}