const {comment : commentService} = require('../../service');
const winston = require('../../lib/common/winston');


const createSecondhandComment = async (req, res)=> {
    const data = req.body;
    if(!data.userIdx || !data.secondhandIdx || !data.comment){
        res.send({message : "wrong form"}); return;
    }
    try{
        const result = await commentService.secondhand.createSecondhandComment(data);
        res.send({data : result});
    }catch(err){
        winston.error(`Unable to createSecondhandComment :`, err);
        throw new Error('UNABLE_createSecondhandComment');
    }
}

const getSecondhandComment = async (req, res)=> {
    const secondhandIdx = req.params.secondhandIdx;
    try{
        const result = await commentService.secondhand.getSecondhandComment(secondhandIdx);
        res.send(result);
    }catch(err){
        winston.error(`Unable to getSecondhandComment :`, err);
        throw new Error('UNABLE_getSecondhandComment');
    }
}

module.exports = {
    createSecondhandComment,
    getSecondhandComment,
}