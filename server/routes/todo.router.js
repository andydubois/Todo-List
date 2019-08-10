const express = require('express');
const todoRouter = express.Router();
const pg = require('pg');

const Pool = pg.Pool;
const pool = new Pool({
    database: 'weekend-to-do-app', //name of database in postico
    host: 'localhost',
    port: 5432, //port at which to find the database connection
    max: 10, //how many connections 
    idleTimeoutMillis: 10000 //10 seconds until timeout
});

pool.on('connect', () => {
    console.log('connected to DB')
});

pool.on('error', (error) => {
    console.log('error with pool', error)
});


//GET retrieves to do list from database
todoRouter.get('/', (req, res) => {
    let queryText = 'SELECT * FROM "todolist";';
    pool.query(queryText).then(result => {
            //sends back results from database as an object
            console.log(result.rows);
            res.send(result.rows);
        })
        .catch(error => {
            console.log('error getting books', error);
            res.sendStatus(500);
        });
});

//POST sends user inputs to database
todoRouter.post('/', (req, res) => {
    let taskToAdd = req.body;
    console.log(taskToAdd);
    //sanitize the database inserts
    let queryText = `
    INSERT INTO "todolist" ("task", "completed", "type", "notes")
    VALUES ($1, $2, $3, $4);
    `;
    pool.query(queryText, [taskToAdd.task, 'No', taskToAdd.type, taskToAdd.notes]).
    then((result) => {
            res.sendStatus(201);
        })
        .catch((error) => {
            console.log(error);
            res.sendStatus(500);
        });
});


module.exports = todoRouter;