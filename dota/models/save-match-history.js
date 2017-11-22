MatchHistoryData = sequelize.define('match_history', {
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
}

function formatDataForUpload(matchHistoryData, sequelizeObject, logger){
    matchHistoryData.result['matches'].forEach(function(match){
        return {
            match_id : match['match_id'],
            match_seq_num : match['match_seq_num'],
            start_time: match['start_time'],
            lobby_type: match['lobby_type'],
            radiant_team_id : match['radiant_team_id'],
            dire_team_id : match['dire_team_id'],
        };
    });
}

module.exports = {
    formatDataForUpload: formatDataForUpload
}