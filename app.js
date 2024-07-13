// Imports:
const express = require('express');
const { MongoClient } = require('mongodb');
const bodyParser = require('body-parser');

const app = express();      // Creates an Express application
const port = 3000;          // Port is 3000

app.use(bodyParser.json()); // Returns middleware that only parses json and only looks at requests where the Content-Type header matches the type option.

// URL for connecting to MongoDB Atlas:
const url = 'mongodb+srv://AntonIosifov:bKaSmH8Owccm817g@finalproject.dzk0ann.mongodb.net/?retryWrites=true&w=majority&appName=FinalProject';
const client = new MongoClient(url);

async function main() 
{
    try 
    {
        console.log('Connecting to MongoDB...');
        await client.connect();             
        console.log('Connected to MongoDB');

        const db = client.db('calories_manager');               // New Db instance sharing the current socket connections. 
        const usersCollection = db.collection('users');         // Returns a reference to a MongoDB Collection - 'users'.
        const caloriesCollection = db.collection('calories');   // Returns a reference to a MongoDB Collection - 'calories'.

        // Adding first document(user) to collection 'users':
        const firstUser = {
            id: "123123",
            first_name: "moshe",
            last_name: "israeli",
            birthday: new Date("1990-01-10")
        };

        await usersCollection.insertOne(firstUser);
        console.log('First user was added to Users collection!');

        // Middleware for connecting to  MongoDB:
        const connectDB = (req, res, next) => {
            req.db = db; 
            req.dbClient = client;
            next();
        };

        // Connecting of routes with using middleware:
        const addCaloriesRouter = require('./routes/addcalories');
        const usersRouter = require('./routes/users');
        const reportRouter = require('./routes/report');
        const aboutRouter = require('./routes/about');

        // Using middleware for connecting to database:
        app.use(connectDB);

        app.use('/addcalories', addCaloriesRouter);
        app.use('/users', usersRouter);
        app.use('/report', reportRouter);
        app.use('/about', aboutRouter);


        // Starting Express server:
        app.listen(port, () => {
            console.log(`Server running at http://localhost:${port}/`);
        });

    } 
    catch (error) 
    {
        console.error('Error starting the server:', error);
    }
}

main().catch(console.error);

module.exports = app;
