module.exports = class SaveMatchHistoryModel {

    playerStats = sequelize.define('player_stats', {
        match_id: {
            type: Sequelize.BIGINT
        },
        account_id :{
            type: Sequelize.BIGINT
        },
        player_slot :{
            type: Sequelize.INTEGER
        },
        hero_id :{
            type: Sequelize.INTEGER
        },
        item_0 :{
            type: Sequelize.INTEGER
        },
        item_1 :{
            type: Sequelize.INTEGER
        },
        item_2 :{
            type: Sequelize.INTEGER
        },
        item_3 :{
            type: Sequelize.INTEGER
        },
        item_4 :{
            type: Sequelize.INTEGER
        },
        item_5 :{
            type: Sequelize.INTEGER
        },
        backpack_0 :{
            type: Sequelize.INTEGER
        },
        backpack_1 :{
            type: Sequelize.INTEGER
        },
        backpack_2 :{
            type: Sequelize.INTEGER
        },
        kills :{
            type: Sequelize.INTEGER
        },
        deaths :{
            type: Sequelize.INTEGER
        },
        assists :{
            type: Sequelize.INTEGER
        },
        leaver_status :{
            type: Sequelize.INTEGER
        },
        last_hits :{
            type: Sequelize.INTEGER
        },
        denies :{
            type: Sequelize.INTEGER
        },
        gold_per_min :{
            type: Sequelize.INTEGER
        },
        xp_per_min :{
            type: Sequelize.INTEGER
        },
        level :{
            type: Sequelize.INTEGER
        },
        hero_damage :{
            type: Sequelize.INTEGER
        },
        tower_damage :{
            type: Sequelize.INTEGER
        },
        hero_healing :{
            type: Sequelize.INTEGER
        },
        gold :{
            type: Sequelize.INTEGER
        },
        gold_spent :{
            type: Sequelize.INTEGER
        },
        scaled_hero_damage :{
            type: Sequelize.INTEGER
        },
        scaled_tower_damage :{
            type: Sequelize.INTEGER
        },
        scaled_hero_healing :{
            type: Sequelize.INTEGER
        },
        ability_upgrades :{
            type: Sequelize.Sequelize.JSONB
        },
    });

    constructor(sequelizeObject, logger){
        this.sequelizeObject = sequelizeObject;
        this.logger = logger;
    }
}