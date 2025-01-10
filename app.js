require('dotenv').config();
const mysql = require('mysql2');

const pool = mysql.createPool({
    host: process.env.db_host,
    user: process.env.db_user,
    password: process.env.db_password,
    database: process.env.db_database
});

pool.query('select * from users where id=1;', (err, results) =>{
    if(err) {
        console.error('error querying database', err);
        return;
    }
    console.log('result of query: ', results);
});

// handle shutdown
const shutdown = () => {
    pool.end(err => {
        if (err) {
            console.error('error closing pool', err);

        }
        else {
            console.log('pool closed');

        }
        process.exit(err ? 1 : 0);
    });
};

process.on('SIGINT', shutdown); // handle ctrl c
process.on('SIGTERM', shutdown); // handle termination (e.g. from docker or a server)