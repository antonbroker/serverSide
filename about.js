const express = require('express');
const router = express.Router();

// GET - "/about/"
router.get('/', async (req, res) => {
    try 
    {
        const developers = [
            {firstname: 'Anton', lastname: 'Iosifov', id: 336490347, email: 'iosifov.a.14@gmail.com'},
            {firstname: 'Dan', lastname: 'Magid', id: 208712166, email: 'dan97mm@gmail.com'},
            {firstname: 'Shay', lastname: 'Tekel', id: 318508405, email: 'shaytekel@gmail.com'}
        ];

        res.status(200).json(developers);
    } 
    catch (error) // error
    {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;