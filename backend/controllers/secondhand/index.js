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

module.exports = {
    createSecondhand
}