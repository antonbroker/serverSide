const express = require('express');
const router = express.Router();
const { MongoClient, ObjectID } = require('mongodb');

// Middleware for processing JSON:
router.use(express.json());

// POST - "/addcalories/""
router.post('/', async (req, res) => {
    
    const user_id = req.body.user_id
    const year = req.body.year
    const month = req.body.month
    const day = req.body.day
    const description = req.body.description
    const category = req.body.category
    const amount = req.body.amount

    console.log(user_id, year, month, day, description, category, amount)
    
    try 
    {
        //const url = 'mongodb+srv://AntonIosifov:bKaSmH8Owccm817g@finalproject.dzk0ann.mongodb.net/?retryWrites=true&w=majority&appName=FinalProject';
        //const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
        //await client.connect();

        //const db = client.db('calories_manager');
        const db = req.db;
        const collection = db.collection('calories');

        const newCalorieItem = {
            user_id: user_id,
            date: new Date(year, month - 1, day),
            description: description,
            category: category,
            amount: amount
        };

        await collection.insertOne(newCalorieItem);
        

        res.status(201).json({ message: 'Calorie consumption item added successfully' });
    } 
    catch (error) 
    {
        console.error('Error adding calorie item:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;