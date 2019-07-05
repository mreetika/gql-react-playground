var port = process.env.PORT || 4000
const express = require('express')
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

app.use('/graphql', graphqlHTTP({
  schema: schema,
  graphiql: true
}))

app.listen(port, () => {
  console.log('now listening for request on port 4000')
})
