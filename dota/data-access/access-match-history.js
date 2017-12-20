'use strict'

const client = require('../../config/database-config');
const logger = require('../../config/logger-config')
const util = require('util');

/**
 * 
 * Saves the match history into the match history table
 * 
 * @param matchHistoryData a json object that contains the data needed to create a new entry in the match history table
 */
async function save(matchHistoryData){
    var query = util.format("select write_match_history(%d,%d,%d,%d,%d,%d);",
        matchHistoryData['match_id'],
        matchHistoryData['match_seq_num'],
        matchHistoryData['start_time'],
        matchHistoryData['lobby_type'],
        matchHistoryData['radiant_team_id'],
        matchHistoryData['dire_team_id']
    );

    try{
        var status = await client.query(query);
    }catch(exception){
        logger.error(exception);
    }
}

module.exports = {save: save};