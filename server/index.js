var express = require('express');
var app = express();
const bodyParser = require('body-parser');
const { request } = require('http');
require('dotenv').config();
const bcrypt = require("bcrypt")
const cors = require('cors');
app.use(cors());

const mongodb_user = process.env.MONGODB_USER
const mongodb_pass = process.env.MONGODB_PASS

const { MongoClient, ServerApiVersion } = require('mongodb');
const ObjectId = require("mongodb").ObjectId;
const uri = "mongodb+srv://"+mongodb_user+":"+mongodb_pass+"@hackwashu2022.rqyruvg.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useUnifiedTopology: true});

var jsonParser = bodyParser.json()
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
	res.send('Hack WashU 2022 API');
});
/*Projects*/
app.get('/get_project/:id', (req, res) => {
  var query = {_id : ObjectId(req.params.id)}
  const collection = client.db("hackwashu2022").collection("projects");
  collection.find(query).toArray(function(err,result){
    res.send(result)
	});
});

app.get('/get_all_projects', (req, res) => {
  var query = {}
  const collection = client.db("hackwashu2022").collection("projects");
  collection.find(query).toArray(function(err,result){
    res.send(result)
	});
});

app.post('/add_project',jsonParser,function(req, res) {
  bcrypt.hash(req.body.pass_hash, 10, function(err, hash) {
    var obj = {
      member_emails:[req.body.username],
      image:req.body.img_link,
      video:req.body.video_link,
      goal:req.body.goal,
      contact:req.body.contact,
      links:req.body.links,
      likers:[]
    }
    const collection = client.db("hackwashu2022").collection("students");
    collection.insert(obj);
    res.send("POST successful!")
  });
});
/*
app.post('/add_project', jsonParser, function(req, res) {
  
	res.send("POST successful!")
});*/
/*Student*/
app.post('/add_student',jsonParser,function(req, res) {
  bcrypt.hash(req.body.pass_hash, 10, function(err, hash) {
    var obj = {
      involved_projects:[],
      full_name:req.body.full_name,
      pass_hash:hash,
      email:req.body.email
    }
    const collection = client.db("hackwashu2022").collection("students");
    collection.insert(obj);
    res.send("POST successful!")
  });
});
app.get('/get_student/:email',jsonParser,function(req, res) {
  var query = {email : req.params.email}
  const collection = client.db("hackwashu2022").collection("students");
  collection.find(query).toArray(function(err,result){
    res.send(result)
	});
});

app.post('/edit_student',jsonParser,function(req, res) {
  bcrypt.hash(req.body.pass_hash, 10, function(err, hash) {
    var obj = {
      full_name:req.body.full_name,
      pass_hash:hash,
      email:req.body.email
    }
    var id=req.body._id
    var query = {_id : ObjectId(id)}
    const collection = client.db("hackwashu2022").collection("students");
    collection.update(query,{$set: obj});
    res.send("POST successful!")
  });
});







/*Contributor*/


app.post('/add_contributor',jsonParser,function(req, res) {
  bcrypt.hash(req.body.pass_hash, 10, function(err, hash) {
    var obj = {
      full_name:req.body.full_name,
      pass_hash:hash,
      email:req.body.email,
      liked_projects:[]
    }
    const collection = client.db("hackwashu2022").collection("contributors");
    collection.insert(obj);
    res.send("POST successful!")
  });
});
app.get('/get_contributor/:email',jsonParser,function(req, res) {
  var query = {email : req.params.email}
  const collection = client.db("hackwashu2022").collection("contributors");
  collection.find(query).toArray(function(err,result){
    res.send(result)
	});
});

app.post('/edit_contributor',jsonParser,function(req, res) {
  bcrypt.hash(req.body.pass_hash, 10, function(err, hash) {
    var obj = {
      full_name:req.body.full_name,
      pass_hash:hash,
      email:req.body.email
    }
    var id=req.body._id
    var query = {_id : ObjectId(id)}
    const collection = client.db("hackwashu2022").collection("contributors");
    collection.update(query,{$set: obj});
    res.send("POST successful!")
  });
});

//Does not handle duplicate likes
app.post('/like_project',jsonParser,function(req, res){
  var project_obj ={
    likers:req.body.email
  }
  var project_query = {_id : ObjectId(req.body.project_id)}
  const project_collection = client.db("hackwashu2022").collection("projects");
  project_collection.update(project_query,{$push: project_obj});

  var contributor_obj ={
    liked_projects:req.body.project_id
  }
  var contributor_query = {_id : ObjectId(req.body.contributor_id)}
  const contributor_collection = client.db("hackwashu2022").collection("contributors");
  contributor_collection.update(contributor_query,{$push: contributor_obj});
  res.send("POST successfull")





/*


  var contributor_obj = {
    liked_projects:,
  }
  var project_obj = {
    likers:,
  }
  var id=req.body._id
  var query = {_id : ObjectId(id)}
  const collection = client.db("hackwashu2022").collection("contributors");
  collection.update(query,{$set: obj});
  res.send("POST successful!")*/
});
app.listen(process.env.PORT||5000, () => {
	client.connect(err => {
        console.log("AYYY LMAO\n MONGODB CONNECTED!!!")
	})
  console.log('Server started.');
});