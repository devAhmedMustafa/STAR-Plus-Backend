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

app.set('views', __dirname + '/views');
app.engine('html', require('ejs').renderFile);

app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

app.use(cors({
    origin: ['https://starplusgames.vercel.app', 'http://localhost:3000', 'http://localhost:5173']
}))

const GamesRouter = require('./routes/GamesRouter');
app.use('/games', GamesRouter);

const AuthRouter = require('./routes/AuthRouter');
app.use('/auth', AuthRouter);

const AssetsRouter = require('./routes/AssetsRouter');
const Dycryping = require('./tests/decrypting');
app.use('/assets', AssetsRouter);

app.listen(process.env.PORT || 3000, ()=>{
    console.log(`App on Port ${process.env.PORT}`);
})
