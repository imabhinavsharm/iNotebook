const express = require('express')
const connectToMongo = require("./db")
var cors = require('cors')
connectToMongo()
const app = express()
const port = 3001
const momenttz = require('moment-timezone');
// console.log(momenttz.tz("Asia/Kolkata").format());
console.log(momenttz().format());
app.use(cors())
app.use(express.json())

app.use('/api/auth',require('./routes/auth.js'))
app.use('/api/notes',require('./routes/notes'))

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})