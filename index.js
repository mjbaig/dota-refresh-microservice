const matchHistoryRefresh = require('./dota/data-refresh/match-history-refresh');
const database = require('./config/database-config');
const logger = require('./config/logger-config')(__filename);

const apiKey = process.env.STEAM_API_KEY

async function main(){

    try{
        await matchHistoryRefresh.refreshPlayerData(apiKey);
    }catch(error){
        logger.error(error);
    }
    
}

main()