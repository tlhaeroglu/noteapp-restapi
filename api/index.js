const express = require('express');
const app = express();
const mongoose = require('mongoose');
const notesRouter = require('./routes/notes');
const bodyParser = require('body-parser');
const cors = require('cors');
app.use(cors({
    origin: "*",
}))
require('dotenv/config');
const conectionString = `mongodb+srv://${process.env.DATABASE_USERNAME}:${process.env.DATABASE_PASSWORD}@cluster0.dt3dr.mongodb.net/${process.env.DATABASE}?retryWrites=true&w=majority`;

mongoose.connect(conectionString, (e)=>{
    if(e){
        console.log(e);
    }else{
        console.log('Connected to database');
    }
});

app.use('/notes', notesRouter);
app.use(bodyParser.json());
//app.use(cors());

app.listen(5000, () => {
    console.log('Server running on port 5000');
});