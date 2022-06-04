const {board : boardService} = require('../../service');
const winston = require('../../lib/common/winston');

const createBoard = async(req , res)=> {
    const data = req.body;
    if(!data.userIdx || !data.subject || !data.content){
        res.send({message : "wrong form"}); return;
    }
    try{
        const result = await boardService.createBoard(data);
        res.send({data : result});
    }catch(err){
        winston.error(`Unable to createboard :`, err);
        throw new Error('UNABLE_CREATEBOARD');
    }
}

const getBoard = async(req, res)=> {
    try{
        const result = await boardService.getBoardList();
        res.send(result);
    }catch(err){
        winston.error(`Unable to getBoard :`, err);
        throw new Error('UNABLE_GETBOARD');
    }
}

const getClickBoard = async(req,res) => {
    const boardIdx = req.params.boardIdx;
    try{
        const result = await boardService.getClickBoard(boardIdx);
        res.send(result);
    }catch(err){
        winston.error(`Unable to getClickBoard :`, err);
        throw new Error('UNABLE_GETCLICKBOARD');
    }
}


module.exports = {
    createBoard,
    getBoard,
    getClickBoard,
}