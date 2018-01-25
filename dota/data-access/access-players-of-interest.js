'use strict'
const client = require('../../config/database-config');
const logger = require('../../config/logger-config')(__filename);
const util = require('util');

/**
 * Gets the match ids that are in the match history table but not in the match results table
 */
async function matchIdDiscrepancy(){
    var query = 'select match_id from dota.getMatchIdDiscrepancy();';
    var matchIdDiscrepancy = {};

    try{
        logger.info("Getting the match discrepancies with this query: "+query);
        matchIdDiscrepancy = await client.query(query);
    }catch(exception){
        logger.info("Something went wrong when tyring to get the difference in match ids between the match history table and the match results table. DO SOMETHING ABOUT IT!");
        logger.error(exception);
        return cb(exception);
    }
    return matchIdDiscrepancy.rows;
}

/**
 *  Gets an array of objects with player_id and player_name
 *  eg: [{player_id:xxx, player_name:"xxx"}]
 */
async function getPlayersOfInterestData(){
    var query = 'select player_id, player_name from dota.get_players_of_interest()';
    var playersOfInterestData = {};

    try{
        logger.info("Getting Players of Interest");
        playersOfInterestData = await client.query(query);
    }catch(exception){
        logger.info("Something went wrong when tyring to get the players of interest. DO SOMETHING ABOUT IT!");
        logger.error(exception);
        return cb(exception);
    }
    return playersOfInterestData.rows;
}

async function getPlayersOfInterestMap(){
    try{
        var playersOfInterestArray = await getPlayersOfInterestData();
        logger.info("Players of Interest Array: "+playersOfInterestArray);
        var playersOfInterestMap = {};
        playersOfInterestArray.forEach(function(playerData){
            playersOfInterestMap[playerData['player_id']] = playerData;
        });
        return playersOfInterestMap;
    }catch(error){
        logger.error(error);
        return cb(exception);
    }
}

module.exports = {
                    getPlayersOfInterestData: getPlayersOfInterestData,
                    matchIdDiscrepancy: matchIdDiscrepancy,
                    getPlayersOfInterestMap: getPlayersOfInterestMap
                };
