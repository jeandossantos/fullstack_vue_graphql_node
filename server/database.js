const {  Client } = require('pg');

const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'namegator',
    password: '94198380',
    port: 5432
})

client.connect();

exports.execute = async function (query, values) {
    return new Promise((resolve, reject) => {
        client.query(query, (error, res) => {
            if(error) {
                reject(error);
            } else {
                resolve(res.rows);
            }
        })
    })
}