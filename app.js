const express = require('express')
const app = express()

const cookie_parser = require('cookie-parser')

app.use(cookie_parser())
app.use(express.json())

app.get('/', (req, res) => res.send('Hello world !'))



app.listen(4000, (req, res) => console.log('Sever running on port 4000'))
