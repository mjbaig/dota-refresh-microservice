const pg = require('pg');

const databaseType = 'postgres';
const host = process.env.POSTGRES_HOST;
const user = process.env.POSTGRES_USER;
const password = process.env.POSTGRES_PASSWORD;
const databaseName = process.env.POSTGRES_DATABASE_NAME;
const connectionString = "postgres://"+user+ ":"+password+"@"+host+"/"+databaseName

var client = new pg.Client(connectionString)
client.connect();

module.exports = client;