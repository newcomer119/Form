// api/submit.js
const { MongoClient } = require('mongodb');

const uri = 'mongodb+srv://mitarth:123@basicnodeexpressproject.c4txw.mongodb.net/?retryWrites=true&w=majority&appName=BasicNodeExpressProjects'; // Replace with your MongoDB Atlas connection string
const client = new MongoClient(uri);

export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            const userData = req.body;
            const sapId = userData.sapId;

            await client.connect();
            const database = client.db('your_database_name'); // Replace with your database name
            const collection = database.collection('users');

            // Check if SAP ID already exists
            const existingUser = await collection.findOne({ sapId: sapId });
            if (existingUser) {
                return res.status(400).json({ message: 'SAP ID already exists. Please use a different SAP ID.' });
            }

            // Insert the data into the 'users' collection
            const result = await collection.insertOne(userData);
            console.log('User data inserted:', result.insertedId);

            res.status(200).json({ message: 'Form data received and stored successfully!' });
        } catch (error) {
            console.error('Error inserting data:', error);
            res.status(500).json({ message: 'Error storing form data.' });
        } finally {
            await client.close();
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}