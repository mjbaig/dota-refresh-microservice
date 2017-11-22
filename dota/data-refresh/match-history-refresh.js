// player_name=<name> # Search matches with a player name, exact match only
// hero_id=<id> # Search for matches with a specific hero being played, hero id's are in dota/scripts/npc/npc_heroes.txt in your Dota install directory
// skill=<skill>  # 0 for any, 1 for normal, 2 for high, 3 for very high skill
// date_min=<date> # date in UTC seconds since Jan 1, 1970 (unix time format)
// date_max=<date> # date in UTC seconds since Jan 1, 1970 (unix time format)
// account_id=<id> # Steam account id (this is not SteamID, its only the account number portion)
// league_id=<id> # matches for a particular league
// start_at_match_id=<id> # Start the search at the indicated match id, descending
// matches_requested=<n> # Defaults is 25 matches, this can limit to less
// https://api.steampowered.com/IDOTA2Match_570/GetMatchDetails/V001/?match_id=27110133&key=<key>
//https://api.steampowered.com/IDOTA2Match_570/GetMatchHistory/V001/?key=<key>&account_id=76561198180349542
//https://api.steampowered.com/IDOTA2Match_205790/GetHeroes/v1/
// "http://replay" + match.cluster + ".valve.net/570/" + match.match_id + "_" + match.replay_salt + ".dem.bz2?v=1"

'use strict'

const request = require('request-promise');

async function getMyMatchHistory(apiKey, databaseObject, logger){
    var matchHistoryString = await request("https://api.steampowered.com/IDOTA2Match_570/GetMatchHistory/V001/?key="+apiKey+"&account_id=76561198180349542");
    var matchHistoryData = JSON.parse(matchHistoryString);
    matchHistoryData.result['matches'].forEach(function(match){
        console.log({
            match_id : match['match_id'],
            match_seq_num : match['match_seq_num'],
            start_time: match['start_time'],
            lobby_type: match['lobby_type'],
            radiant_team_id : match['radiant_team_id'],
            dire_team_id : match['dire_team_id'],
        });
    });
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

async function saveMyMatchHistory(apiKey, databaseObject, logger){

}

var matchHistorySchema = {
    match_id :'',
    match_seq_num : '',
    start_time: '',
    lobby_type: '',
    radiant_team_id : '',
    dire_team_id : '',
}

var matchResultsSchema = {
    players :[],
    radiant_win: '',
    duration: '',
    pre_game_duration: '',
    start_time: '',
    match_id: '',
    match_seq_num : '',
    tower_status_radiant: '',
    tower_status_dire: '',
    barracks_status_radiant: '',
    barracks_status_dire: '',
    cluster: '',
    first_blood_time: '',
    lobby_type: '',
    human_players: '',
    leagueid: '',
    positive_votes: '',
    negative_votes: '',
    game_mode: '',
    flags: '',
    engine: '',
    radiant_score: '',
    dire_score: ''
}

var playerStatsSchema = {
    match_id: '',
    account_id :'',
    player_slot :'',
    hero_id :'',
    item_0 :'',
    item_1 :'',
    item_2 :'',
    item_3 :'',
    item_4 :'',
    item_5 :'',
    backpack_0 :'',
    backpack_1 :'',
    backpack_2 :'',
    kills :'',
    deaths :'',
    assists :'',
    leaver_status :'',
    last_hits :'',
    denies :'',
    gold_per_min :'',
    xp_per_min :'',
    level :'',
    hero_damage :'',
    tower_damage :'',
    hero_healing :'',
    gold :'',
    gold_spent :'',
    scaled_hero_damage :'',
    scaled_tower_damage :'',
    scaled_hero_healing :'',
    ability_upgrades :''
}

module.exports = {
    getMyMatchHistory:getMyMatchHistory,
    getMyMatchDetails:getMyMatchDetails,
    saveMyMatchHistory: saveMyMatchHistory
}