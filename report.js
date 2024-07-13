const express = require('express');
const router = express.Router();
const { MongoClient } = require('mongodb');

// report?user_id=123123&month=6&year=2024

// GET - "/report/"
router.get('/', async (req, res) => {
    
    const user_id = req.query.user_id
    const month = req.query.month
    const year = req.query.year

    const db = req.db;
    const caloriesCollection = db.collection('calories');

    try 
    {
        // Get data about calorie intake for current user:
        const startDate = new Date(year, month - 1, 1);
        const endDate = new Date(year, month, 1);
        
        const caloriesData = await caloriesCollection.find({
            user_id: user_id,
            date: {
                $gte: startDate,
                $lt: endDate
            }
        }).toArray();

        // Report:
        const report = {
            breakfast: [],
            lunch: [],
            dinner: [],
            other: []
        };

        caloriesData.forEach(user => {
            const day = user.date.getDate();
            const category = user.category;

            if (report[category]) 
            {
                report[category].push({
                    day: day,
                    description: user.description,
                    amount: user.amount
                });
            }
        });

        // Return report in JSON
        res.json(report);
    } 
    catch (error) 
    {
        console.error('Error fetching calorie report:', error);
        res.status(500).send('Internal server error');
    }
});

module.exports = router;

