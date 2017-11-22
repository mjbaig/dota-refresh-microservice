const Sequelize = require('sequelize');

const databaseType = 'postgres';
const host = process.env.POSTGRES_HOST;
const user = process.env.POSTGRES_USER;
const password = process.env.POSTGRES_PASSWORD;
const databaseName = process.env.POSTGRES_DATABASE_NAME;

function getDatabase(){
    
    const sequelize = new Sequelize(databaseName, user, password,{
        host: host,
        dialect: databaseType,
        pool:{
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        },
        operatorsAliases: false
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