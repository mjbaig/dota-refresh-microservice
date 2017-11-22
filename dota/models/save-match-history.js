module.exports = class SaveMatchHistoryModel {

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
    
        constructor(sequelizeObject, logger){
            this.sequelizeObject = sequelizeObject;
            this.logger = logger;
        }

        async save(matchHistoryData){
            await 
        }

        formatDataForUpload(matchHistoryData){
            return {};
        }
    }