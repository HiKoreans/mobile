const {secondhand: secondhandService } = require('../../service');
const winston = require('../../lib/common/winston');

const createSecondhand = async(req, res)=> {
    const data = req.body;
    if(!data.userIdx || !data.subject || !data.content){
        res.send({message : "wrong form"}); return;
    }
    try {
        const result = await secondhandService.createSecondhand(data);
        res.send({data : result});
    }catch(err){
        winston.error(`Unable to  createSecondhand:`, err);
        throw new Error('UNABLE_CREATE_SECONDHAND');
    }
}
const getSecondhandList = async(req, res)=> {
    try{
        const result = await secondhandService.getSecondhandList();
        res.send(result);
    }catch(err){
        winston.error(`Unable to getSecondhandList :`, err);
        throw new Error('getSecondhandList');
    }
}

const getClickSecondhand = async(req,res) => {
    const secondhandIdx = req.params.secondhandIdx;
    try{
        const result = await secondhandService.getClickSecondhand(secondhandIdx);
        res.send(result);
    }catch(err){
        winston.error(`Unable to getClickSecondhand :`, err);
        throw new Error('UNABLE_getClickSecondhand');
    }
}
module.exports = {
    createSecondhand, getClickSecondhand, getSecondhandList
}