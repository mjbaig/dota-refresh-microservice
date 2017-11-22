const matchHistoryRefresh = require('./dota/data-refresh/match-history-refresh');
const database = require('./config/database-config').getDatabase();
const logger = require('./config/logger-config').getLogger();

const apiKey = process.env.STEAM_API_KEY

async function configuration(){

}

async function main(){

    await configuration();

    var data = await matchHistoryRefresh.getMyMatchHistory(apiKey, database, logger);
    logger.info("data");
    //var taco = await matchHistoryRefresh.getMyMatchDetails('3560938900', apiKey, database, logger);
    logger.info("taco");

}

main()