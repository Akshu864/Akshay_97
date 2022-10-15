const blogModel=require('../models/blogModel')
const mongoose=require('mongoose')
const { findOne, findOneAndUpdate } = require('../models/blogModel')


//basic validations

//checking for the request body should not be empty

const isValidRequestBody = function (value) {
    return Object.keys(value).length > 0
  }
//for checking type of values

const isValid = (value) => {
    if (typeof value == 'undefined' || value == null) return false;
    if (typeof value == 'string' && value.trim().length == 0) return false;
    return true
  }

//to check wheather objectId is valid 

const isValidObjectId = (value) => {
    return mongoose.isValidObjectId(value)
  }

//----------post blogs---------------------------//

const createBlogs=async(req,res)=>{


    try{

      const data=req.body

    //checking for the request body empty or not

    if(!isValidRequestBody(data)){
        return res.status(400).send({status:false,message:"enter some data"})
    }

    const{title,body,category}=data

    //validations for title,body and category

    if(!isValid(title)){
        return res.status(400).send({status:false,message:"title is required"})
    }

    const titleCheck = await blogModel.findOne({ title: title }).collation({ locale: 'en', strength: 2 })
    if(titleCheck){
        return res.status(400).send({status:false,message:"this title already exist"})
    }

    if(!isValid(body)){
        return res.status(400).send({status:false,message:"body of blog is required"})
    }

    if(!isValid(category)){
        return res.status(400).send({status:false,message:"category is required"})
    }

    //validations ends here

    const saveBlogs=await blogModel.create(data)
    return res.status(201).send({status:true,message:"success",data:saveBlogs})

    }
    catch(err){
        console.log(err.message)
        return res.status(500).send({status:"error",msg:err.message})
    }
}



//----------get api------------------------//

const getBlogs=async function(req,res){
   
    try{
         

        const{page,limit}=req.query

        if(!page) page=1;
        if(!limit) limit=10;

        const skip=(page-1)*10

        const blogs=await blogModel.find().skip(skip).limit(limit);

        res.status(200).send({status:true,page:page,limit:limit,blogs:blogs})



    }
    catch(err){
        console.log(err.message)
        return res.status(500).send({status:"error",msg:err.message})
    }

}





const getblogHandler=async function(req,res){
   
    try{


        const {blogid} = req.params
    
        const fetchBlogs = await blogModel.findOne({_id:blogid})
        console.log(fetchBlogs)
        
        const {body} = fetchBlogs
        const bodyArray = body.split(" ")
        let arrayStartingWithA=[]
        
        
        for(let el of bodyArray) {
            if(el[0] == 'a' || 'A') {
                if(el.length<= 3) {
                    continue;
                }
                let newElement = el.substring(0, el.length-4)
                arrayStartingWithA.push(newElement+ "***")


            }

        }
        const updateBlog=await  blogModel.findOneAndUpdate({_id:blogid},{$set:{body:arrayStartingWithA}},{upsert:true,new:true})
        
        return res.send({data:updateBlog})

    }
    catch(err){
        console.log(err.message)
        return res.status(500).send({status:"error",msg:err.message})
    }


}










module.exports={createBlogs,getBlogs,getblogHandler}