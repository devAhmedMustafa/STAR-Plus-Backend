const env = require('dotenv')
env.config()
const path = require('path')

const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./config/database');
const fs = require('fs')

if (!fs.existsSync('./uploads')){
    fs.mkdirSync('./uploads');
    fs.mkdirSync('./uploads/file-storage');
}

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(bodyParser.json());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

app.use(cors({
    origin: ['https://starplus.vercel.app']
}))

const GamesRouter = require('./routes/GamesRouter');
app.use('/games', GamesRouter)


app.listen(process.env.PORT || 3000, ()=>{
    console.log(`App on Port ${process.env.PORT}`);
})