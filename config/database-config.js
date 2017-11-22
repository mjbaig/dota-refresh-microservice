const Sequelize = require('sequelize');

function getDatabase(){
    
    const sequelize = new Sequelize('testdatabase','test','test',{
        host: 'localhost',
        dialect: 'postgres',
        pool:{
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        }
    });
    
    sequelize
    .authenticate()
    .then(() => {
      console.log('Connection has been established successfully.');
    })
    .catch(err => {
      console.error('Unable to connect to the database:', err);
    });

    return sequelize
}

module.exports = {getDatabase: getDatabase}