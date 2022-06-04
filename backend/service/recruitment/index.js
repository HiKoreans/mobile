const {models, Op} = require('../../lib/db');
const winston = require('../../lib/common/winston');

const createRecruitment = async(data) => {
    let result;
    try{
        result = await models['recruitment'].create({
            userIdx : data.userIdx,
            subject : data.subject,
            content : data.content,
        })
        return result;
    }catch(err) {
        winston.error(`Unable to createRecruitment[servcie] :`, err);
        throw new Error('DB__CREATE_RECRUITMENT');  
    }
}

module.exports = {
    createRecruitment
}