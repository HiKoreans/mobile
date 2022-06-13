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

const getRecruitment = async(req, res)=> {
    try{
        const result = await recruitmentService.getRecruitmentList();
        res.send(result);
    }catch(err){
        winston.error(`Unable to getBoard :`, err);
        throw new Error('UNABLE_GETBOARD');
    }
}

const getClickRecruitment = async(req,res) => {
    const recruitmentIdx = req.params.recruitmentIdx;
    try{
        const result = await recruitmentService.getClickRecruitment(recruitmentIdx);
        res.send(result);
    }catch(err){
        winston.error(`Unable to getClickRecruitment :`, err);
        throw new Error('getClickRecruitment');
    }
}

module.exports = {
    createRecruitment, getRecruitment, getClickRecruitment
}