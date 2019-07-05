const express = require('express')
const path = require('path')
const graphqlHTTP = require('express-graphql')
const schema = require("./schema/schema")
const mongoose = require('mongoose')
const cors = require('cors')

const app = express()

app.use(cors())

mongoose.connect('mongodb://pujasaha:graphqles6@ds345597.mlab.com:45597/gql-ninja')
mongoose.connection.once('open', () => {
  console.log('connected to mLab !!')
})

app.get('/ping', function (req, res) {
 return res.send('pong');
});

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
  console.log('now listening for request on port 4000')
})
