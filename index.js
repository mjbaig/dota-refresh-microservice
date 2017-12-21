const matchHistoryRefresh = require('./dota/data-refresh/match-history-refresh');
const database = require('./config/database-config');
const logger = require('./config/logger-config');

const apiKey = process.env.STEAM_API_KEY

async function configuration(){

}

async function main(){

    await configuration();

    try{
        await matchHistoryRefresh.refreshPlayerData(apiKey);
    }catch(error){
        logger.error(error);
    }
    
}

main()