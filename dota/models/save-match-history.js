const database = require('../../config/database-config');
const Sequelize = require('sequelize');

MatchHistoryData = database.define('match_history', {
    match_id: {
    type: Sequelize.STRING
    },
    match_seq_num: {
    type: Sequelize.STRING
    },
    start_time: {
        type: Sequelize.STRING
    },
    lobby_type: {
        type: Sequelize.STRING
    },
    radiant_team_id: {
        type: Sequelize.STRING
    },
    dire_team_id: {
        type: Sequelize.STRING
    }
});

async function save(matchHistoryData){
    return formatDataForUpload(matchHistoryData);
}

function formatDataForUpload(matchHistoryData){
    formattedMatchHistoryData = {}
    matchHistoryData.result['matches'].forEach(function(match){
        formattedMatchHistoryData = {
            match_id : match['match_id'],
            match_seq_num : match['match_seq_num'],
            start_time: match['start_time'],
            lobby_type: match['lobby_type'],
            radiant_team_id : match['radiant_team_id'],
            dire_team_id : match['dire_team_id'],
        };
    });
    return formattedMatchHistoryData;
}
module.exports = {save: save};