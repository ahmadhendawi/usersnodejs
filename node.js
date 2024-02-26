var express= require('express')
var app=express();

const {MongoClient}=require('mongodb')

var connection="mongodb+srv://ahmadhendawi:uzdrbI2EDJ2RMPwL@cluster0.uswjlnp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

const client= new MongoClient(connection)

const mydb= client.db('test')

const collection= mydb.collection('users')


app.get("/", function(req,res)
{
     res.send("test test")
})

app.get("/users",async(req,res)=>{
     const users= await collection.find({}).toArray() 
     res.send(users)
})

app.get("/user/:Username",async(req,res)=>{
     const users= await collection.findOne({'Username':req.params.Username}) 
     res.send(users)
})

var bodyParse= require('body-parser')

var urlEncoded= bodyParse.urlencoded({extended:false})

app.get("/form", function(req,res)
{
     res.sendFile(__dirname+"/login.html")
})

var fs= require('fs')

app.get("/userInfo", function(req,res){


    var current= localStorage.getItem('currentUser')
    res.json(data)
})

app.post("/login",urlEncoded, async(req,res)=>
{
      const finduser= await collection.findOne({'Username':req.body.Username})
      if (finduser) 
      {  
          localStorage.setItem('currentUser', finduser)
          res.sendFile(__dirname+"/userInfo.html")
      }
      else{
       
           res.sendFile(__dirname+"/register.html")
      }
})


app.post("/register",urlEncoded, async(req,res)=>
{  
     const createuser= await collection.insertOne({'userName': req.body.Username})
    
})


var server= app.listen(8000,function()
{
     var host = server.address().address
     var port=server.address().port

     console.log("start")
})