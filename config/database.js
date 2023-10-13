const mongoose = require('mongoose')

const url = process.env.DB_URL

mongoose.connect(url)
.then(() => console.log("DB Connected"))
.catch((err) => console.error(err));

module.exports = mongoose