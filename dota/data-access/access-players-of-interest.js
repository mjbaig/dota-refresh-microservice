'use strict'
const client = require('../../config/database-config');
const logger = require('../../config/logger-config')
const util = require('util');



async function getPlayersOfInterestData(){
    var query = 'select * from get_players_of_interest()'
    var playersOfInterestData = {}

    try{
        playersOfInterestData = await client.query(query);
    }catch(exception){
        logger.info("Something went wrong when tyring to get the players of interest. DO SOMETHING ABOUT IT!")
        logger.error(exception);
    }
    return playersOfInterestData.rows;
}

module.exports = {getPlayersOfInterestData: getPlayersOfInterestData};
