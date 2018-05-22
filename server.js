console.log('May Node be with you')

const express = require('express');
const MongoClient = require('mongodb').MongoClient
const bodyParser= require('body-parser')
const app = express()

app.use(bodyParser.urlencoded({extended: true}))
app.set('view engine', 'ejs')

var db

MongoClient.connect('XXXX', (err, client) => {
  if (err) return console.log(err)
  db = client.db('mongo-test') // whatever your database name is
  app.listen(3000, () => {
    console.log('listening on 3000')
  })
})
//app.get('/', (req, res) => {
//    res.send('Hello World')
//  })

//app.get('/', (req, res) => {
//  res.sendFile(__dirname + '/index.html')
//})

app.post('/quotes', (req, res) => {
    db.collection('quotes').save(req.body, (err, result) => {
      if (err) return console.log(err)
  
      console.log('saved to database')
      res.redirect('/')
    })
  })

  app.get('/', (req, res) => {
    db.collection('quotes').find().toArray((err, result) => {
      if (err) return console.log(err)
      // renders index.ejs
      res.render('index.ejs', {quotes: result})
    })
  })