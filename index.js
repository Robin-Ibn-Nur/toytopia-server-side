const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
// const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;



// creating token with something or whatever it can be ignored
// (require('crypto').randomBytes(64).toString('hex'))

// middleware
app.use(cors());
app.use(express.json());


// const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.h290xzo.mongodb.net/?retryWrites=true&w=majority`;
// console.log(uri)
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

// this is a middleware to verify the user with jwt token
// function verifyJWT(req, res, next) {

//     const authHeader = req.headers.authorization;
//     if (!authHeader) {
//         return res.status(401).send('unauthorized access');
//     }

//     const token = authHeader.split(' ')[1];

//     jwt.verify(token, process.env.SECRET_ACCESS_TOKEN, function (err, decoded) {
//         if (err) {
//             console.log(err)
//             return res.status(403).send({ message: 'forbidden access' })
//         }
//         req.decoded = decoded;
//         next();
//     })

// }


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.h290xzo.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        // await client.connect();

        const blogPosts = [
            {
                title: 'Understanding Access Tokens and Refresh Tokens',
                date: 'May 20, 2023',
                author: 'John Doe',
                excerpt:
                    "An access token is a short- lived token that is used to authenticate a user to a service.A refresh token is a long - lived token that can be used to obtain a new access token when the old one expires. Access tokens and refresh tokens are typically stored in the browser's local storage or cookies. Access tokens and refresh tokens should be stored securely on the client-side. They should not be stored in plain text, as they could be intercepted by an attacker. Access tokens and refresh tokens should be encrypted and stored in a secure location.",
                slug: 'access-tokens-and-refresh-tokens',
            },
            {
                title: 'Comparison of SQL and NoSQL Databases',
                date: 'May 22, 2023',
                author: 'Jane Smith',
                excerpt:
                    "SQL and NoSQL are two different types of databases. SQL databases are relational databases, while NoSQL databases are non-relational databases. Relational databases store data in tables, which are made up of rows and columns. NoSQL databases store data in a variety of formats, including documents, key-value pairs, and graphs. SQL databases are typically used for applications that require a lot of data to be stored and queried. NoSQL databases are typically used for applications that require a lot of flexibility in how data is stored and queried.",
                slug: 'sql-vs-nosql-databases',
            },
            {
                title: 'Introduction to Express.js and NestJS',
                date: 'May 25, 2023',
                author: 'Robert Johnson',
                excerpt:
                    "Express.js is a web application framework for Node.js. It is a popular choice for building web applications because it is easy to use and provides a lot of features out of the box. Express.js is based on the Connect.js framework and provides a number of features, including routing, middleware, and template engines. Nest.js is a framework for building server-side applications using JavaScript. It is based on Angular and provides a number of features, including dependency injection, routing, and testing. Nest.js is a good choice for building large, complex applications because it provides a lot of features and is well-documented.",
                slug: 'expressjs-and-nestjs-introduction',
            },
            {
                title: 'Understanding MongoDB Aggregation',
                date: 'May 28, 2023',
                author: 'Emily Davis',
                excerpt:
                    "MongoDB Aggregate is a feature of MongoDB that allows you to perform complex queries on your data. Aggregate queries are written using the aggregation pipeline, which is a series of stages that are applied to your data in order to produce the desired results.",
                slug: 'mongodb-aggregation-explained',
            },
        ];

        app.get('/user', async (req, res) => {
            console.log("user founded");
            res.send(blogPosts)
        })


        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);



app.get('/', async (req, res) => {
    res.send('ToyToPia is running');
})

app.listen(port, () => console.log(`ToyToPia running on ${port}`))