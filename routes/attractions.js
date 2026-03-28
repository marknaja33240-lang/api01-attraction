const express = require('express');
const router = express.Router();
const pool = require('../db');

// GET: ดึงข้อมูลทั้งหมด
router.get('/', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM attractions');
        res.status(200).json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ 
            error: "Database Error", 
            message: err.message,
            hint: "Check if your TiDB SSL connection is working" 
        });
    }
});

// GET: ดึงข้อมูลตาม id
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const [rows] = await pool.query('SELECT * FROM attractions WHERE id = ?', [id]);
        if (rows.length === 0) return res.status(404).json({ error: 'Attraction not found' });
        res.status(200).json(rows[0]);
    } catch (err) {
        res.status(500).json({ error: "Database Error", message: err.message });
    }
});

// POST: สร้างข้อมูลใหม่
router.post('/', async (req, res) => {
    try {
        const { name, detail, coverimage, latitude, longitude, likes } = req.body;
        const query = 'INSERT INTO attractions (name, detail, coverimage, latitude, longitude, likes) VALUES (?, ?, ?, ?, ?, ?)';
        const values = [name, detail, coverimage, latitude || null, longitude || null, likes || 0];
        const [result] = await pool.query(query, values);
        res.status(201).json({ message: 'Attraction created successfully', id: result.insertId });
    } catch (err) {
        res.status(500).json({ error: "Database Error", message: err.message });
    }
});

// PUT: อัปเดตข้อมูล
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { name, detail, coverimage, latitude, longitude, likes } = req.body;
        const query = 'UPDATE attractions SET name = ?, detail = ?, coverimage = ?, latitude = ?, longitude = ?, likes = ? WHERE id = ?';
        const [result] = await pool.query(query, [name, detail, coverimage, latitude, longitude, likes, id]);
        if (result.affectedRows === 0) return res.status(404).json({ error: 'Attraction not found' });
        res.status(200).json({ message: 'Attraction updated successfully' });
    } catch (err) {
        res.status(500).json({ error: "Database Error", message: err.message });
    }
});

// DELETE: ลบข้อมูล
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const [result] = await pool.query('DELETE FROM attractions WHERE id = ?', [id]);
        if (result.affectedRows === 0) return res.status(404).json({ error: 'Attraction not found' });
        res.status(200).json({ message: 'Attraction deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: "Database Error", message: err.message });
    }
});

module.exports = router;
