let logger = require('winston');

const logFilePath = process.env.WINSTON_LOG_PATH;

function getLogger(){
    
    logger.add(logger.transports.File, { filename: logFilePath+'somefile.log' });
    
    logger.info("Logger Configured");

    return logger;

}

module.exports = {getLogger:getLogger}