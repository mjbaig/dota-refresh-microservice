'use strict'
const logger = require('../../config/logger-config')(__filename);
const request = require('request-promise');
const matchHistoryAccessor = require('../data-access/access-match-history');
const matchResultsAccessor = require('../data-access/access-match-results');
const playerStatsAccessor = require('../data-access/access-player-stats');
const playersOfInterestAccessor = require('../data-access/access-players-of-interest');
const util = require('util');
const sleep = util.promisify(setTimeout);

/**
 * 
 * This is function kicks off the process of aquiring the api data and storing it into the database.
 * 
 * @param apiKey is the steam API key required to access the dota match history api API
 */
async function refreshPlayerData(apiKey){
    try{
        logger.info("Refreshing Match Data");
        await saveMatchDataForAllRegisteredPlayers(apiKey);
        logger.info("Refreshing Match Results")
        await saveMatchResultsForNewMatchIds(apiKey);

        logger.info("Data Refresh Seems to be a success.");
    }catch(exception){

        logger.info("Something went wrong while tyring to refresh the player data")
        return cb(exception);
    }

}
 /**
  * This function makes sure that the match results api is only queried for match_ids that exist in the match history table, but not in the match results table.
  * 
  * @param apiKey is the steam API key required to access the dota match history api API 
  */
async function saveMatchResultsForNewMatchIds(apiKey){
        try{
            logger.info("Getting Match ID Discrepancies");
            var unupdatedMatchIds = await playersOfInterestAccessor.matchIdDiscrepancy();
            logger.info("The Discrepancies are: "+ unupdatedMatchIds);
            for(var index = 0; index < unupdatedMatchIds.length - 1; index++){
                var matchId = unupdatedMatchIds[index]['match_id'];
                //Valve requires that the users of this api limit themselves to 1 request per second, so I had to artificially slow down the calls.
                await sleep(1000);
                var matchDetailsData = await getMatchDetails(apiKey, matchId);
                saveMatchResults(matchDetailsData);
                savePlayerStats(matchDetailsData);
            }
        }catch(exception){
            logger.error("Error saving match results ahnd player stats");
            return cb(exception);
        }
        
}

/**
 * Gets the last 100 matches for each player registered in my database and saves them to the database
 * @param apiKey is the steam API key required to access the dota match history api API 
 */
async function saveMatchDataForAllRegisteredPlayers(apiKey){
    try{
        var playerTable = await playersOfInterestAccessor.getPlayersOfInterestData();
        for(var index = 0; index < playerTable.length; index++){
            var playerRow = playerTable[index];
            await sleep(1000);
            await saveMatchHistory(apiKey,playerRow['player_id']);
        }

    }catch(exception){
        logger.error(exception);
        return cb(exception);
    }
}


/**
 * 
 * @param apiKey is the steam API key required to access the dota match history api API
 * @param playerId the ID unique to each DOTA 2 player. Players that have chosen to keep their stats private will show up with this ID: 4294967295
 */
async function saveMatchHistory(apiKey,playerId){
    try{
        var matchHistoryString = await request("https://api.steampowered.com/IDOTA2Match_570/GetMatchHistory/V001/?key="+apiKey+"&account_id="+playerId);
        var matchHistoryData = JSON.parse(matchHistoryString);
        matchHistoryData.result['matches'].forEach(function(match){
            var formattedData = {
                match_id : match['match_id'],
                match_seq_num : match['match_seq_num'],
                start_time: match['start_time'],
                lobby_type: match['lobby_type'],
                radiant_team_id : match['radiant_team_id'],
                dire_team_id : match['dire_team_id'],
            }
            matchHistoryAccessor.save(formattedData);
        });
        logger.info("Saved Match History");
    }catch(exception){
        logger.error("Failed to save match history");
        return cb(exception);
    }
}

/**
 * 
 * This function queries the match details api and returns the data.
 * 
 * @param apiKey is the steam API key required to access the dota match history api API 
 * @param matchId Is the ID given to each individual dota 2 match.
 */
async function getMatchDetails(apiKey, matchId){
    try{
        console.log("https://api.steampowered.com/IDOTA2Match_570/GetMatchDetails/V001/?match_id="+matchId+"&key="+apiKey)
        var matchDetailsString = await request("https://api.steampowered.com/IDOTA2Match_570/GetMatchDetails/V001/?match_id="+matchId+"&key="+apiKey);
        var matchDetailsData = JSON.parse(matchDetailsString).result;
        return matchDetailsData;
    }catch(exception){
        logger.error(exception);
        return cb(exception);
    }
}

