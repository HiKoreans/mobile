const { Sequelize, Op, Model}= require('sequelize');
const { modelDefines, modelList } = require('./model');
const winston = require('../common/winston');

const models = {};


const initialize = async () => {
    const sequelize = new Sequelize('mobile', 'postgres', 'ansdlsqo0161',
        {
            host: 'localhost',
            dialect: 'postgres',
            logging: winston.debug.bind(winston)
        }
    )

    const modelInit = async () =>{
        for(let i =0; i <modelList.length; i++){
            models[modelList[i]] = await modelDefines[modelList[i]](sequelize);
        }
    }
    const relationInit = async () => {
        for (let i = 0; i < modelList.length; i++) {
            models[modelList[i]].associate(models)
        }
    }

    try {
        await sequelize.authenticate();
        winston.info(`sequelize connect successfully.`);
    } catch (error) {
        winston.error(`Unable to connect to the database:`, error); //error : connect ECONNREFUSED 127.0.0.1:5432
        throw new Error('Unable to connect to the database');
    }
    await modelInit();
    await relationInit();
    console.log('db 연동 성공')
    winston.info(`db init finish`);
}

module.exports = {
    initialize,
    models,
    Op
}
