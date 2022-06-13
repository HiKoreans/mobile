const {comment : commentService} = require('../../service');
const winston = require('../../lib/common/winston');


const createBoardComment = async (req, res)=> {
    const data = req.body;
    if(!data.userIdx || !data.boardIdx || !data.comment){
        res.send({message : "wrong form"}); return;
    }
    try{
        const result = await commentService.board.createBoardComment(data);
        res.send({data : result});
    }catch(err){
        winston.error(`Unable to createboard :`, err);
        throw new Error('UNABLE_CREATEBOARD');
    }
}

const getBoardComment = async (req, res)=> {
    const boardIdx = req.params.boardIdx;
    try{
        const result = await commentService.board.getBoardComment(boardIdx);
        res.send(result);
    }catch(err){
        winston.error(`Unable to getBoard :`, err);
        throw new Error('UNABLE_GETBOARD');
    }
}

module.exports = {
    createBoardComment,
    getBoardComment,
}