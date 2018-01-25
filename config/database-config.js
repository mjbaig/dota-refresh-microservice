const pg = require('pg');
const logger = require('./logger-config')(__filename);

const databaseType = 'postgres';
const host = process.env.POSTGRES_HOST;
const user = process.env.POSTGRES_USER;
const password = process.env.POSTGRES_PASSWORD;
const databaseName = process.env.POSTGRES_DATABASE_NAME;
const connectionString = "postgres://"+user+ ":"+password+"@"+host+"/"+databaseName

var client = new pg.Client(connectionString)
try{
    client.connect();
}catch(error){
    logger.error("Could not connect to database");
    return cb(exception);
}


module.exports = client;