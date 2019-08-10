const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 5000;
const todoRouter = require('./routes/todo.router')

app.use(bodyParser.urlencoded({
    extended: true
}));

// ROUTES
app.use('/todo', todoRouter)


//where to find index files
app.use(express.static('server/public'));

// Start listening for requests on a specific port
app.listen(PORT, () => {
    console.log('listening on port', PORT);
});