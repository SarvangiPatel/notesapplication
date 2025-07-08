const express = require('express')
const app = express()
var cors = require('cors')
require('dotenv').config()
const cookieParser = require('cookie-parser');

const port = process.env.PORT || 3000
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))

app.use(express.json())
const connectDB = require('./utils/db')


app.use('/user', require('./routes/user.routes'))
app.use('/note', require('./routes/note.routes'))


app.listen(port, () => {
  connectDB();
  console.log(`Example app listening on port ${port}`)
})
