'use strict'

const client = require('../../config/database-config');
const logger = require('../../config/logger-config')
const util = require('util');

/**
 * 
 * This function saves the match results data to the match results table table
 * 
 * @param matchResultsData 
 */
async function save(matchResultsData){
    var playersArrayString = matchResultsData.players.reduce(function(x,y){return x.toString()+","+y.toString()});
    var playersArrayString = '\'{'+playersArrayString+'}\'::BIGINT[]';
    var query = util.format("select write_match_results(%s,%s,%d,%d,%d,%d,%d,%d,%d,%d,%d,%d,%d,%d,%d,%d,%d,%d,%d,%d,%d,%d,%d);",
        playersArrayString,
        matchResultsData.radiant_win,
        matchResultsData.duration,
        matchResultsData.pre_game_duration,
        matchResultsData.start_time,
        matchResultsData.match_id,
        matchResultsData.match_seq_num,
        matchResultsData.tower_status_radiant,
        matchResultsData.tower_status_dire,
        matchResultsData.barracks_status_radiant,
        matchResultsData.barracks_status_dire,
        matchResultsData.cluster,
        matchResultsData.first_blood_time,
        matchResultsData.lobby_type,
        matchResultsData.human_players,
        matchResultsData.leagueid,
        matchResultsData.positive_votes,
        matchResultsData.negative_votes,
        matchResultsData.game_mode,
        matchResultsData.flags,
        matchResultsData.engine,
        matchResultsData.radiant_score,
        matchResultsData.dire_score
    );
    try{
        var status = await client.query(query);
    }catch(exception){
        logger.error(exception);
    }
}



module.exports = {save: save};