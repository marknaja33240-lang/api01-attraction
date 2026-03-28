const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors()); 
app.use(express.json()); 

// ดึงข้อมูล Database Connection
const db = require('./db');

// Routes - เขียนแบบ Direct ในนี้เลยเพื่อลดโอกาสหาไฟล์ route ไม่เจอใน Vercel
app.get('/attractions', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM attractions');
        res.status(200).json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});

// หน้าแรกเผื่อเช็คว่า API รันอยู่ไหม
app.get('/', (req, res) => {
    res.send('Attraction API is running...');
});

// Global Error Handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

module.exports = app;
