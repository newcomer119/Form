// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { MongoClient } = require('mongodb');

const app = express();
const PORT = process.env.PORT || 3000;

// MongoDB connection string
const uri = 'mongodb+srv://mitarth:123@basicnodeexpressproject.c4txw.mongodb.net/?retryWrites=true&w=majority&appName=BasicNodeExpressProjects'; // Replace with your MongoDB Atlas connection string
const client = new MongoClient(uri);

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public')); // Serve static files from the 'public' directory

// Connect to MongoDB
client.connect()
    .then(() => {
        console.log('Connected to MongoDB Atlas');
    })
    .catch(err => {
        console.error('MongoDB connection error:', err);
    });

app.post('/submit', async (req, res) => {
    try {
        const userData = req.body;
        const sapId = userData.sapId;

        // Check if SAP ID already exists
        const database = client.db('registration-form'); // Replace with your database name
        const collection = database.collection('users');

        const existingUser = await collection.findOne({ sapId: sapId });
        if (existingUser) {
            return res.status(400).json({ message: 'SAP ID already exists. Please use a different SAP ID.' });
        }

        // Insert the data into the 'users' collection
        const result = await collection.insertOne(userData);
        console.log('User data inserted:', result.insertedId);

        res.json({ message: 'Form data received and stored successfully!' });
    } catch (error) {
        console.error('Error inserting data:', error);
        res.status(500).json({ message: 'Error storing form data.' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});