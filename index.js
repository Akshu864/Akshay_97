const express=require("express")
const bodyParser=require('body-parser')

const route=require('./routes/route')

const app=express()
const { default: mongoose } = require("mongoose")



app.use(bodyParser.json())

app.use(bodyParser.urlencoded({extended:true}))

mongoose.connect("mongodb+srv://Akshu12:Akshay123@cluster0.eqljz.mongodb.net/Frejun_Assignment",{ useNewUrlParser:true})

.then(()=>console.log("blog project-Mongodb is conected"))

.catch((err)=>console.log(err));

app.use('/',route)
app.listen(3000,()=>{

    console.log("Express port is running on 3000")
});