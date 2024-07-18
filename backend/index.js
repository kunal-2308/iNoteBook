const connectToMongo = require('./db')
const express = require('express')
const app = express()
var cors = require('cors')
const port = 2000




//Middleware : 
app.use(cors())//for connecting and calling api througt browser
app.use(express.json()); // to send and fetch the request body

//Routes :
app.use('/api/auth',require('./routes/auth'));
app.use('/api/notes',require('./routes/notes'));

app.get('/', (req, res) => {
  res.send('Hello Baby Kasu!')
});

//starting server :
let startServer = async() =>{
  try {
    await connectToMongo();
    app.listen(port, () => {
        console.log(`Inotebook running on http://localhost:${port}`);
    });
} catch (error) {
    console.error('Error starting server:', error);
}

};

startServer();

