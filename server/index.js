var express = require('express');
var app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
const { request } = require('http');
require('dotenv').config();
const bcrypt = require("bcrypt")
const cors = require('cors');
const jwt = require('jsonwebtoken')

const jwtKey = process.env.JWT_KEY
const jwtExpirySeconds = 300 //5 minutes

const mongodb_user = process.env.MONGODB_USER
const mongodb_pass = process.env.MONGODB_PASS

const { MongoClient, ServerApiVersion } = require('mongodb');
const ObjectId = require("mongodb").ObjectId;
const uri = "mongodb+srv://"+mongodb_user+":"+mongodb_pass+"@hackwashu2022.rqyruvg.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useUnifiedTopology: true});

var jsonParser = bodyParser.json()
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors({
  'allowedHeaders': ['sessionId', 'Content-Type'],
  'exposedHeaders': ['sessionId'],
  'credentials': true,
  'origin': ['http://localhost:3000', 'http://localhost:3000'],
}))
app.use(cookieParser())
/*
app.get('/', (req, res) => {
	res.send('Hack WashU 2022 API');
});*/



app.post('/signin', (req, res) => {
  // Get credentials from JSON body
  const { email, password } = req.body
  var query = {email : email}
  const collection = client.db("hackwashu2022").collection("contributors");
  collection.find(query).toArray(function(err,result){
    if (result.length!=0){
      console.log(password)
      console.log(result[0]["pass_hash"])
      bcrypt.compare(password, result[0]["pass_hash"], function(err, correct) {
        if (!correct || email!=result[0]["email"]) {
            console.log("Incorrect")
            return res.status(401).end()
        }
        console.log("Correct")
      });
    }
    else{
      console.log("Incorrect")
    }
    return res.status(401).end()
  });

  // Create a new token with the username in the payload
  // and which expires 300 seconds after issue
  const token = jwt.sign({ email }, jwtKey, {
    algorithm: 'HS256',
    expiresIn: jwtExpirySeconds
  })
  console.log('token:', token)

  // set the cookie as the token string, with a similar max age as the token
  // here, the max age is in milliseconds, so we multiply by 1000
  res.cookie('token', token, { maxAge: jwtExpirySeconds * 1000 })
  res.end()
})
app.post('/signout', (req,res)=>{
  //Hehe lmao
  res.end()
})

function verify(req){
  // We can obtain the session token from the requests cookies, which come with every request
  const token = req.cookies.token
  // if the cookie is not set, return an unauthorized error
  if (!token) {
    return 401
  }
  var payload
  try {
    // Parse the JWT string and store the result in `payload`.
    // Note that we are passing the key in this method as well. This method will throw an error
    // if the token is invalid (if it has expired according to the expiry time we set on sign in),
    // or if the signature does not match
    payload = jwt.verify(token, jwtKey)
  } catch (e) {
    if (e instanceof jwt.JsonWebTokenError) {
      // if the error thrown is because the JWT is unauthorized, return a 401 error
      return 401
    }
    // otherwise, return a bad request error
    return 400
  }
  return payload
}
app.get('/welcome', (req, res) => {
  var payload = verify(req)
  if(payload==400||payload==401){
    return res.status(payload).end()
  }
  // Finally, return the welcome message to the user, along with their
  // username given in the token
  res.send(payload.email)
})
app.post('/refresh', (req, res) => {
  // (BEGIN) The code uptil this point is the same as the first part of the `welcome` route
  var payload = verify(req)
  if(payload==400||payload==401){
    return res.status(payload).end()
  }
  // (END) The code uptil this point is the same as the first part of the `welcome` route

  // We ensure that a new token is not issued until enough time has elapsed
  // In this case, a new token will only be issued if the old token is within
  // 30 seconds of expiry. Otherwise, return a bad request status
  const nowUnixSeconds = Math.round(Number(new Date()) / 1000)
  if (payload.exp - nowUnixSeconds > 30) {
    return res.status(400).end()
  }
  // Now, create a new token for the current user, with a renewed expiration time
  const newToken = jwt.sign({ email: payload.email }, jwtKey, {
    algorithm: 'HS256',
    expiresIn: jwtExpirySeconds
  })

  // Set the new token as the users `token` cookie
  res.cookie('token', newToken, { maxAge: jwtExpirySeconds * 1000 })
  res.end()
})











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

