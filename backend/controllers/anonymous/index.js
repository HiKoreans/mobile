const {anonymous: anonymousService } = require('../../service');
const winston = require('../../lib/common/winston');

//회원가입
const signUP = async (req, res) => {
    const data = req.body;
    if(!data.id || !data.pw || !data.nickName || !data.email){
        res.send({message : "wrong form"}); return;
    }
    try{
        const result = await anonymousService.signUp(data);
        res.send({data : result});
    }catch(err){
        winston.error(`Unable to signup :`, err);
        throw new Error('UNABLE_SIGNUP');
    }
} 

const signIn = async (req, res) => {
    const data = req.body;
    // if(!data.id || !data.pw){
    //     return;
    // }
    console.log(data)
    try{
        const result = await anonymousService.signIn(data.id, data.password);
        res.send(result);
    }catch(err){
        winston.error(`Unable to signIn :`, err);
        throw new Error('UNABLE_SIGNIN');
    }
}

module.exports = {
    signUP,
    signIn,
}