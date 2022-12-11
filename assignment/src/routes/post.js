const router=require('express').Router();
const Post=require('../model/Post');

const bodyParser=require("body-parser");
const app = require('../app');
const { json } = require('body-parser');
router.use(bodyParser.json());
console.log(1);

router.post('/',async(req,res)=>{
   try{
    const {title,body,image}=req.body;
    console.log(req.user)
    const post=await Post.create({
        title:title,
        body:body,
        image:image,
        user:req.user
    })
    res.status(200).json({
        status:"post created",
        data:post
    })
   }catch(e){
       res.status(403).json({
        status:"failure",
        message:e.message
       })
   }
})

router.put('/:postId',async(req,res)=>{
    try{
     
     if(req.body.title!==undefined || req.body.body!=undefined || req.body.image!==undefined){
        const update=await Post.updateMany(req.body)
     }

     
     res.status(200).json({
         status:"success",
      
     })
    }catch(e){
        res.status(403).json({
         status:"failure",
         message:e.message
        })
    }
 })


 
router.delete('/:postId',async(req,res)=>{
    try{
     
     
        const deleteUser=await Post.deleteOne({"_id":req.params.id})
     

     
     res.status(200).json({
         status:"Successfully deleted",
      
     })
    }catch(e){
        res.status(403).json({
         status:"failure",
         message:e.message
        })
    }
 })

  
router.get('/',async(req,res)=>{
    try{
     
     
        const User=await Post.find({})
        

     
     res.status(200).json({
         post:User
      
     })
    }catch(e){
        res.status(403).json({
         status:"failure",
         message:e.message
        })
    }
 })

 


module.exports=router;