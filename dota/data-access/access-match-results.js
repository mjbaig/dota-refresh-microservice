'use strict'

const client = require('../../config/database-config');
const logger = require('../../config/logger-config')
const util = require('util');

async function save(matchResultsData){
    var playersArrayString = matchResultsData.players.reduce(function(x,y){return x.toString()+","+y.toString()});
    var playersArrayString = '{'+playersArrayString+'}::int[]';
    var query = util.format("select write_match_results(%d,%s,%d,%d,%d,%d,%d,%d,%d,%d,%d,%d,%d,%d,%d,%d,%d,%d,%d,%d,%d,%d,%d);",
        playersArrayString,
        matchDetailsData.radiant_win,
        matchDetailsData.duration,
        matchDetailsData.pre_game_duration,
        matchDetailsData.start_time,
        matchDetailsData.match_id,
        matchDetailsData.match_seq_num,
        matchDetailsData.tower_status_radiant,
        matchDetailsData.tower_status_dire,
        matchDetailsData.barracks_status_radiant,
        matchDetailsData.barracks_status_dire,
        matchDetailsData.cluster,
        matchDetailsData.first_blood_time,
        matchDetailsData.lobby_type,
        matchDetailsData.human_players,
        matchDetailsData.leagueid,
        matchDetailsData.positive_votes,
        matchDetailsData.negative_votes,
        matchDetailsData.game_mode,
        matchDetailsData.flags,
        matchDetailsData.engine,
        matchDetailsData.radiant_score,
        matchDetailsData.dire_score
    );
    console.log(query);
    try{
        //var status = await client.query(query);
        console.log(query);
    }catch(exception){
        logger.error(exception);
    }
}



module.exports = {save: save};