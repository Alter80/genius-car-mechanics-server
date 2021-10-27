// FIRST STEP:: express, mongo, CORS and dotenv to secure user data
const express = require('express');
const { MongoClient } = require('mongodb');
const ObjectId = require('mongodb').ObjectId;
const cors = require('cors');
require('dotenv').config()

// SECOND STEP:: app calling express
const app = express();

// third step: port
const port = process.env.PORT || 5000;

// STEP 3.25: USE MIDDLEWARE using CORS, otherwise it will not receive data from React APP. 
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

        // GET API
        app.get('/services', async (req, res) => {
            const cursor = servicesCollection.find({});
            const services = await cursor.toArray();
            res.send(services);
        })

        // GET Single Service, (this needs object id above)
        app.get('/services/:id', async (req, res) => {
            const id = req.params.id;
            console.log('For Confirmation: getting specific item id:', id);
            const query = { _id: ObjectId(id) };
            const service = await servicesCollection.findOne(query);
            res.json(service);
        })

        // POST API
        app.post('/services', async (req, res) => {
            const service = req.body;
            console.log(service);

            const result = await servicesCollection.insertOne(service);
            console.log(result);
            res.json(result);

        })

        // DELETE API
        app.delete('/services/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await servicesCollection.deleteOne(query);
            res.json(result);
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

app.get('/', (req, res) => {
    res.send('Hello, check for heroku');
})

// FIFTH STEP:: App Listen server
app.listen(port, () => {
    console.log('Running Genius Server on port no:', port);
})




// install dotenv to secure the dbadmin user and pass details


/*
one time:
1. Heroku account open
2. heroku software install

every project do these:
1. git init
2. .gitignore(node_module, .env)
3. push everything to git
4. make sure you have this written in package.json: "start": "node index.js",
    "start-dev": "nodemon index.js",
5. Make sure: put process.env.PORT in front of your port number
6. heroku login
7. heroku create (only one time for a project)
8. command: git push heroku main
----

update:
1. save everything, check locally
2. git add. git commit -m '', git push
3. git push heroku main
*/