app.get('/get_student_projects', (req, res) => {
  var payload = verify(req)
  if(payload==400||payload==401){
    return res.status(payload).end()
  }
  email=payload.email
  var query = {member_emails:{$elemMatch:{email}}}
  const collection = client.db("hackwashu2022").collection("projects");
  collection.find(query).toArray(function(err,result){
    res.send(result)
	});
});

app.post('/add_project',jsonParser,function(req, res) {
  var payload = verify(req)
  if(payload==400||payload==401){
    return res.status(payload).end()
  }
  bcrypt.hash(req.body.pass_hash, 10, function(err, hash) {
    var obj = {
      member_emails:[payload.email],
      description:req.body.description,
      image:req.body.img,
      goal:req.body.goal,
      contact:req.body.contact,
      links:req.body.links,
      likers:[]
    }
    const collection = client.db("hackwashu2022").collection("projects");
    collection.insert(obj);
    res.send("POST successful!")
  });
});

app.post('/edit_project',jsonParser,function(req, res) {
  var payload = verify(req)
  if(payload==400||payload==401){
    return res.status(payload).end()
  }
  bcrypt.hash(req.body.pass_hash, 10, function(err, hash) {
    var obj = {
      description:req.body.description,
      image:req.body.img,
      goal:req.body.goal,
      contact:req.body.contact,
      links:req.body.links,
    }
    var id=req.body._id
    var query = {_id : ObjectId(id)}
    const collection = client.db("hackwashu2022").collection("projects");
    collection.update(query,{$set: obj});
    res.send("POST successful!")
  });
});



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
  var payload = verify(req)
  if(payload==400||payload==401){
    return res.status(payload).end()
  }
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
  var payload = verify(req)
  if(payload==400||payload==401){
    return res.status(payload).end()
  }
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

app.post('/like_project',jsonParser,function(req, res){
  var payload = verify(req)
  if(payload==400||payload==401){
    return res.status(payload).end()
  }
  var project_obj ={
    likers:req.body.email
  }
  var project_query = {_id : ObjectId(req.body.project_id)}
  const project_collection = client.db("hackwashu2022").collection("projects");
  project_collection.update(project_query,{$addToSet: project_obj});

  var contributor_obj ={
    liked_projects:req.body.project_id
  }
  var contributor_query = {_id : ObjectId(req.body.contributor_id)}
  const contributor_collection = client.db("hackwashu2022").collection("contributors");
  contributor_collection.update(contributor_query,{$addToSet: contributor_obj});
  res.send("POST successfull")
});

app.post('/unlike_project',jsonParser,function(req, res){
  var payload = verify(req)
  if(payload==400||payload==401){
    return res.status(payload).end()
  }
  var project_obj ={
    likers:req.body.email
  }
  var project_query = {_id : ObjectId(req.body.project_id)}
  const project_collection = client.db("hackwashu2022").collection("projects");
  project_collection.update(project_query,{$pull: project_obj});

  var contributor_obj ={
    liked_projects:req.body.project_id
  }
  var contributor_query = {_id : ObjectId(req.body.contributor_id)}
  const contributor_collection = client.db("hackwashu2022").collection("contributors");
  contributor_collection.update(contributor_query,{$pull: contributor_obj});
  res.send("POST successfull")
});

app.listen(process.env.PORT||3000, () => {
	client.connect(err => {
        console.log("AYYY LMAO\n MONGODB CONNECTED!!!")
	})
  console.log('Server started.');
});