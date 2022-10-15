const express=require('express')
const router=express()

const blogController=require('../controller/blogController')



//--------------------------post api-----------------//

router.post('/blogs',blogController.createBlogs)

//-----------get api----------------//

router.get('/get',blogController.getBlogs)

router.put('/:blogid',blogController.getblogHandler)

module.exports=router