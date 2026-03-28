const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'gateway01.ap-southeast-1.prod.aws.tidbcloud.com',
    user: '4JJR88xdmhuKi8Z.root',
    password: 'pyefQ6SgyfrG3NGF',
    database: 'attraction_db',
    port: 4000, 
    ssl: {
        rejectUnauthorized: false 
    },
    waitForConnections: true,
    connectionLimit: 1,
    queueLimit: 0
});

module.exports = pool.promise();
