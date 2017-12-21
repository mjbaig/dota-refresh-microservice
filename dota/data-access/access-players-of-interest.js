'use strict'
const client = require('../../config/database-config');
const logger = require('../../config/logger-config')
const util = require('util');

/**
 * Gets the match ids that are in the match history table but not in the match results table
 */
async function matchIdDiscrepancy(){
    var query = 'select match_id from getMatchIdDiscrepancy();';
    var matchIdDiscrepancy = {};

    try{
        matchIdDiscrepancy = await client.query(query);
    }catch(exception){
        logger.info("Something went wrong when tyring to get the difference in match ids between the match history table and the match results table. DO SOMETHING ABOUT IT!");
        logger.error(exception);
    }
    return matchIdDiscrepancy.rows;
}

/**
 *  Gets an array of objects with player_id and player_name
 *  eg: [{player_id:xxx, player_name:"xxx"}]
 */
async function getPlayersOfInterestData(){
    var query = 'select player_id, player_name from get_players_of_interest()';
    var playersOfInterestData = {};

    try{
        playersOfInterestData = await client.query(query);
    }catch(exception){
        logger.info("Something went wrong when tyring to get the players of interest. DO SOMETHING ABOUT IT!");
        logger.error(exception);
    }
    return playersOfInterestData.rows;
}

async function getPlayersOfInterestMap(){
    try{
        var playersOfInterestArray = await getPlayersOfInterestData();
        var playersOfInterestMap = {};
        playersOfInterestArray.forEach(function(playerData){
            playersOfInterestMap[playerData['player_id']] = playerData;
        });
        return playersOfInterestMap;
    }catch(error){
        logger.error(error);
    }
}

module.exports = {
                    getPlayersOfInterestData: getPlayersOfInterestData,
                    matchIdDiscrepancy: matchIdDiscrepancy,
                    getPlayersOfInterestMap: getPlayersOfInterestMap
                };
