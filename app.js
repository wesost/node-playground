require('dotenv').config();
const mysql = require('mysql2');
const readline = require('readline');

const pool = mysql.createPool({
    host: process.env.db_host,
    user: process.env.db_user,
    password: process.env.db_password,
    database: process.env.db_database
});

const line = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


const checkUser = (user) => {

    pool.query('select COUNT(*) as count from users where username = ?', [user], (err, results) =>{ // can also do '${user}' instead of ...?', [user]
        if(err) {
            console.error('error querying database', err);
            line.close();
            shutdown();
            return;
        }
        console.log('result of query: ', results);
    
        if(results[0].count > 0){
            console.log(`username "${user}" already taken`);
            // alert('username taken');
            prompt();
            // show popup element, do not create new entry to db
        }
        else {
            console.log(`new account created, welcome "${user}"`);
            line.close();
            shutdown();
        }
    });
}


const prompt = () => {
    line.question('enter username: ', (user) => {
        checkUser(user);
    });
}

prompt();










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