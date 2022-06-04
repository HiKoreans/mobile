const {recruitment: recruitmentService } = require('../../service');
const winston = require('../../lib/common/winston');

const createRecruitment = async(req, res)=> {
    const data = req.body;
    if(!data.userIdx || !data.subject || !data.content){
        res.send({message : "wrong form"}); return;
    }
    try {
        const result = await recruitmentService.createRecruitment(data);
        res.send({data : result});
    }catch(err){
        winston.error(`Unable to  createRecruitment:`, err);
        throw new Error('UNABLE_CREATE_RECRUITMENT');
    }
}

module.exports = {
    createRecruitment
}