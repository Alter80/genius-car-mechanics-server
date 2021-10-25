// FIRST STEP:: express, mongo, CORS and dotenv to secure user data
const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');
require('dotenv').config()

// SECOND STEP:: app calling express
const app = express();

// third step: port
const port = 5000;

// STEP 3.25: USE MIDDLEWARE
app.use(cors());
app.use(express.json());

//STEP 3.5:: mongo client uri and dotenv
// userid: geniusMechanic, pass: Alter3080
const dbUser = process.env.DB_USER
const dbPass = process.env.DB_PASS

const uri = `mongodb+srv://${dbUser}:${dbPass}@cluster0.9jmbp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// STEP 3.75:: inserting Data [MAIN STEP from MONGODB]. 
// you can do arrow function like const run = async (parameter) => {}
async function run() {
    try {
        await client.connect();
        // db name
        const database = client.db('carMechanic');
        // collection name
        const servicesCollection = database.collection('services');

        // POST API
        app.post('/services', async (req, res) => {
            // // hard coded data
            // const service = {
            //     "name": "ENGINE DIAGNOSTIC",
            //     "price": "300",
            //     "description": "Lorem ipsum dolor sit amet, consectetu radipisi cing elitBeatae autem aperiam nequ quaera molestias voluptatibus harum ametipsa.",
            //     "img": "https://i.ibb.co/dGDkr4v/1.jpg"
            // }

            // const result = await servicesCollection.insertOne(service);
            // console.log(result);
            res.send('post hitted');

        })


        // console.log('Confirmation: Connected to Database');
    }
    finally {
        // this line is not needed as we will use the database multiple times. this is used for single time operation. 
        // await client.close()
    }
}

// for error handleing
run().catch(console.dir);

// FOURTH STEP:: default route or api link its working or not
app.get('/', (req, res) => {
    res.send('Running Genius Server');
})

// FIFTH STEP:: App Listen server
app.listen(port, () => {
    console.log('Running Genius Server on port no:', port);
})




// install dotenv to secure the dbadmin user and pass details