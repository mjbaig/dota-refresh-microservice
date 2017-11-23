'use strict'

const request = require('request-promise');
//const matchHistoryModel = require('../models/save-match-history');

async function getMyMatchHistory(apiKey, databaseObject, logger){
    var matchHistoryString = await request("https://api.steampowered.com/IDOTA2Match_570/GetMatchHistory/V001/?key="+apiKey+"&account_id=76561198180349542");
    var matchHistoryData = JSON.parse(matchHistoryString);
    //console.log(matchHistoryModel.formatDataForUpload(matchHistoryData));
    return matchHistoryData;
}

async function saveMyMatchHistory(apiKey, databaseObject, logger){
    var matchHistoryString = await request("https://api.steampowered.com/IDOTA2Match_570/GetMatchHistory/V001/?key="+apiKey+"&account_id=76561198180349542");
    var matchHistoryData = JSON.parse(matchHistoryString);
    return matchHistoryData;
}

async function getMyMatchDetails(matchId, apiKey, databaseObject, logger){
    var matchDetailsString = await request("https://api.steampowered.com/IDOTA2Match_570/GetMatchDetails/V001/?match_id="+matchId+"&key="+apiKey);
    var matchDetailsData = JSON.parse(matchDetailsString).result;
    
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

    //Player Stats Schema
    var playerStatsArray = [];
    matchDetailsData['players'].forEach(function(playersObject){
        var playerStats = {
            match_id: matchId,
            account_id :playersObject.account_id,
            player_slot :playersObject.account_id,
            hero_id :playersObject.account_id,
            item_0 :playersObject.account_id,
            item_1 :playersObject.account_id,
            item_2 :playersObject.account_id,
            item_3 :playersObject.account_id,
            item_4 :playersObject.account_id,
            item_5 :playersObject.account_id,
            backpack_0 :playersObject.account_id,
            backpack_1 :playersObject.account_id,
            backpack_2 :playersObject.account_id,
            kills :playersObject.account_id,
            deaths :playersObject.account_id,
            assists :playersObject.account_id,
            leaver_status :playersObject.account_id,
            last_hits :playersObject.account_id,
            denies :playersObject.account_id,
            gold_per_min :playersObject.account_id,
            xp_per_min :playersObject.account_id,
            level :playersObject.account_id,
            hero_damage :playersObject.account_id,
            tower_damage :playersObject.account_id,
            hero_healing :playersObject.account_id,
            gold :playersObject.account_id,
            gold_spent :playersObject.account_id,
            scaled_hero_damage :playersObject.account_id,
            scaled_tower_damage :playersObject.account_id,
            scaled_hero_healing :playersObject.account_id,
            ability_upgrades :playersObject.ability_upgrades
        };
        playerStatsArray.push(playerStats);
    });


    console.log(playerStatsArray);

    return matchDetailsData; 
}

module.exports = {
    getMyMatchHistory:getMyMatchHistory,
    getMyMatchDetails:getMyMatchDetails
}