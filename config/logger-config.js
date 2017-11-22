let logger = require('winston');

function getLogger(){
    
    logger.add(logger.transports.File, { filename: 'somefile.log' });
    
    logger.info("Logger Configured");

    return logger;

}

module.exports = {getLogger:getLogger}