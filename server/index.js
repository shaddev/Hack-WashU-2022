var express = require('express');
var app = express();
const bodyParser = require('body-parser');
const { request } = require('http');
require('dotenv').config();

const mongodb_user = process.env.MONGODB_USER
const mongodb_pass = process.env.MONGODB_PASS

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://"+mongodb_user+":<"+mongodb_pass+">@"+mongodb_user+".rqyruvg.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

var jsonParser = bodyParser.json()
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
	res.send('Bruh lmao');
});








client.connect(err => {
  //const collection = client.db("test").collection("devices");
  //client.close();
  console.log("AYYY LMAO\n MONGODB CONNECTED!!!")
});