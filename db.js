const mysql = require('mysql2');

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: 4000, 
    // บังคับใช้ SSL เพื่อแก้ปัญหา Insecure Transport
    ssl: {
        rejectUnauthorized: false 
    },
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    connectTimeout: 10000 // เพิ่มเวลาเชื่อมต่อเป็น 10 วินาทีป้องกัน Timeout
});

module.exports = pool.promise();
