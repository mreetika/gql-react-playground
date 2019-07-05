const express = require('express')
const path = require('path')
const graphqlHTTP = require('express-graphql')
const schema = require("./schema/schema")
const mongoose = require('mongoose')
const cors = require('cors')

const app = express()

app.use(cors())

mongoose.connect(process.env.DB_CRED)

mongoose.connection.once('open', () => console.log('connected to .. not telling you where ;) '))

app.get('/ping', (req, res) => res.send('pong'));

app.use('/graphql', graphqlHTTP({
  schema: schema,
  graphiql: true
}))

var port = process.env.PORT || 4000
app.use(express.static('public'));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'public', 'index.html'))
})

app.listen(port, () => {
  console.log(`now listening for request on port ${port}`)
})
