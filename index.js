const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors()); // เปิดรับทุก Origin
app.use(express.json()); // รับ-ส่งข้อมูลแบบ JSON

// Routes
const attractionsRouter = require('./routes/attractions');
app.use('/attractions', attractionsRouter);

// Global Error Handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

// Start Server เฉพาะตอนที่รันแบบ Local (ไม่ใช่ Production บน Vercel)
if (process.env.NODE_ENV !== 'production') {
    const PORT = process.env.PORT || 3333;
    app.listen(PORT, () => {
        console.log(`Server is running locally on port ${PORT}`);
    });
}

// Export app สำหรับ Vercel (Serverless Functions)
module.exports = app;