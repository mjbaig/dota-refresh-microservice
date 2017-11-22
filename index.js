const matchHistoryRefresh = require('./dota/data-refresh/match-history-refresh');

const apiKey = process.env.STEAM_API_KEY
const databaseObject = {};
const logger = {};

async function main(){

    var data = await matchHistoryRefresh.getMyMatchHistory(apiKey, databaseObject, logger);
    console.log(data);
    var taco = await matchHistoryRefresh.getMyMatchDetails('3560938900', apiKey, databaseObject, logger);
    console.log(taco);

}

main()