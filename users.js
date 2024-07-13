const express = require('express');
const router = express.Router();
const { ObjectID } = require('mongodb');


// GET  - "/users/:id"
router.get('/:id', async (req, res) => {
    try 
    {
        const userId = req.params.id;                           // object ID, not user_id
        const usersCollection = req.db.collection('users');     // User collection

        // Get data about User with object ID:
        const user = await usersCollection.findOne({ id: userId }); 

        // If user is not found:
        if (!user) 
        {
            return res.status(404).json({ message: 'User is not found' });
        }
        // Return user data in JSON:
        res.status(200).json(user);
    } 
    catch (error)
    {
        console.error('Error while fetching user:', error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
