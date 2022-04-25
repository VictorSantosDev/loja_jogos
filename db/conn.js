const mysql = require('mysql');

// Desenvolvimento
// const pool = mysql.createPool({
//     connectionLimit: 10,
//     host: 'localhost',
//     user: 'root',
//     password: '',
//     database: 'loja_eletronica'
// });

// produção
const pool = mysql.createPoll({
    connectionLimit: 10,
    host: 'us-cdbr-east-05.cleardb.net',
    user: 'be7b28157c7767',
    password: 'c03f623a',
    database: 'heroku_128f32d67dd5426'
});

module.exports = pool;