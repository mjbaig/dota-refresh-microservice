const matchHistoryRefresh = require('./dota/data-refresh/match-history-refresh');
const database = require('./config/database-config');
const logger = require('./config/logger-config');

const apiKey = process.env.STEAM_API_KEY

async function configuration(){

}

async function main(){

    await configuration();

    try{
        //var data = await matchHistoryRefresh.saveMyMatchHistory(apiKey, 220083814);
        var data = await matchHistoryRefresh.refreshPlayerData();
    }catch(error){
        logger.error(error);
    }
    
    logger.info(data);

    // //var taco = await matchHistoryRefresh.getMyMatchDetails('3560938900', apiKey, database, logger);
    // logger.info("taco");

}

main()