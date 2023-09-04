const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'intern',
    waitForConnections: true,
    connectionLimit: 20,
    dateStrings: true
});

async function getConnection(){
    const connection = await pool.getConnection();
    return connection;
}

async function closeConnection(){
    const end = pool.end();
    return end;
}
module.exports = {pool , getConnection, closeConnection}