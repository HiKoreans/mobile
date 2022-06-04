const {models, Op} = require('../../lib/db');
const winston = require('../../lib/common/winston');

const createSecondhand = async(data) => {
    let result;
    try{
        result = await models['secondhand'].create({
            userIdx : data.userIdx,
            subject : data.subject,
            content : data.content,
        })
        return result;
    }catch(err) {
        winston.error(`Unable to createSeconhand[servcie] :`, err);
        throw new Error('DB__CREATE_SECONDHAND');  
    }
}

module.exports = {
    createSecondhand
}