/**
 * 
 * This function transforms the data from the match details api and saves it into the match results table
 * 
 * @param matchDetailsData The data that this function transforms and saves into the database
 */
async function saveMatchResults(matchDetailsData){

    //Match Results Schema
    var playerIds = [];
    matchDetailsData['players'].forEach(function(playersObject){
        playerIds.push(playersObject.account_id);
    });

    var matchResults = {
        players :playerIds,
        radiant_win: matchDetailsData.radiant_win,
        duration: matchDetailsData.duration,
        pre_game_duration: matchDetailsData.pre_game_duration,
        start_time: matchDetailsData.start_time,
        match_id: matchDetailsData.match_id,
        match_seq_num : matchDetailsData.match_seq_num,
        tower_status_radiant: matchDetailsData.tower_status_radiant,
        tower_status_dire: matchDetailsData.tower_status_dire,
        barracks_status_radiant: matchDetailsData.barracks_status_radiant,
        barracks_status_dire: matchDetailsData.barracks_status_dire,
        cluster: matchDetailsData.cluster,
        first_blood_time: matchDetailsData.first_blood_time,
        lobby_type: matchDetailsData.lobby_type,
        human_players: matchDetailsData.human_players,
        leagueid: matchDetailsData.leagueid,
        positive_votes: matchDetailsData.positive_votes,
        negative_votes: matchDetailsData.negative_votes,
        game_mode: matchDetailsData.game_mode,
        flags: matchDetailsData.flags,
        engine: matchDetailsData.engine,
        radiant_score: matchDetailsData.radiant_score,
        dire_score: matchDetailsData.dire_score
    };
    try{
        matchResultsAccessor.save(matchResults);
    }catch(error){
        logger.error(error);
        return cb(exception);
    }
    

}

/**
 * 
 * This function transforms the data from the match details api and saves it into the player stats table.
 * This function should only run for players that have been registered in my database.
 * 
 * @param matchDetailsData The data that this function transforms and saves into the database
 */
async function savePlayerStats(matchDetailsData){
    try{
        var playerMap = await playersOfInterestAccessor.getPlayersOfInterestMap();
    }catch(error){
        logger.error(error);
        return cb(exception);
    }
    //Player Stats Schema
    var playerStatsArray = [];
    matchDetailsData['players'].forEach(function(playersObject){
        console.log(playerMap)
        if(playersObject['account_id'] != 4294967295 && !!playerMap[playersObject['account_id']]){
            var playerStats = {
                match_id: matchDetailsData.match_id,
                account_id :playersObject.account_id,
                player_slot :playersObject.player_slot,
                hero_id :playersObject.hero_id,
                item_0 :playersObject.item_0,
                item_1 :playersObject.item_1,
                item_2 :playersObject.item_2,
                item_3 :playersObject.item_3,
                item_4 :playersObject.item_4,
                item_5 :playersObject.item_5,
                backpack_0 :playersObject.backpack_0,
                backpack_1 :playersObject.backpack_1,
                backpack_2 :playersObject.backpack_2,
                kills :playersObject.kills,
                deaths :playersObject.deaths,
                assists :playersObject.assists,
                leaver_status :playersObject.leaver_status,
                last_hits :playersObject.last_hits,
                denies :playersObject.denies,
                gold_per_min :playersObject.gold_per_min,
                xp_per_min :playersObject.xp_per_min,
                level :playersObject.level,
                hero_damage :playersObject.hero_damage,
                tower_damage :playersObject.tower_damage,
                hero_healing :playersObject.hero_healing,
                gold :playersObject.gold,
                gold_spent :playersObject.gold_spent,
                scaled_hero_damage :playersObject.scaled_hero_damage,
                scaled_tower_damage :playersObject.scaled_tower_damage,
                scaled_hero_healing :playersObject.scaled_hero_healing,
                ability_upgrades :playersObject.ability_upgrades
            };
            try{
                playerStatsAccessor.save(playerStats);
            }catch(error){
                logger.error(error);
                return cb(exception);
            }
        }

    });

}

module.exports = {
    refreshPlayerData: refreshPlayerData
}