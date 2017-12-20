'use strict'

const client = require('../../config/database-config');
const logger = require('../../config/logger-config')
const util = require('util');

/**
 * 
 * This function saves the match results data to the player stats table
 * 
 * @param matchResultsData is a json object of the data to be stored to the postgres table
 * 
 */
async function save(matchResultsData){

    var statsJson = '\''+JSON.stringify(matchResultsData['ability_upgrades'])+'\'::JSONB';
    var query = util.format("select write_player_stats(%d,%d,%d,%d,%d,%d,%d,%d,%d,%d,%d,%d,%d,%d,%d,%d,%d,%d,%d,%d,%d,%d,%d,%d,%d,%d,%d,%d,%d,%d,%s);",
        matchResultsData['match_id'],
        matchResultsData['account_id'],
        matchResultsData['player_slot'],
        matchResultsData['hero_id'],
        matchResultsData['item_0'],
        matchResultsData['item_1'],
        matchResultsData['item_2'],
        matchResultsData['item_3'],
        matchResultsData['item_4'],
        matchResultsData['item_5'],
        matchResultsData['backpack_0'],
        matchResultsData['backpack_1'],
        matchResultsData['backpack_2'],
        matchResultsData['kills'],
        matchResultsData['deaths'],
        matchResultsData['assists'],
        matchResultsData['leaver_status'],
        matchResultsData['last_hits'],
        matchResultsData['denies'],
        matchResultsData['gold_per_min'],
        matchResultsData['xp_per_min'],
        matchResultsData['level'],
        matchResultsData['hero_damage'],
        matchResultsData['tower_damage'],
        matchResultsData['hero_healing'],
        matchResultsData['gold'],
        matchResultsData['gold_spent'],
        matchResultsData['scaled_hero_damage'],
        matchResultsData['scaled_tower_damage'],
        matchResultsData['scaled_hero_healing'],
        statsJson,

    );
    try{
        var status = await client.query(query);
    }catch(exception){
        logger.error(exception);
    }
}

module.exports = {save: save};