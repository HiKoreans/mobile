const winston = require('winston'); 
const winstonDaily = require('winston-daily-rotate-file');
const appRoot = require('app-root-path');
const { combine, timestamp, label, printf } = winston.format;

// error: 0, warn: 1, info: 2, http: 3, verbose: 4, debug: 5, silly: 6
const myFormat = printf( (info) => {
    return `${info.timestamp} ${info.level}: ${info.message}`;
});


let logger = new winston.createLogger({
    level: 'info',
    format : combine (
        timestamp ({
            format : "YYYY-MM-DD HH:mm:ss",
        }),
        myFormat,
    ),
    transports: [
        new winstonDaily({
          level: 'debug',
          datePattern: 'YYYY-MM-DD',
          filename: `${appRoot}/logs/%DATE%.debug.log`,
          maxFiles: 30,
          zippedArchive: true,
        }),
        new winstonDaily({
          level : 'info',
          datePattern : 'YYYY-MM-DD',
          filename :  `${appRoot}/logs/%DATE%.info.log`,
          maxFiles : 30,
          zippedArchive : true,
      }),
      new winstonDaily({
        level: 'warn',
        datePattern: 'YYYY-MM-DD',
        filename: `${appRoot}/logs/error/%DATE%.warn.log`,
        maxFiles: 30,
        zippedArchive: true,
      }),
      new winstonDaily({
        level: 'error',
        datePattern: 'YYYY-MM-DD',
        filename: `${appRoot}/logs/error/%DATE%.error.log`,
        maxFiles: 30,
        zippedArchive: true,
      }),
      
      
    ],
    exitOnError: false, 
});
 
// if(process.env.NODE_ENV !== 'development'){
logger.add(new winston.transports.Console({
    format : winston.format.combine(
        winston.format.colorize(),
        winston.format.simple(),
    )
}))
// }
 

module.exports = logger;