const dotenv = require('dotenv')
require('dotenv').config()
const express = require('express')
const cors = require('cors')
const argon2 = require('argon2')
const mongoose = require('mongoose')
mongoose.connect(process.env.MONGODB_URI)
const app = express()
app.use(cors())
app.use(express.json())
const PORT = 5500

const user_schema = new mongoose.Schema({
    username:String,
    password:String,
    role:String,
    full_name:String,
    investments:Array
})
const user_data=mongoose.model('User',user_schema)

app.get("/",(req,res)=>{
    res.send("hello world")
})

app.post("/api/signup",async(req,res)=>{
    const already_exists = await user_data.exists({"username":req.body.username})
    if(already_exists===null){
    const hash = await argon2.hash(req.body.password)
    const user_data_feed = new user_data({
        "username":req.body.username,
        "password":hash,
        "full_name":"",
        "role":"user",
        "investments":[]
    })
    await user_data_feed.save()
    console.log("save aindi")}
    else{
        console.log("user already exists")
        res.status(201).json({message:"user already exists"});
    }
})

app.post("/api/signin",async(req,res)=>{
    const user_find = await user_data.findOne({"username":req.body.username})
    if (await argon2.verify(user_find.password, req.body.password)) {
        res.status(200).json({message:"login successful"});
      } else {
        res.status(201).json({message:"login failed"});
      }
})

app.listen(PORT)