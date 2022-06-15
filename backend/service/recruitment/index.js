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
const getRecruitmentList = async ()=> {
    let result;
    try {                      
        result = await models['recruitment'].findAll({
            include : [
                {
                    model : models['user'],
                }
            ],
            order: [['recruitmentIdx', 'DESC']]
        });
        return result;
    }catch(err){
        winston.error(`Unable to getRecruitment[servcie] :`, err);
        throw new Error('DB_getRecruitment');
    }
}

const getClickRecruitment = async (recruitmentIdx)=> {
    let where = {};
    where.recruitmentIdx = recruitmentIdx;
    try {
        const result = await models['recruitment'].findAll({
            where,
            include : [
                {
                    model : models['user'],
                }
            ]
        })
        return result;
    }catch(err){
        winston.error(`Unable to getClickRecruitment[servcie] :`, err);
        throw new Error('DB_getClickRecruitment');
    }
}
const deleteClickRecruitment = async (recruitmentIdx)=> {
    try {
        const result = await models['recruitment'].destroy({
            where : {
                recruitmentIdx : recruitmentIdx
            }
        })
        return result;
    }catch(err){
        winston.error(`Unable to deleteClickRecruitment[servcie] :`, err);
        throw new Error('DB_deleteClickRecruitment');
    }
}


module.exports = {
    createRecruitment,
    getRecruitmentList,
    getClickRecruitment,
    deleteClickRecruitment
}