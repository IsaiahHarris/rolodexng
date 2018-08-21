const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const routes = require('../routes');
const PORT = process.env.PORT || 8080

app.use(express.static('../public'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use('/api', routes);

app.get('/', (req, res) => {
  res.send('smoke test')
})

app.listen(PORT, () => {
  console.log('PORT', PORT);
})