const {models, Op} = require('../../lib/db');
const winston = require('../../lib/common/winston');


const signUp = async (data) => {
    let result;
    if(await findUser(data.id) === null){
        try{
            result = await models['user'].create({
                id : data.id,
                pw : data.pw,
                nickName : data.nickName,
                email : data.email,
                role : "normal"
            });
            return result;
        }catch(err){
            winston.error(`Unable to signUp[servcie] :`, err);
            throw new Error('DB_SIGNUP');
        }
    }else {
        throw new Error('TRAFFIC');
    }
}
const signIn = async (id, pw) => {
    let findId;
    // 1. 아이디가 존재하는지 확인한다.
    try{
        findId = await models['user'].findOne({
            where : {
                id : id
            },
        });
    }catch(err){
        winston.error(`Unable to findId for signIn[service] :`, err);
        throw new Error('DB_FIND_ID_SIGNIN');
    }
    if(findId){
        const idData = {
            ...findId.toJSON()
        }
        if(pw === idData.pw){
            try{
                delete idData.pw; // data에서 pw제거
                return {data : idData};
            }catch(err){
                winston.error(`Unable to signIn[service] :`, err);
                throw new Error('DB_SIGNIN');
            }
        }else {
            return {message : "wrong data"};
        }
    }else {
        return {message : "wrong data"};
    }
}

const findUser = async (id) => {
    let findUser;
    try{
        findUser = await models['user'].findOne({
            where : {
                id : id
            },
        });
        return findUser;
    }catch(err){
        winston.error(`Unable to findUser(email) for sendEmail[servcie] :`, err);
        throw new Error('DB_FIND_USER_PARA_EMAIL');
    }
}

module.exports = {
    signUp,
    signIn,
}